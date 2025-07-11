export default function Success({ onClose }) {
  return (
    <div className="success">
      <h2>Success!</h2>
      <p>
        Your order was submitted successfully! We will get back to you via email
        with more details in the next few minutes.
      </p>
      <div className="actions">
        <button className="button" onClick={onClose}>
          Okay
        </button>
      </div>
    </div>
  );
}
