import { Modal, Button } from 'react-bootstrap';

const ErrorModal = ({ message, onClose }) => (
  <Modal show={true} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>Error</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>{message}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>
        Cerrar
      </Button>
    </Modal.Footer>
  </Modal>
);
export default ErrorModal;