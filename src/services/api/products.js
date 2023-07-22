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

async function deleteProduct(id) {
  const response = await axios.delete(endPoints.products.deleteProduct(id));
  return response.data;
}

export { addProduct, deleteProduct };
