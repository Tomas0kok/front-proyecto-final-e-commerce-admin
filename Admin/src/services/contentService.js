import api from "./api";

/* ==========
 * MAPEOS
 * ========== */

function mapBlogPost(apiPost) {
  if (!apiPost) return null;

  return {
    id: apiPost.id,
    title: apiPost.title,
    // usamos published_at y si no, created_at
    date: apiPost.published_at || apiPost.created_at,
    views: apiPost.views ?? 0,
    status: apiPost.status, // "published" | "draft" | "archived"...
    slug: apiPost.slug,
    raw: apiPost,
  };
}

function mapGuide(apiGuide) {
  if (!apiGuide) return null;

  return {
    id: apiGuide.id,
    title: apiGuide.title,
    downloads: apiGuide.downloads ?? 0,
    format: apiGuide.format || "PDF",
    status: apiGuide.status,
    slug: apiGuide.slug,
    raw: apiGuide,
  };
}

function mapVideo(apiVideo) {
  if (!apiVideo) return null;

  return {
    id: apiVideo.id,
    title: apiVideo.title,
    // si tu modelo tiene duration_label o similar, lo usamos
    duration: apiVideo.duration || apiVideo.duration_label || "",
    views: apiVideo.views ?? 0,
    status: apiVideo.status, // "published" | "hidden"...
    slug: apiVideo.slug,
    raw: apiVideo,
  };
}

/* ==========
 * PUBLIC LISTS
 * ========== */

// GET /api/content/blog?search=
export async function getBlogPosts(params = {}) {
  const res = await api.get("/content/blog", { params });
  return res.data.map(mapBlogPost);
}

// GET /api/content/guides?search=
export async function getGuides(params = {}) {
  const res = await api.get("/content/guides", { params });
  return res.data.map(mapGuide);
}

// GET /api/content/videos?search=
export async function getVideos(params = {}) {
  const res = await api.get("/content/videos", { params });
  return res.data.map(mapVideo);
}

/* ==========
 * ADMIN – BLOG
 * ========== */

export async function createBlogPost(payload) {
  const res = await api.post("/content/admin/blog", payload);
  return mapBlogPost(res.data);
}

export async function updateBlogPost(id, payload) {
  const res = await api.put(`/content/admin/blog/${id}`, payload);
  return mapBlogPost(res.data);
}

export async function deleteBlogPost(id) {
  const res = await api.delete(`/content/admin/blog/${id}`);
  return res.data; // { message: ... }
}

/* ==========
 * ADMIN – GUIDES
 * ========== */

export async function createGuide(payload) {
  const res = await api.post("/content/admin/guides", payload);
  return mapGuide(res.data);
}

export async function updateGuide(id, payload) {
  const res = await api.put(`/content/admin/guides/${id}`, payload);
  return mapGuide(res.data);
}

export async function deleteGuide(id) {
  const res = await api.delete(`/content/admin/guides/${id}`);
  return res.data;
}

/* ==========
 * ADMIN – VIDEOS
 * ========== */

export async function createVideo(payload) {
  const res = await api.post("/content/admin/videos", payload);
  return mapVideo(res.data);
}

export async function updateVideo(id, payload) {
  const res = await api.put(`/content/admin/videos/${id}`, payload);
  return mapVideo(res.data);
}

export async function deleteVideo(id) {
  const res = await api.delete(`/content/admin/videos/${id}`);
  return res.data;
}
