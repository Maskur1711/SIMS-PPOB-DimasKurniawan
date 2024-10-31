import React from "react";

// Assets
import Logo from "../../assets/Logo.png";

const TopUpModal = ({
  isOpen,
  onClose,
  onConfirm,
  serviceTariff,
  serviceName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[20rem]">
        <div className="flex justify-center mb-4">
          <img src={Logo} alt="Logo" className="h-10" />
        </div>
        <h2 className="text-lg font-normal text-gray-500 mb-4 text-center">
          Anda yakin untuk {serviceName} sebesar
        </h2>
        <p className="mt-2 text-black font-semibold text-2xl text-center">
          Rp. {serviceTariff} ?
        </p>

        <div className="mt-4 flex justify-center">
          <button
            className="text-red-500 font-semibold  mr-2 hover:text-red-600"
            onClick={onConfirm}
          >
            Ya, lanjutkan TopUp
          </button>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            className="text-gray-500  hover:text-gray-400"
            onClick={onClose}
          >
            Batalkan
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopUpModal;
