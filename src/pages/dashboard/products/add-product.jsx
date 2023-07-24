import FormProduct from '@components/FormProduct';
import MainLayout from '@layout/MainLayout';

export default function AddProduct({ setOpen }) {
  return (
    <MainLayout>
      <nav>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-dmWhite capitalize">Add new product</h1>
        </div>
      </nav>
      <FormProduct setOpen={setOpen} />
    </MainLayout>
  );
}
