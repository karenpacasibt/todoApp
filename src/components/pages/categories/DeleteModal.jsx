import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({ show, onClose, onConfirm, category }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro de que deseas eliminar la categoria <strong>{category?.name}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="danger" onClick={onConfirm}>Eliminar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;

