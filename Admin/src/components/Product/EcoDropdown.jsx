import { useState } from "react";

const EcoDropdown = ({ label, valueLabel, options, onSelect }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="eco-dropdown-wrapper">
      {label && (
        <label className="form-label small text-muted mb-1">{label}</label>
      )}

      <div className="eco-dropdown">
        <button
          type="button"
          className="eco-dropdown-toggle"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span>{valueLabel}</span>
          <span className="eco-dropdown-caret">▾</span>
        </button>

        {open && (
          <div className="eco-dropdown-menu">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`eco-dropdown-item ${
                  opt.isActive ? "eco-dropdown-item-active" : ""
                }`}
                onClick={() => {
                  onSelect(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EcoDropdown;
