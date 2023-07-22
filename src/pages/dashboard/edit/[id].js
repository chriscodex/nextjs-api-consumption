import FormProduct from '@components/FormProduct';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import endPoints from '@services/api';
import axios from 'axios';
import Swal from 'sweetalert2';

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
          icon: 'success',
          title: 'Product not found',
          allowOutsideClick: false,
          showConfirmButton: false,
        });
      }
    };
    getProduct();
  }, [router?.isReady]);

  return <FormProduct product={product} />;
}