const { test } = require('node:test');
const assert = require('node:assert/strict');
test('Prisma variables select a PostgreSQL URL and skip Accelerate URLs', async () => {
  const { databaseUrl } = await import('../lib/database.js');
  assert.equal(databaseUrl({ DATABASE_URL: 'prisma+postgres://accelerate', POSTGRES_URL: 'postgresql://direct/db' }), 'postgresql://direct/db');
  assert.equal(databaseUrl({ DATABASE_URL: 'postgres://direct/db', PRISMA_DATABASE_URL: 'prisma+postgres://accelerate' }), 'postgres://direct/db');
  assert.equal(databaseUrl({ PRISMA_DATABASE_URL: 'postgresql://direct/db' }), 'postgresql://direct/db');
  assert.equal(databaseUrl({ DATABASE_URL: 'prisma+postgres://accelerate' }), undefined);
  assert.equal(databaseUrl({}), undefined);
});
