export default function Cart({
  meals,
  onIncrease,
  onDecrease,
  onConfirm,
  onCancel,
}) {
  const total = meals
    .reduce((sum, meal) => sum + meal.price * meal.quantity, 0)
    .toFixed(2);
  return (
    <div className="cart">
      <h2>Your cart</h2>
      {meals.length === 0 && <p>Your cart is empty.</p>}
      {meals.length > 0 && (
        <ul>
          {meals.map((meal) => (
            <li key={meal.id} className="cart-item">
              <p>
                {meal.name} - {meal.quantity} x ${meal.price}
              </p>
              <div className="cart-item-actions">
                <button
                  onClick={() => onDecrease(meal.id)}
                  className="text-button"
                >
                  -
                </button>
                <p>{meal.quantity}</p>
                <button
                  onClick={() => onIncrease(meal.id)}
                  className="text-button"
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="cart-total">
        $<strong>{total}</strong>
      </p>
      <div className="modal-actions">
        <button onClick={onCancel} className="text-button">
          Close
        </button>
        <button onClick={onConfirm} className="button">
          Go to checkout
        </button>
      </div>
    </div>
  );
}
