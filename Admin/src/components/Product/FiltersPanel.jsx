import EcoDropdown from "./EcoDropdown";

const FiltersPanel = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  inStockOnly,
  setInStockOnly,
  onClear,
}) => {
  const categoryLabel = selectedCategory === "all" ? "Todas" : selectedCategory;

  const sortLabel =
    sortBy === "none"
      ? "Sin orden"
      : sortBy === "price_asc"
      ? "Precio: menor a mayor"
      : "Precio: mayor a menor";

  const sortOptions = [
    { value: "none", label: "Sin orden", isActive: sortBy === "none" },
    {
      value: "price_asc",
      label: "Precio: menor a mayor",
      isActive: sortBy === "price_asc",
    },
    {
      value: "price_desc",
      label: "Precio: mayor a menor",
      isActive: sortBy === "price_desc",
    },
  ];

  const categoryOptions = categories.map((cat) => ({
    value: cat,
    label: cat === "all" ? "Todas" : cat,
    isActive: selectedCategory === cat,
  }));

  return (
    <div className="mt-3">
      <div className="eco-filters-panel">
        <div className="row g-3">
          {/* Categoría */}
          <div className="col-12 col-md-4">
            <EcoDropdown
              label="Categoría"
              valueLabel={categoryLabel}
              options={categoryOptions}
              onSelect={setSelectedCategory}
            />
          </div>

          {/* Orden por precio */}
          <div className="col-12 col-md-4">
            <EcoDropdown
              label="Ordenar por"
              valueLabel={sortLabel}
              options={sortOptions}
              onSelect={setSortBy}
            />
          </div>

          {/* Solo stock + limpiar */}
          <div className="col-12 col-md-4 d-flex flex-column gap-2 justify-content-between">
            <div className="form-check">
              <input
                id="inStockOnly"
                className="form-check-input"
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
              <label
                htmlFor="inStockOnly"
                className="form-check-label small text-muted"
              >
                Solo con stock
              </label>
            </div>

            <div className="text-md-end">
              <button
                type="button"
                className="btn btn-ghost-eco btn-sm"
                onClick={onClear}
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FiltersPanel;
