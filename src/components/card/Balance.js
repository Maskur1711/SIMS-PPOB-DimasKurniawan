import { useEffect, useState } from "react";
// Icons
import { Eye, EyeOff } from "lucide-react";
// API
import { getBalanceApi } from "../../api/baseAPI";

// Assets
import BackgroundSaldo from "../../assets/Background Saldo.png";

const Balance = () => {
  const [balance, setBalance] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await getBalanceApi();
        const fetchedBalance = response?.data?.data?.balance;
        if (fetchedBalance !== undefined) {
          setBalance(fetchedBalance);
        } else {
          setErrorMessage("No balance found");
        }
      } catch (error) {
        setErrorMessage("Failed to get balance. Please try again.");
      }
    };

    fetchBalance();
  }, []);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div
      className="text-white p-4 md:p-6 rounded-lg shadow-lg w-full h-auto"
      style={{
        backgroundImage: `url(${BackgroundSaldo})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        height: "100%",
      }}
    >
      <h2 className="text-lg md:text-xl mb-2">Saldo Anda</h2>
      <p className="text-2xl md:text-3xl mb-2">
        {isVisible ? `Rp ${balance?.toLocaleString()}` : "Rp ●●●●●●●"}
      </p>
      <p className="flex items-center">
        <span className="mr-2">Lihat Saldo</span>
        <button onClick={toggleVisibility} className="text-white">
          {isVisible ? (
            <EyeOff className="inline" />
          ) : (
            <Eye className="inline" />
          )}
        </button>
      </p>
      {errorMessage && <p className="text-red-300">{errorMessage}</p>}
    </div>
  );
};

export default Balance;
