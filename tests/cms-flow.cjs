const { test } = require('node:test');
const assert = require('node:assert/strict');
const { spawn, spawnSync } = require('node:child_process');
const { mkdtemp, readFile, rm } = require('node:fs/promises');
const { tmpdir } = require('node:os');
const path = require('node:path');
const { randomBytes } = require('node:crypto');

test('CMS: authentication, drafts, albums, publication and concurrent edits', { timeout: 180000 }, async () => {
  const folder = await mkdtemp(path.join(tmpdir(), 'hcof-cms-test-'));
  const port = 3100 + Math.floor(Math.random() * 1000);
  const base = `http://localhost:${port}`;
  const password = randomBytes(20).toString('hex');
  const env = { ...process.env, CMS_LOCAL_STORAGE: 'true', CMS_LOCAL_DATA_DIR: folder, ADMIN_PASSWORD: password, ADMIN_SESSION_SECRET: randomBytes(32).toString('hex'), NODE_ENV: 'development' };
  for (const key of ['VERCEL', 'BLOB_READ_WRITE_TOKEN', 'CLERK_SECRET_KEY', 'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY']) delete env[key];
  const server = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'dev', '--port', String(port)], { env, stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true });
  let logs = ''; server.stdout.on('data', value => { logs += value; }); server.stderr.on('data', value => { logs += value; });
  let cookie = '';
  const request = (url, options = {}) => fetch(base + url, { ...options, headers: { Origin: base, ...(cookie ? { Cookie: cookie } : {}), ...options.headers } });
  const save = (value) => request('/api/admin/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(value) });
  try {
    let ready = false;
    for (let count = 0; count < 80; count++) {
      try { if ((await request('/api/content')).ok) { ready = true; break; } } catch {}
      if (server.exitCode !== null) throw new Error(logs);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    assert.ok(ready, logs);
    assert.equal((await request('/api/admin/content')).status, 401);
    assert.equal((await save({})).status, 401);
    assert.equal((await request('/api/admin/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: 'wrong' }) })).status, 401);
    const login = await request('/api/admin/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
    assert.equal(login.status, 200); assert.match(login.headers.get('set-cookie'), /HttpOnly/i);
    cookie = login.headers.get('set-cookie').split(';')[0];
    let state = await (await request('/api/admin/content')).json();
    const draft = { ...state.content.news[0], id: 'cms-test-private', status: 'draft', titleEn: 'Private test story', titleFr: 'Actualité privée test', summaryEn: 'Private summary', summaryFr: 'Résumé privé', photos: [], coverId: '' };
    state.content.news.push(draft);
    let response = await save(state); assert.equal(response.status, 200); state = await response.json();
    assert.ok(!(await (await request('/api/content')).json()).news.some(item => item.id === draft.id));
    const png = await readFile(path.join(process.cwd(), 'public/assets/media/hcof-icone.png'));
    for (let index = 0; index < 2; index++) {
      const form = new FormData(); form.append('file', new Blob([png], { type: 'image/png' }), 'photo.png');
      response = await request('/api/admin/upload', { method: 'POST', body: form }); assert.equal(response.status, 200);
      state.content.news.at(-1).photos.push({ id: (await response.json()).id, captionEn: 'Photo', captionFr: 'Photo' });
    }
    response = await save(state); assert.equal(response.status, 200); state = await response.json();
    const photo = state.content.news.at(-1).photos[0].id;
    assert.equal((await request(`/api/media/${photo}`, { headers: { Cookie: '' } })).status, 404);
    assert.equal((await request(`/api/media/${photo}`)).status, 200);
    const invalid = structuredClone(state); invalid.content.news.at(-1).status = 'published'; invalid.content.news.at(-1).titleFr = '';
    assert.equal((await save(invalid)).status, 400);
    const stale = structuredClone(state);
    state.content.news.at(-1).status = 'published';
    response = await save(state); assert.equal(response.status, 200); state = await response.json();
    assert.equal((await save(stale)).status, 409);
    const visible = (await (await request('/api/content')).json()).news.find(item => item.id === draft.id);
    assert.equal(visible.photos.length, 2);
    assert.equal((await request(`/api/media/${photo}`, { headers: { Cookie: '' } })).status, 200);
    assert.match(await (await request('/gallery')).text(), /Private test story/);
    const excess = structuredClone(state); while (excess.content.activities.length < 6) excess.content.activities.push({ ...excess.content.activities[0], id: `extra-${excess.content.activities.length}` });
    assert.equal((await save(excess)).status, 400);
    state.content.news.at(-1).status = 'draft';
    assert.equal((await save(state)).status, 200);
    assert.equal((await request(`/api/media/${photo}`, { headers: { Cookie: '' } })).status, 404);
    assert.equal((await request('/api/admin/content', { headers: { Cookie: 'hcof_local_admin=forged' } })).status, 401);
    assert.equal((await request('/api/admin/content', { method: 'PUT', headers: { Origin: 'https://other.example' }, body: '{}' })).status, 403);
  } finally {
    if (process.platform === 'win32') spawnSync('taskkill', ['/PID', String(server.pid), '/T', '/F'], { windowsHide: true, stdio: 'ignore' }); else server.kill('SIGTERM');
    await new Promise(resolve => setTimeout(resolve, 300));
    await rm(folder, { recursive: true, force: true });
  }
});
