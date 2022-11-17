/* eslint-disable import/no-named-as-default */
import IconButton from './IconButton';
import IcRoundClose from './Icons/IcRoundClose';

const Modal: React.FC<{
  title?: string;
  isOpen?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ title, isOpen = false, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-16 z-50 max-w-sm rounded-lg border-2 bg-white py-2 px-4 shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-bold">{title}</h2>

        <IconButton title="Close" onClick={onClose}>
          <IcRoundClose />
        </IconButton>
      </div>

      {children}
    </div>
  );
};

export default Modal;
