import { IoClose } from "react-icons/io5";

interface PopUpModalComponentProps {
  isOpen: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  loading: boolean;
}

const PopUpModalComponent = ({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading,
}: PopUpModalComponentProps) => {
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 transition-opacity"
        onClick={loading ? undefined : onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-xl">
          {title && (
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <h5 className="text-lg font-semibold">{title}</h5>
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="cursor-pointer text-gray-400 disabled:opacity-50"
              >
                <IoClose size={24} />
              </button>
            </div>
          )}

          <div className="p-6 text-sm">{children}</div>

          <div className="flex items-center justify-end gap-3 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="cursor-pointer rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-semibold text-gray-700 transition-colors duration-150 hover:bg-gray-100 disabled:opacity-50"
            >
              {cancelText}
            </button>

            {onConfirm && (
              <button
                type="button"
                onClick={onConfirm}
                disabled={loading}
                className="bg-secondary cursor-pointer rounded-md border border-slate-300 px-3 py-1.5 text-sm font-bold text-white shadow-md transition-colors duration-150 focus:drop-shadow-xl disabled:opacity-50"
              >
                {loading ? "Loading..." : confirmText}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PopUpModalComponent;
