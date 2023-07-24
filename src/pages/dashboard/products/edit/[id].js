import FormProduct from '@components/FormProduct';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import endPoints from '@services/api';
import axios from 'axios';
import Swal from 'sweetalert2';
import MainLayout from '@layout/MainLayout';

export default function Edit() {
  const [product, setProduct] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    const getProduct = async () => {
      try {
        const response = await axios.get(endPoints.products.getProduct(id));
        setProduct(response.data);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Product not found',
          allowOutsideClick: false,
          showConfirmButton: false,
        });
      }
    };
    getProduct();
  }, [router?.isReady]);

  return (
    <MainLayout>
      <nav>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-dmWhite capitalize">Product {router.query.id}</h1>
        </div>
      </nav>
      <FormProduct product={product} />
    </MainLayout>
  );
}
