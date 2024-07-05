import { ReactElement } from "react";

interface PopupDeleteAccountProps {
  onClose: () => void;
}

function PopupDeleteAccount({ onClose }: PopupDeleteAccountProps): ReactElement {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold">Are you sure that you want to delete your account?</h3>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 text-black hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {}}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupDeleteAccount;
