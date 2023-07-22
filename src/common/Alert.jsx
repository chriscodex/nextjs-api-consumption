import { XCircleIcon } from '@heroicons/react/24/solid';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

function Alert({ alert, handleClose }) {
  if (alert && alert?.autoClose) {
    setTimeout(() => {
      handleClose();
    }, 9000);
  }

  return (
    <>
      {/* {alert?.active && (
        <div x-data className="bg-green-400 h- p-5 w-full rounded mb-8">
          <div className="flex space-x-3">
            <div className="flex-1 leading-tight text-sm text-black font-medium">{alert.message}</div>
            <button type="button">
              <XCircleIcon className="w-6 h-6 text-gray-600" onClick={handleClose} />
            </button>
          </div>
        </div>
      )} */}
      {alert?.active && (
        <div x-data className="bg-green-200 h-10 p-5 w-full rounded mb-8 flex justify-between">
          <div className="leading-tight text-sm text-black font-medium flex items-center">
            <span>
              <CheckCircleIcon className="bg-red-500 w-8 h-8" />
            </span>
            <p className="w-[64px] text-center">{alert.message}</p>
          </div>
          <button className="" type="button">
            <XCircleIcon className="w-6 h-6 text-gray-600" onClick={handleClose} />
          </button>
        </div>
      )}
    </>
  );
}

export { Alert };
