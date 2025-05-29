import Alert from 'react-bootstrap/Alert';

export default function AlertMessage({ message , color}) {
 if (!message) return null;
  return (
    <Alert variant={color} className="text-center">
      {message}
    </Alert>
  );
}
