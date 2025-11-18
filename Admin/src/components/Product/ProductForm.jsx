import { useState } from "react";
import { createProduct } from "../../services/productsService";

const initialState = {
  name: "",
  description: "",
  category: "",
  price: "",
  stock: "",
  status: "active",
  imageUrl: "",
};

export default function ProductForm({ onSuccess, onCancel }) {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        name: form.name,
        description: form.description || null,
        category: form.category || null,
        price: parseFloat(form.price || 0),
        stock: parseInt(form.stock || 0, 10),
        status: form.status,
        image_url: form.imageUrl || null,
      };

      await createProduct(payload);

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Error al crear producto:", err);
      const msg =
        err?.response?.data?.message || "Ocurrió un error al crear el producto";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded bg-red-100 text-red-700 px-3 py-2 text-sm">
          {error}
        </div>
      )}

      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="name">
          Nombre *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 text-sm"
          placeholder="Ej: Bolsa reutilizable eco"
        />
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="description">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 text-sm"
          placeholder="Breve descripción del producto"
        />
      </div>

      {/* Categoría */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="category">
          Categoría
        </label>
        <input
          id="category"
          name="category"
          type="text"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 text-sm"
          placeholder="Accesorios, Jardinería..."
        />
      </div>

      {/* Precio + stock */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="price">
            Precio *
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            required
            value={form.price}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm"
            placeholder="Ej: 25.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="stock">
            Stock
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            step="1"
            value={form.stock}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm"
            placeholder="Ej: 100"
          />
        </div>
      </div>

      {/* Estado */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="status">
          Estado
        </label>
        <select
          id="status"
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 text-sm"
        >
          <option value="active">Activo</option>
          <option value="inactive">Inactivo</option>
        </select>
      </div>

      {/* Imagen */}
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="imageUrl">
          URL de imagen
        </label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="text"
          value={form.imageUrl}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 text-sm"
          placeholder="https://..."
        />
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded bg-emerald-600 text-white text-sm font-medium disabled:opacity-60"
        >
          {loading ? "Guardando..." : "Guardar producto"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded border text-sm"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
