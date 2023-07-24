import { TrashIcon } from '@heroicons/react/24/solid';

function OrderCard({ id, title, imageUrl, price, handleDelete }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2 mb-3">
        <figure className="w-20 h-20">
          <img className="w-full h-full rounded-lg object-cover" src={imageUrl} alt={title} />
        </figure>
        <p className="text-sm font-light">{title}</p>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <p className="text-lg font-medium">{price}</p>
        {handleDelete && <TrashIcon onClick={() => handleDelete(id)} className="h-5 w-5 text-black cursor-pointer" />}
      </div>
    </div>
  );
}

export { OrderCard };
