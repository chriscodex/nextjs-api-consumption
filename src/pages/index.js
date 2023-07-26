import { useContext } from 'react';
import { Layout } from '@components/Home/Layout';
import { Card } from '@components/Home/Card/Card';
import { ShoppingCartContext } from '@hooks/useShoppingCart';
import { Navbar } from '@components/Home/Navbar/Navbar';
import { ProductDetail } from '@components/Home/ProductDetail';
import { CheckOutSideMenu } from '@components/Home/CheckoutSideMenu';
import { LazyLoading } from '@components/Home/LazyLoading/LazyLoading';

function Home() {
  const { setSearchByTitle, filteredItems } = useContext(ShoppingCartContext);
  const arrayNumeros = new Array(16).fill(0);

  const renderView = () => {
    if (filteredItems?.length > 0) {
      return filteredItems?.map((item) => <Card key={item.id} product={item} />);
    } else {
      return arrayNumeros.map((_, index) => <LazyLoading key={`empty-${index}`} />);
    }
  };

  return (
    <>
      <Navbar />
      <Layout>
        <div className="flex w-80 relative items-center justify-center mb-4">
          <h1 className="font-medium text-lg dark:text-white">Exclusive Products</h1>
        </div>
        <input
          type="text"
          placeholder="Search a products"
          className="rounded-lg border border-black dark:border-white w-80 p-4 mb-4 focus:outline-none"
          onChange={(event) => setSearchByTitle(event.target.value)}
        />
        <div className="grid grid-cols-4 gap-4 w-full max-w-screen-lg mt-3">{renderView()}</div>
        <CheckOutSideMenu />
        <ProductDetail />
      </Layout>
    </>
  );
}

export default Home;
