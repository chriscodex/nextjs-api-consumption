import { Dialog } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/24/solid';

function MyModal({ open, setOpen, children }) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50 inset-0">
      <div className="fixed inset-0 bg-black/30">
        <div className="fixed inset-0 flex items-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm bg-white rounded-lg">
            <div className="px-4 py-3 sm:px-6 sm:flex sm:justify-end rounded-t-lg">
              <XCircleIcon className="h-6 w-6 text-gray-400 cursor-pointer" aria-hidden="true" onClick={() => setOpen(false)} />
            </div>
            {children}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}

export default MyModal;
