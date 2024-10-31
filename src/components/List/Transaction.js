import React, { useEffect, useState } from "react";
import { getTransactionHistoryApi } from "../../api/baseAPI";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [errorTransactions, setErrorTransactions] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 5;

  const fetchTransactions = async (newOffset) => {
    setLoadingTransactions(true);
    try {
      const data = await getTransactionHistoryApi(newOffset, limit);
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        ...data.data.records,
      ]);
      setOffset(newOffset + limit);
    } catch (err) {
      setErrorTransactions("Failed to load transaction history.");
    } finally {
      setLoadingTransactions(false);
    }
  };

  useEffect(() => {
    fetchTransactions(0);
  }, []);

  if (errorTransactions)
    return <p className="text-red-500">{errorTransactions}</p>;

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.invoice_number}
          className="flex justify-between items-center border bg-white shadow-sm rounded-lg px-6 py-4"
        >
          <div className="flex flex-col">
            <span
              className={`font-medium ${
                transaction.transaction_type === "TOPUP"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {transaction.transaction_type === "TOPUP"
                ? `+ Rp${transaction.total_amount.toLocaleString()}`
                : `- Rp${transaction.total_amount.toLocaleString()}`}
            </span>
            <span className="text-gray-500 text-sm">
              {new Date(transaction.created_on).toLocaleDateString("id-ID")} -{" "}
              {new Date(transaction.created_on).toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              WIB
            </span>
          </div>
          <span className="text-gray-500 text-sm">
            {transaction.description}
          </span>
        </div>
      ))}
      <div className="text-center">
        {loadingTransactions ? (
          <p className="border bg-red-500 rounded-lg text-white py-3 px-3">
            Loading transactions...
          </p>
        ) : (
          <button
            onClick={() => fetchTransactions(offset)}
            className="mt-4 text-red-500 text-sm font-semibold"
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
};

export default Transaction;
