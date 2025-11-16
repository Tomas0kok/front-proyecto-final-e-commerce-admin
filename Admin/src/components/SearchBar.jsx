import { Search, X } from "lucide-react";
import { useSearch } from "../context/SearchContext";

const SearchBar = () => {
  const { query, setQuery } = useSearch();

  const handleClear = () => setQuery("");

  return (
    <div
      className="position-relative"
      style={{ width: "100%", maxWidth: "280px" }}
    >
      <Search
        className="position-absolute"
        style={{
          left: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "18px",
          height: "18px",
          color: "#6c757d",
        }}
      />
      <input
        type="text"
        className="form-control ps-5"
        placeholder="Buscar..."
        value={query || ""}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          backgroundColor: "#fff",
          borderColor: "#dee2e6",
          borderRadius: "14px",
          paddingTop: "0.6rem",
          paddingBottom: "0.6rem",
          transition: "all 0.2s ease",
        }}
      />
      {query && (
        <button
          className="btn position-absolute p-0"
          onClick={handleClear}
          style={{
            right: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            border: "none",
            background: "transparent",
          }}
        >
          <X size={18} style={{ color: "#6c757d" }} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
 