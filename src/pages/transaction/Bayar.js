import React, { useEffect, useState } from "react";
import Saldo from "../../components/card/Balance";
import { CreditCard } from "lucide-react";
import {
  getProfileApi,
  TransactionApi,
  getServicesApi,
} from "../../api/baseAPI";
import PaymentModal from "../../components/modal/PaymentModal";
import PaymentSuccessModal from "../../components/modal/PaymentSuccessModal";
import PaymentErrorModal from "../../components/modal/PaymentErrorModal";

const Bayar = () => {
  const [userProfile, setUserProfile] = useState({});
  const [inputAmount, setInputAmount] = useState("");
  const [topUpAmount, setTopUpAmount] = useState(0);
  const [error, setError] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); 
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); 
  const [invoiceNumber, setInvoiceNumber] = useState(""); 

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await getProfileApi();
        setUserProfile(profileData.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError("Failed to fetch profile data.");
      }
    };

    const fetchService = async () => {
      try {
        const serviceData = await getServicesApi();
        const listrikService = serviceData.data.find((service) =>
          service.service_name.includes("Listrik")
        );
        if (listrikService) {
          setSelectedService(listrikService);
          const tariff = listrikService.service_tariff;
          setTopUpAmount(tariff);
          setInputAmount(formatToIDR(tariff));
        } else {
          setError("Listrik service not found.");
        }
      } catch (err) {
        console.error("Failed to fetch service:", err);
        setError("Failed to fetch service data.");
      }
    };

    fetchUserProfile();
    fetchService();
  }, []);

  const formatToIDR = (amount) => {
    const parts = amount.toString().split(".");
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const decimalPart = parts[1] ? "." + parts[1] : "";
    return integerPart + decimalPart;
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    const numericValue = parseFloat(
      value.replace(/\D/g, "").replace(/(\..*)\..*/g, "$1")
    );
    setTopUpAmount(numericValue || 0);
    setInputAmount(formatToIDR(numericValue));
  };

  const handleBayar = () => {
    if (!selectedService) {
      setError("Service not selected.");
      setIsErrorModalOpen(true);
      return;
    }
    if (topUpAmount <= 0) {
      setError("Please enter a valid amount.");
      setIsErrorModalOpen(true);
      return;
    }
    setInvoiceNumber("");
    setIsModalOpen(true);
  };

  const handleConfirmPayment = async () => {
    try {
      const transactionData = {
        service_code: selectedService.service_code,
        amount: topUpAmount,
        transaction_type: "PAYMENT",
      };
      const response = await TransactionApi(transactionData);
      if (response.data && response.data.status === 0) {
        setInvoiceNumber(response.data.data.invoice_number);
        setInputAmount("");
        setTopUpAmount(0);
      } else {
        setError(response.message || "Transaction failed. Please try again.");
        setIsSuccessModalOpen(true);
      }
    } catch (err) {
      console.error("Transaction error:", err);
      setError("Transaction failed. Please try again.");
      setIsErrorModalOpen(true);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="p-4 md:p-20 space-y-10 mt-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex flex-col items-start space-y-2">
          <img
            src={userProfile.profile_image}
            alt="Profile Avatar"
            className="w-16 h-16 rounded-full"
          />
          <h1 className="text-lg font-normal text-gray-600">Selamat datang,</h1>
          <h2 className="text-2xl font-bold text-gray-900">
            {userProfile.first_name} {userProfile.last_name}
          </h2>
        </div>
        <div className="flex justify-end md:col-span-2 ml-20 w-[50rem]">
          <Saldo />
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-xl font-semibold">PemBayaran</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {selectedService && (
            <img
              src={selectedService.service_icon}
              alt={`${selectedService.service_name} Icon`}
              className="w-16 h-16 rounded-md"
            />
          )}
        </div>
        <div className="text-lg font-bold mt-4">
          Tarif {selectedService?.service_name}: Rp.{" "}
          {selectedService?.service_tariff.toLocaleString()}
        </div>
        <div className="col-span-2 relative mt-4">
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={inputAmount}
              onChange={handleInputChange}
              placeholder="Rp. 0"
              className="border p-2 pl-10 w-full rounded focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>
        </div>
        <button
          onClick={handleBayar}
          className="mt-4 bg-red-500 text-white font-semibold rounded w-full py-2 hover:bg-red-600 disabled:bg-gray-200 disabled:cursor-not-allowed"
          disabled={!inputAmount || topUpAmount <= 0}
        >
          Bayar
        </button>
      </div>

      <div className="flex justify-center">
        <PaymentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmPayment}
          invoiceNumber={invoiceNumber}
          serviceTariff={topUpAmount}
          serviceName={selectedService?.service_name}
        />
        <PaymentSuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          invoiceNumber={invoiceNumber}
          serviceTariff={topUpAmount}
          serviceName={selectedService?.service_name}
        />
        <PaymentErrorModal
          isOpen={isErrorModalOpen}
          onClose={() => setIsErrorModalOpen(false)}
          errorMessage={error}
        />
      </div>
    </div>
  );
};

export default Bayar;
