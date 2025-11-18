import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
//import ServiceForm from "../components/Service/ServiceForm";

export default function NewServiceModal() {
  const navigate = useNavigate();

  function handleClose() {
    navigate("/admin/services", { replace: true });
  }

  return (
    <Modal open title="Nuevo servicio" onClose={handleClose}>
      <ServiceForm onSuccess={handleClose} onCancel={handleClose} />
    </Modal>
  );
}
