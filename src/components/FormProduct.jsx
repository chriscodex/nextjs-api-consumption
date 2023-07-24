import { useRef } from 'react';
import { useRouter } from 'next/router';
import { addProduct, updateProduct } from '@services/api/products';
import Swal from 'sweetalert2';

export default function FormProduct({ alert, product }) {
  const formRef = useRef(null);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);

    const productFormData = {
      title: formData.get('title'),
      price: parseInt(formData.get('price')),
      description: formData.get('description'),
      categoryId: parseInt(formData.get('category')),
      images: [`https://${formData.get('images').name}fake.com`],
    };

    if (product) {
      try {
        await updateProduct(product.id, productFormData);
        Swal.fire({
          icon: 'success',
          title: 'Product updated succesfully',
          confirmButtonText: 'Okay',
        });
        router.push('/dashboard/products/');
      } catch (error) {
        Swal.fire({
          title: `Something went wrong: ${error}`,
          confirmButtonText: 'Okay',
          icon: 'error',
        });
      }
    } else {
      addProduct(productFormData)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Product added succesfully',
            confirmButtonText: 'Okay',
          });
          router.push('/dashboard/products/');
        })
        .catch((error) => {
          Swal.fire({
            title: `Something went wrong: ${error}`,
            confirmButtonText: 'Okay',
            icon: 'error',
          });
        });
    }
  };

  return (
    <form ref={formRef} onSubmit={(event) => handleSubmit(event)}>
      <div className="overflow-hidden">
        <div className="px-4 py-5 bg-white dark:bg-dmBlack sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-dmWhite">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                defaultValue={product?.title}
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-dmWhite">
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                defaultValue={product?.price}
              />
            </div>
            <div className="col-span-6">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-dmWhite">
                Category
              </label>
              <select
                id="category"
                name="category"
                autoComplete="category-name"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                defaultValue={product?.category}
              >
                <option value="1">Clothes</option>
                <option value="2">Electronics</option>
                <option value="3">Furniture</option>
                <option value="4">Toys</option>
                <option value="5">Others</option>
              </select>
            </div>

            <div className="col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-dmWhite">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                autoComplete="description"
                rows="3"
                defaultValue={product?.description}
                className="form-textarea mt-1 block w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6">
              <div>
                <p className="block text-sm font-medium text-gray-700 dark:text-dmWhite">Cover photo</p>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="images"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input defaultValue={product?.images} id="images" name="images" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1 dark:text-dmWhite">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-dmWhite">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 text-right sm:px-6 rounded-b-lg">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {product ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </form>
  );
}
