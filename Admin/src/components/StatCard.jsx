import { CardText } from "lucide-react";
import PropTypes from "prop-types";

export const StatCard = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon = CardText,
  iconColor = "text-primary",
}) => {
  // Define el color del texto según el tipo de cambio
  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return "text-success";
      case "negative":
        return "text-danger";
      default:
        return "text-muted";
    }
  };

  return (
    <div className="card shadow-sm border-0 h-100 hover-shadow transition-all">
      <div className="card-body p-4 d-flex justify-content-between align-items-start">
        {/* Texto */}
        <div className="flex-grow-1">
          <p className="text-muted small mb-1 fw-medium">{title}</p>
          <h4 className="fw-bold mb-2">{value}</h4>
          {change && (
            <p className={`fw-medium small ${getChangeColor()}`}>{change}</p>
          )}
        </div>

        {/* Icono */}
        <div
          className={`p-3 rounded bg-light d-flex align-items-center justify-content-center ${iconColor}`}
          style={{ minWidth: "48px", minHeight: "48px" }}
        >
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

// Tipado opcional (si no usás TypeScript)
StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  change: PropTypes.string,
  changeType: PropTypes.oneOf(["positive", "negative", "neutral"]),
  icon: PropTypes.elementType,
  iconColor: PropTypes.string,
};
