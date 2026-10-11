import { isAdmin } from "../../../../lib/admin-auth.js";
import { loadPhoto, readContent } from "../../../../lib/cms-storage.js";
import { isPhotoId } from "../../../../lib/cms-validation.js";
export const dynamic = "force-dynamic";
export async function GET(request, { params }) {
  const { id } = await params; if (!isPhotoId(id)) return new Response(null, { status: 404 });
  try {
    const { content } = await readContent();
    const published = [...content.activities, ...content.news].some((item) => item.status === "published" && item.photos.some((photo) => photo.id === id));
    if (!published && !await isAdmin()) return new Response(null, { status: 404 });
    const photo = await loadPhoto(id); if (!photo) return new Response(null, { status: 404 });
    return new Response(photo, { headers: { "Content-Type": id.endsWith("png") ? "image/png" : id.endsWith("webp") ? "image/webp" : "image/jpeg", "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" } });
  } catch { return new Response(null, { status: 503 }); }
}
