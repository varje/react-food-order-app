import { useContext } from 'react';
import Modal from './Modal';
import CartContext from '../src/store/CartContext';
import { currencyFormatter } from '../src/util/formatting';
import Input from './UI/Input';
import Button from './UI/Button';
import userProgressContex from '../src/store/UserProgressContext';
import useHttp from '../src/hooks/useHttp';
import Error from './Error';
import { useActionState } from 'react';
import { API_BASE_URL } from "../src/config.js";

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};
export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(userProgressContex);

  const { data, error, sendRequest, clearData } = useHttp(
    `${API_BASE_URL}/orders`,
    requestConfig
  );

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );
  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  async function checkoutAction(prevState, fd) {
    const customerData = Object.fromEntries(fd.entries());

    await sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  const [formState, formAction, isSending] = useActionState(
    checkoutAction,
    null
  );

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === 'checkout'}
        onClose={handleFinish}
      >
        <h2>Sucsess!</h2>
        <p>Your order was submitted succesfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }
  return (
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name"></Input>
        <Input label="E-Mail address" type="email" id="email"></Input>
        <Input label="Street" type="text" id="street"></Input>
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code"></Input>
          <Input label="City" type="text" id="city"></Input>
        </div>
        {error && (
          <Error title="Failed to submit order." message={error}></Error>
        )}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
