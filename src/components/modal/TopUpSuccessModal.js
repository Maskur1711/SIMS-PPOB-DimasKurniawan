import React from "react";

// Assets
import Logo from "../../assets/success.png";

const TopUpSuccessModal = ({ isOpen, onClose, serviceTariff }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[18rem] h-[15rem]">
        <div className="flex justify-center mb-4">
          <img src={Logo} alt="Logo" className="h-10" />
        </div>
        <h2 className="text-sm font-semibold text-gray-500 text-center">
          Anda Yakin untuk TopUp Sebesar
        </h2>
        <p className=" text-black font-semibold text-2xl text-center">
          Rp. {serviceTariff}
        </p>
        <p className="text-center text-gray-500">berhasil</p>
        <div className="mt-10 flex justify-center">
          <button
            className="text-red-500 font-semibold  mr-2 hover:text-red-600"
            onClick={onClose}
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopUpSuccessModal;
