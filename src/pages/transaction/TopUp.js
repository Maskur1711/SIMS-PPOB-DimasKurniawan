import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// Components
import Saldo from "../../components/card/Balance";
import TopUpModal from "../../components/modal/TopUpModal";
import TopUpSuccessModal from "../../components/modal/TopUpSuccessModal";
import TopUpErrorModal from "../../components/modal/TopUpErrorModal";
// Icons
import { CreditCard } from "lucide-react";
// API
import { getProfileApi, topUpApi } from "../../api/baseAPI";

const TopUp = () => {
  const [userProfile, setUserProfile] = useState({});
  const [inputAmount, setInputAmount] = useState("");
  const [topUpAmount, setTopUpAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [error, setError] = useState("");

  const [invoiceNumber, setInvoiceNumber] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await getProfileApi();
        setUserProfile(profileData.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchUserProfile();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value.replace(/\./g, "");

    if (!/^\d*$/.test(value)) {
      return;
    }

    const amount = Number(value);

    setInputAmount(new Intl.NumberFormat("id-ID").format(amount));
    setTopUpAmount(amount);
  };

  const handleAmountClick = (amount) => {
    setInputAmount(new Intl.NumberFormat("id-ID").format(amount));
    setTopUpAmount(amount);
  };

  const handleTopUp = () => {
    setIsModalOpen(true);
  };

  const handleConfirmPayment = async () => {
    try {
      const response = await topUpApi(topUpAmount);
      setIsModalOpen(false);
      setIsSuccessModalOpen(true);
      setInvoiceNumber(response.invoiceNumber);

      setTimeout(() => {
        navigate("/pembayaran");
      }, 2000);

      setInputAmount("");
      setTopUpAmount(0);
    } catch (err) {
      console.error("Top-up failed:", err);
      setIsModalOpen(false);
      setIsErrorModalOpen(true);
      setError(
        err.response?.data?.message || "Top-up gagal. Silakan coba lagi."
      );
    }
  };

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="p-4 md:p-20 space-y-10 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
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
        <div className="flex justify-end md:col-span-2 ml-20">
          <Saldo />
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-lg font-normal">Silahkan masukan</h1>
        <h2 className="text-2xl font-bold">Nominal Top Up</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          <div className="col-span-2 relative">
            <CreditCard className="absolute left-4 top-[22px] transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={inputAmount}
              onChange={handleInputChange}
              onKeyDown={(event) => {
                if (!/\d/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              placeholder="masukan nominal Top Up"
              className="border p-2 pl-10 w-full rounded focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
            <button
              onClick={handleTopUp}
              className="mt-2 bg-red-500 text-white font-semibold rounded w-full py-2 hover:bg-red-600 disabled:bg-red-200 disabled:cursor-not-allowed"
              disabled={!inputAmount || topUpAmount <= 0}
            >
              Top Up
            </button>
          </div>
          <div className="col-span-1 grid grid-cols-3 gap-2">
            {[10000, 20000, 50000, 100000, 250000, 500000].map((amount) => (
              <button
                key={amount}
                onClick={() => handleAmountClick(amount)}
                className={`border rounded py-2 w-full flex justify-center items-center ${
                  topUpAmount === amount
                    ? "bg-red-500 text-white"
                    : "text-gray-500"
                } hover:bg-red-100 overflow-hidden`}
                style={{ maxWidth: "120px" }}
              >
                Rp{formatNumber(amount)}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <TopUpModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirmPayment}
            serviceTariff={topUpAmount}
            serviceName="Top-Up"
          />
          <TopUpSuccessModal
            isOpen={isSuccessModalOpen}
            onClose={() => setIsSuccessModalOpen(false)}
            invoiceNumber={invoiceNumber}
            serviceTariff={topUpAmount}
            serviceName="Top-Up"
          />
          <TopUpErrorModal
            isOpen={isErrorModalOpen}
            onClose={() => setIsErrorModalOpen(false)}
            errorMessage={error}
          />
        </div>
      </div>
    </div>
  );
};

export default TopUp;
