export default function Checkout({
  userMeals,
  setCheckoutIsOpen,
  setSuccessIsOpen,
  setUserMeals,
  total,
  onCancel,
  onSubmit,
}) {
  async function handleOrderSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const customer = {
      name: formData.get("name"),
      email: formData.get("email"),
      street: formData.get("street"),
      "postal-code": formData.get("postal-code"),
      city: formData.get("city"),
    };

    const order = {
      customer,
      items: userMeals.map((meal) => ({
        id: meal.id,
        name: meal.name,
        price: meal.price,
        quantity: meal.quantity,
      })),
    };

    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Something went wrong!");
      }

      // ✅ Show success modal
      setCheckoutIsOpen(false);
      setSuccessIsOpen(true);
      setUserMeals([]);
    } catch (error) {
      console.error("Order failed:", error.message);
      alert("Failed to submit order. Please try again.");
    }
  }

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <p>
        Total Amount: <strong>${total}</strong>
      </p>
      <form onSubmit={onSubmit}>
        <div className="control">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" required />
        </div>

        <div className="control">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div className="control">
          <label htmlFor="street">Street</label>
          <input type="text" id="street" name="street" required />
        </div>

        <div className="control">
          <label htmlFor="postal">Postal Code</label>
          <input type="text" id="postal" name="postal" required />
          <label htmlFor="city">City</label>
          <input type="text" id="city" name="city" required />
        </div>

        <div className="actions control-row">
          <button type="button" className="text-button" onClick={onCancel}>
            Close
          </button>
          <button type="submit" className="button" onSubmit={handleOrderSubmit}>
            Submit Order
          </button>
        </div>
      </form>
    </div>
  );
}
