import { XMarkIcon } from '@heroicons/react/24/solid';
import { useContext } from 'react';
import { ShoppingCartContext } from '@hooks/useShoppingCart';

function ProductDetail() {
  const { isProductDetailOpen, closeProductDetail, productToShow } = useContext(ShoppingCartContext);

  const productDetailStyle = 'w-[360px] h-[calc(100vh-68px)] flex flex-col bg-white border border-black rounded-lg fixed right-0 top-[68px]';

  return (
    <aside className={`${isProductDetailOpen ? productDetailStyle : 'hidden'} `}>
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">Detail</h2>
        <button className="cursor-pointer" onClick={() => closeProductDetail()}>
          <XMarkIcon className="h-6 w-6 text-black" />
        </button>
      </div>
      <figure className="px-6">
        <img className="w-full h-full rounded-lg" src={productToShow.images[0]} alt={productToShow.title} />
      </figure>
      <p className="flex flex-col p-6">
        <span className="font-medium text-2xl mb-2">{productToShow.price}</span>
        <span className="font-medium text-md">{productToShow.title}</span>
        <span className="font-light text-sm">{productToShow.description}</span>
      </p>
    </aside>
  );
}

export { ProductDetail };
