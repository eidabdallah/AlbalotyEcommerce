import Spinner from "react-bootstrap/Spinner";

export default function Loading() {
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9999 }}>
      <div className="d-flex justify-content-center align-items-center gap-3">
        <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="warning" />
      </div>
    </div>
  );
}
