import { useState, useMemo, useEffect } from "react";
import FiltersPanel from "../components/Product/FiltersPanel";
import ProductCard from "../components/Product/ProductCard";
import { Plus, Search, SlidersHorizontal } from "lucide-react";

import { getProducts } from "../services/productsService";

// parsePrice soporta número o string
const parsePrice = (price) => {
  if (typeof price === "number") return price;
  if (!price) return 0;
  return Number(String(price).replace("$", "").replace(",", "").trim()) || 0;
};

// Normaliza la categoría a un string legible
function getCategoryName(product) {
  if (!product) return "";

  // Caso viejo (mock): category ya es string
  if (typeof product.category === "string") {
    return product.category;
  }

  // Caso común backend: category es objeto { id, name }
  if (product.category && typeof product.category === "object") {
    return product.category.name || product.category.title || "";
  }

  // Otras variantes típicas
  if (typeof product.category_name === "string") return product.category_name;
  if (typeof product.categoryName === "string") return product.categoryName;

  return "";
}

const Products = () => {
  const [products, setProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("none");
  const [showFilters, setShowFilters] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* =========================
   *  Cargar productos desde API
   * =======================*/
  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        const data = await getProducts(); // /api/store/products
        if (isMounted) setProducts(data);
      } catch (err) {
        console.error(err);
        if (isMounted) setError("No se pudieron cargar los productos.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  /* =========================
   *  Categorías dinámicas desde la API
   * =======================*/
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category).filter(Boolean));
    return ["all", ...Array.from(set)];
  }, [products]);

  /* =========================
   *  Filtros + ordenamiento
   * =======================*/
  const filteredProducts = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();

    let result = products.filter((product) => {
      const name = (product.name || "").toLowerCase();
      const category = getCategoryName(product).toLowerCase();

      // Buscar por nombre o categoría
      const matchesSearch = !q || name.includes(q) || category.includes(q);

      // Filtro de categoría (si viene como string o como objeto, lo manejamos)
      const matchesCategory =
        selectedCategory === "all" ||
        getCategoryName(product).toLowerCase() ===
          selectedCategory.toLowerCase();

      // Filtro stock
      const matchesStock = !inStockOnly || (product.stock || 0) > 0;

      return matchesSearch && matchesCategory && matchesStock;
    });

    // Ordenamiento por precio
    if (sortBy === "price_asc") {
      result = [...result].sort(
        (a, b) => parsePrice(a.price) - parsePrice(b.price)
      );
    } else if (sortBy === "price_desc") {
      result = [...result].sort(
        (a, b) => parsePrice(b.price) - parsePrice(a.price)
      );
    }

    return result;
  }, [products, searchTerm, selectedCategory, inStockOnly, sortBy]);

  const handleClearFilters = () => {
    setSelectedCategory("all");
    setInStockOnly(false);
    setSortBy("none");
  };

  const getStockBadgeClass = (product) => {
    const stock = product.stock || 0;

    if (product.status !== "active" || stock === 0) {
      return "badge-quantity-low";
    }
    if (stock < 50) return "badge-quantity-medium";
    return "badge-quantity-good";
  };

  return (
    <div className="container my-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold">Productos</h1>
          <p className="text-muted mb-0">
            Gestiona tu catálogo de productos ecológicos
          </p>
        </div>
        <button className="btn btn-primary d-flex align-items-center gap-2">
          <Plus size={18} /> Nuevo Producto
        </button>
      </div>

      {/* Search + botón de filtros */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            {/* Búsqueda */}
            <div className="col-12 col-md-8 position-relative">
              <Search
                size={18}
                className="position-absolute top-50 translate-middle-y ms-3 text-muted"
              />
              <input
                type="text"
                placeholder="Buscar por nombre o categoría..."
                className="form-control ps-5 products-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Botón de filtros */}
            <div className="col-12 col-md-4 d-flex justify-content-md-end">
              <button
                type="button"
                className={`btn btn-ghost-eco d-flex align-items-center gap-2 ${
                  showFilters ? "btn-ghost-eco-active" : ""
                }`}
                onClick={() => setShowFilters((prev) => !prev)}
              >
                <SlidersHorizontal size={16} />
                <span>Filtros</span>
              </button>
            </div>
          </div>

          {/* Panel de filtros */}
          {showFilters && (
            <FiltersPanel
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sortBy={sortBy}
              setSortBy={setSortBy}
              inStockOnly={inStockOnly}
              setInStockOnly={setInStockOnly}
              onClear={handleClearFilters}
            />
          )}
        </div>
      </div>

      {/* Loading y errores */}
      {loading && (
        <div className="text-center text-muted py-4">Cargando productos...</div>
      )}

      {error && !loading && (
        <div className="text-center text-danger py-4">{error}</div>
      )}

      {/* Products Grid */}
      {!loading && !error && (
        <div className="row g-4">
          {filteredProducts.length === 0 ? (
            <div className="col-12">
              <p className="text-muted text-center mb-0">
                No se encontraron productos con los filtros aplicados.
              </p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={{ product, category: getCategoryName(product) }}
                getStockBadgeClass={getStockBadgeClass}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
