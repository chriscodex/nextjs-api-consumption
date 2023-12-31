import { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { PlusIcon, XCircleIcon } from '@heroicons/react/20/solid';
import MyModal from '@common/MyModal';
import FormProduct from '@components/FormProduct';
import endPoints from '@services/api';
import useAlert from '@hooks/useAlert';
import { deleteProduct } from '@services/api/products';
import Link from 'next/link';
import MainLayout from '@layout/MainLayout';
import ModalNew from '@common/ModalNew';
import { useRouter } from 'next/router';

export default function Products() {
  const [products, setProducts] = useState([]);
  // Open Modal state
  const [open, setOpen] = useState(false);

  // Alert state
  const { alert, setAlert } = useAlert();

  const router = useRouter();

  const handleDelete = (productId) => {
    deleteProduct(productId)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Product deleted succesfully',
          confirmButtonText: 'Okay',
        });
        setAlert(!alert);
      })
      .catch((error) => {
        Swal.fire({
          title: `Something went wrong: ${error}`,
          confirmButtonText: 'Okay',
          icon: 'warning',
        });
      });
  };

  const handleAddProduct = () => {
    router.push('/dashboard/products/add-product');
  };

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get(endPoints.products.getAllProducts);
      setProducts(response.data);
    };

    try {
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }, [alert]);

  return (
    <>
      <MainLayout>
        <div className="lg:flex lg:items-center lg:justify-between mb-8 pt-10">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-dmWhite sm:truncate sm:text-3xl sm:tracking-tight">Products List</h2>
          </div>
          <div className="mt-5 flex lg:ml-4 lg:mt-0">
            <span className="sm:ml-3">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => handleAddProduct()}
              >
                <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                Add Product
              </button>
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 dark:bg-[#505353]">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dmWhite uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dmWhite uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dmWhite uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-dmWhite uppercase tracking-wider">
                        Id
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Delete</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-[#505353] divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={`product-item-${product.id}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src={product.images[0]} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-dmWhite">{product.title}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-dmWhite">{product.category.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 text-sm font-medium text-gray-900 dark:text-dmWhite">{product.price}</span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-dmWhite">{product.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link href={`/dashboard/products/edit/${product.id}`} className="text-indigo-600 hover:text-indigo-900 dark:text-[#51C4D3] dark:hover:text-[#4099a3]">
                            Edit
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <XCircleIcon className="flex-shrink-0 h-6 w-6 text-gray-400 cursor-pointer" onClick={() => handleDelete(product.id)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
