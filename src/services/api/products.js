import axios from 'axios';
import endPoints from '@services/api';

async function addProduct(bodyProduct) {
  const axiosConfig = {
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.post(endPoints.products.addProducts, bodyProduct, axiosConfig);
  return response.data;
}

export { addProduct };
