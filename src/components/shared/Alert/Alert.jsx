import Alert from 'react-bootstrap/Alert';

export default function AlertMessage({ message , color}) {
 if (!message) return null;
  return (
    <Alert variant={color} className="d-flex justify-content-center align-items-center w-50 m-auto" style={{ height: '70vh' }}>
      {message}
    </Alert>
  );
}
