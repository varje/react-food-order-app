import AvailableMeals from "../components/AvailableMeals";
import Cart from "../components/Cart";
import Checkout from "../components/Checkout.jsx";
import Modal from "../components/Modal.jsx";
import Success from "../components/Success.jsx";
import logoImg from "./assets/logo.jpg";
import { useState } from "react";

function App() {
  const [userMeals, setUserMeals] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [checkoutIsOpen, setCheckoutIsOpen] = useState(false);
  const [successIsOpen, setSuccessIsOpen] = useState(false);

  function handleSelectMeal(selectedMeal) {
    setUserMeals((prevMeals) => {
      const existingMeal = prevMeals.find(
        (meal) => meal.id === selectedMeal.id,
      );

      if (existingMeal) {
        return prevMeals.map((meal) =>
          meal.id === selectedMeal.id
            ? { ...meal, quantity: meal.quantity + 1 }
            : meal,
        );
      }

      return [{ ...selectedMeal, quantity: 1 }, ...prevMeals];
    });
  }

  function handleIncreaseQuantity(mealId) {
    setUserMeals((prevMeals) =>
      prevMeals.map((meal) =>
        meal.id === mealId ? { ...meal, quantity: meal.quantity + 1 } : meal,
      ),
    );
  }

  function handleDecreaseQuantity(mealId) {
    setUserMeals(
      (prevMeals) =>
        prevMeals
          .map((meal) =>
            meal.id === mealId
              ? { ...meal, quantity: meal.quantity - 1 }
              : meal,
          )
          .filter((meal) => meal.quantity > 0), // remove if quantity is 0
    );
  }

  return (
    <>
      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <Cart
          meals={userMeals}
          onIncrease={handleIncreaseQuantity}
          onDecrease={handleDecreaseQuantity}
          onCancel={() => setModalIsOpen(false)}
          onConfirm={() => {
            setModalIsOpen(false);
            setCheckoutIsOpen(true);
          }}
        />
      </Modal>
      {checkoutIsOpen && (
        <Modal open={checkoutIsOpen} onClose={() => setCheckoutIsOpen(false)}>
          <Checkout
            userMeals={userMeals}
            setCheckoutIsOpen={setCheckoutIsOpen}
            setSuccessIsOpen={setSuccessIsOpen}
            setUserMeals={setUserMeals}
            total={userMeals
              .reduce((sum, m) => sum + m.price * m.quantity, 0)
              .toFixed(2)}
            onCancel={() => setCheckoutIsOpen(false)}
            onSubmit={(e) => {
              e.preventDefault();
              // handle order submit logic here
              setCheckoutIsOpen(false);
              setSuccessIsOpen(true);
              setUserMeals([]); // clear cart
            }}
          />
        </Modal>
      )}
      {successIsOpen && (
        <Modal open={successIsOpen} onClose={() => setSuccessIsOpen(false)}>
          <Success onClose={() => setSuccessIsOpen(false)} />
        </Modal>
      )}

      <header id="main-header">
        <div id="title">
          <img src={logoImg} alt="Stylized globe" />
          <h1>REACTFOOD</h1>
        </div>
        <button
          className="text-button cart-total"
          onClick={() => setModalIsOpen(true)}
        >
          Cart ({userMeals.reduce((sum, meal) => sum + meal.quantity, 0)})
        </button>
      </header>
      <main>
        <AvailableMeals onSelectMeal={handleSelectMeal} />
      </main>
    </>
  );
}

export default App;
