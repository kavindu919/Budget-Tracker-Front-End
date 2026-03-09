interface PopUpModalComponentProps {
  isOpen: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const PopUpModalComponent = ({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: PopUpModalComponentProps) => {
  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/25">
      <div className="bg-primary w-11/12 max-w-xl rounded-xl p-6 shadow-lg">
        {title && <h2 className="mb-4 text-lg font-semibold">{title}</h2>}
        <div className="mb-6">{children}</div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={false}
            className="text-secondary h-10 w-32 cursor-pointer rounded border border-slate-300 bg-white text-sm font-bold shadow-md focus:drop-shadow-xl"
          >
            {cancelText}
          </button>

          {onConfirm && (
            <button
              type="button"
              onClick={onConfirm}
              disabled={isOpen}
              className="bg-secondary h-10 w-32 cursor-pointer rounded border border-slate-300 text-sm font-bold text-white shadow-md focus:drop-shadow-xl"
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopUpModalComponent;
