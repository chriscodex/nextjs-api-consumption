import { useContext } from 'react';
import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '@hooks/useShoppingCart';
import { OrderCard } from '../OrderCard';
// import './style.css';

function CheckOutSideMenu() {
  const { cartProducts, setCartProducts, isCheckoutSideMenuOpen, closeCheckoutSideMenu, order, setOrder, count, setCount, setSearchByTitle } = useContext(ShoppingCartContext);

  const TotalPrice = (products) => {
    return products.reduce((sum, product) => sum + product.price, 0);
  };

  const handleDelete = (id) => {
    const filteredProducts = cartProducts.filter((product) => product.id !== id);
    setCartProducts(filteredProducts);
    setCount(count - 1);
  };

  const handleCheckout = () => {
    const orderToAdd = {
      date: new Date(),
      products: cartProducts,
      totalProducts: cartProducts.length,
      totalPrice: TotalPrice(cartProducts),
    };

    setOrder([...order, orderToAdd]);
    setCartProducts([]);
    setCount(0);
    closeCheckoutSideMenu();
    setSearchByTitle(null);
    // router.push('/login');
  };

  const productDetailStyle = 'scrollable-cards w-[360px] h-[calc(100vh-60px)] flex flex-col bg-white border border-black rounded-lg fixed right-0 top-[68px]';

  return (
    <aside className={`${isCheckoutSideMenuOpen ? productDetailStyle : 'hidden'} `}>
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">My Order</h2>
        <div>
          <button className="cursor-pointer" onClick={() => closeCheckoutSideMenu()}>
            <XMarkIcon className="h-6 w-6 text-black dark:text-white" />
          </button>
        </div>
      </div>
      <div className="px-6 flex-1">
        {cartProducts?.map((cartProduct) => (
          <OrderCard key={cartProduct.id} id={cartProduct.id} title={cartProduct.title} imageUrl={cartProduct.images[0]} price={cartProduct.price} handleDelete={handleDelete} />
        ))}
      </div>
      <div className="px-6 mb-6">
        <p className="flex justify-between items-center mb-2">
          <span className="font-light">Total: </span>
          <span className="font-medium text-2xl">${TotalPrice(cartProducts)}</span>
        </p>
        <Link href="/login">
          <button className="w-full bg-black py-3 text-white rounded-lg" onClick={() => handleCheckout()}>
            Checkout
          </button>
        </Link>
      </div>
    </aside>
  );
}

export { CheckOutSideMenu };
