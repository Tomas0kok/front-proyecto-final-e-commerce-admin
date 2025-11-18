import api from "./api";

/**
 * Listar productos (usa /products públicos).
 * Si más adelante querés pasar filtros por query (?category, ?status),
 * podés agregar un objeto params y pasarlo al get.
 */
export const getProducts = async () => {
  const res = await api.get("/store/products"); // 👈 antes era "/products"
  return res.data;
};

/**
 * Detalle de un producto (público)
 */
export async function getProductById(id) {
  const res = await api.get(`/products/${id}`);
  return res.data;
}

/**
 * Crear producto (ADMIN)
 * Endpoint: POST /admin/products
 */
export async function createProduct(form) {
  const fd = new FormData();

  fd.append("name", form.name);
  fd.append("description", form.description || "");
  fd.append("price", form.price); // string o number, da igual
  fd.append("stock", form.stock ?? 0);
  fd.append("category_id", form.category_id); // id numérico o string

  // Imagen (opcional)
  if (form.imageFile) {
    fd.append("image", form.imageFile); // 👈 clave "image" = upload.single("image")
  }

  const res = await api.post("/store/admin/products", fd);
  return res.data;
}
/**
 * Actualizar producto (ADMIN)
 * Endpoint: PUT /admin/products/:id
 */
export async function updateProduct(id, form) {
  const formData = new FormData();

  formData.append("name", form.name);
  formData.append("description", form.description || "");
  formData.append("price", form.price);
  formData.append("stock", form.stock ?? 0);
  formData.append("category_id", form.category_id || "");

  if (form.imageFile) {
    formData.append("image", form.imageFile);
  }

  const res = await api.put(`/store/admin/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}

/**
 * Eliminar producto (ADMIN)
 * Endpoint: DELETE /admin/products/:id
 */
export async function deleteProduct(id) {
  await api.delete(`store/admin/products/${id}`);
}

export const getCategories = async () => {
  const res = await api.get("/store/categories");
  return res.data;
};
