import { useState, useMemo } from "react";
import FiltersPanel from "../components/Product/FiltersPanel";
import ProductCard from "../components/Product/ProductCard";
import { Plus, Search, SlidersHorizontal } from "lucide-react";

/* =========================
 *  Datos mock
 * =======================*/
const mockProducts = [
  {
    id: 1,
    name: "Bolsa Reutilizable Eco",
    category: "Accesorios",
    price: "$20.00",
    stock: 150,
    status: "active",
    image: "🛍️",
  },
  {
    id: 2,
    name: "Kit de Compostaje",
    category: "Jardinería",
    price: "$40.00",
    stock: 75,
    status: "active",
    image: "🌱",
  },
  {
    id: 3,
    name: "Botellas de Vidrio Set",
    category: "Cocina",
    price: "$25.00",
    stock: 200,
    status: "active",
    image: "🍾",
  },
  {
    id: 4,
    name: "Papel Reciclado Pack",
    category: "Oficina",
    price: "$15.00",
    stock: 0,
    status: "out_of_stock",
    image: "📄",
  },
];

const parsePrice = (priceStr) =>
  Number(priceStr.replace("$", "").replace(",", "").trim()) || 0;

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("none");
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => {
    const set = new Set(mockProducts.map((p) => p.category));
    return ["all", ...Array.from(set)];
  }, []);

  const filteredProducts = useMemo(() => {
    const q = searchTerm.toLowerCase();

    let result = mockProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q);

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      const matchesStock = !inStockOnly || product.stock > 0;

      return matchesSearch && matchesCategory && matchesStock;
    });

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
  }, [searchTerm, selectedCategory, inStockOnly, sortBy]);

  const handleClearFilters = () => {
    setSelectedCategory("all");
    setInStockOnly(false);
    setSortBy("none");
  };

  const getStockBadgeClass = (product) => {
    if (product.status !== "active" || product.stock === 0) {
      return "badge-quantity-low";
    }
    if (product.stock < 50) return "badge-quantity-medium";
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

          {/* Panel de filtros desplegable */}
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

      {/* Products Grid */}
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
              product={product}
              getStockBadgeClass={getStockBadgeClass}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
