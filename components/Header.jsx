import logoImg from '../src/assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../src/store/CartContext';
import { useContext } from 'react';
import userProgressContext from '../src/store/UserProgressContext';

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(userProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberofItems, item) => {
    return totalNumberofItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button onClick={handleShowCart} textOnly>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
