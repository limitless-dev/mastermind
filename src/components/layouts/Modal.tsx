import { Dispatch, Fragment, SetStateAction, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface ModalProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
  actionButton?: React.ReactNode;
  statusText?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  title,
  openModal,
  setOpenModal,
  actionButton,
  statusText,
  children,
}) => {
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpenModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`relative overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all dark:bg-slate-800 sm:my-8 sm:w-full${
                  title === 'Winners' ? 'sm:max-w-5xl' : 'sm:w-full sm:max-w-lg'
                }`}
              >
                <div className="bg-white px-4 pt-5 pb-4 dark:bg-slate-800 sm:p-6 sm:pb-4">
                  <div
                    className={`${title.includes('Winner') ? 'sm:block' : ''}`}
                  >
                    <div className="m:p-12 mt-3 space-y-10 sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                      >
                        {title}
                      </Dialog.Title>
                    </div>
                    <div className={` ${title === '' ? '' : 'mt-12'} `}>
                      {children}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-8 gap-4 bg-gray-50 px-4 py-3 dark:bg-gray-900 sm:px-6">
                  {statusText}

                  <div className="col-span-4 col-start-5 sm:col-span-4 sm:col-start-5 sm:flex sm:flex-row-reverse">
                    {actionButton}
                    <button
                      type="button"
                      className="mr-2 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3.5 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-transparent dark:hover:bg-gray-800 dark:focus:ring-gray-700"
                      onClick={() => setOpenModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default Modal;
