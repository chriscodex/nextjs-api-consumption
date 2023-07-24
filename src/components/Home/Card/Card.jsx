import { useContext } from 'react';
import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '@hooks/useShoppingCart';

function Card({ product }) {
  const { count, setCount, openProductDetail, closeProductDetail, setProductToShow, cartProducts, setCartProducts, openCheckoutSideMenu, closeCheckoutSideMenu } = useContext(ShoppingCartContext);

  const showProduct = (productDetail) => {
    openProductDetail();
    setProductToShow(productDetail);
    closeCheckoutSideMenu();
  };

  const addProductsToCart = (event, product) => {
    event.stopPropagation();
    closeProductDetail();
    setCartProducts([...cartProducts, product]);
    openCheckoutSideMenu();
    setCount(count + 1);
  };

  const renderIcon = (id) => {
    const isInCart = cartProducts.some((product) => product.id === id);

    if (isInCart) {
      return (
        <div className="bg-[#3b3b3b] dark:bg-white absolute top-0 right-0 flex justify-center items-center w-6 h-6 rounded-full m-2 font-medium">
          <CheckIcon className="h-6 w-6 text-white dark:text-[#3b3b3b]" />
        </div>
      );
    } else {
      return (
        <div>
          <button
            className="bg-white dark:bg-[#3b3b3b] absolute top-0 right-0 flex justify-center items-center w-6 h-6 rounded-full m-2 font-medium"
            onClick={(event) => addProductsToCart(event, product)}
          >
            <PlusIcon className="h-6 w-6 text-black dark:text-white" />
          </button>
        </div>
      );
    }
  };

  return (
    <button className="bg-white dark:bg-[#3b3b3b] cursor-pointer w-56 h-60 rounded-lg" onClick={() => showProduct(product)}>
      <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-sm m-2 px-3 py-0.5">{product.id}</span>
        <img className="w-full h-full object-cover rounded-lg" src={product.images[0]} alt="headphones" />
        {renderIcon(product.id)}
      </figure>
      <p className="flex justify-between items-center">
        <span className="text-sm font-light dark:text-white">{product.title}</span>
        <span className="text-lg font-medium dark:text-white">${product.price}</span>
      </p>
    </button>
  );
}

export { Card };
