import { Modal, Button } from 'react-bootstrap';

function ErrorModal({ error, onClose }) {
  return (
    <Modal show={!!error} onHide={onClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>Error
        </Modal.Title>
      </Modal.Header>
      <Modal.Body > 
        {error}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ErrorModal;
