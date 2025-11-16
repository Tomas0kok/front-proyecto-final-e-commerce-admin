import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

const StatCard = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  iconColor,
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return "text-semaforo-good";
      case "neutral":
        return "text-semaforo-medium";
      case "negative":
        return "text-semaforo-bad";
      default:
        return "text-muted";
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case "positive":
        return <ArrowUpRight size={16} className="me-1" />;
      case "neutral":
        return <Minus size={16} className="me-1" />;
      case "negative":
        return <ArrowDownRight size={16} className="me-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="card shadow-sm border-0 h-100 card-eco-emphasis">
      <div className="card-body d-flex flex-column gap-3">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <p className="text-muted mb-1">{title}</p>
            <h4 className="fw-bold mb-0">{value}</h4>
          </div>

          <div
            className={`rounded-circle p-2 d-flex align-items-center justify-content-center ${iconColor}`}
            style={{ backgroundColor: "rgba(111, 168, 74, 0.12)" }} // verde eco translúcido
          >
            <Icon size={20} />
          </div>
        </div>

        {/* Indicador de cambio con semáforo */}
        <div
          className={`d-flex align-items-center fw-semibold ${getChangeColor()}`}
        >
          {getChangeIcon()}
          <span>{change}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
