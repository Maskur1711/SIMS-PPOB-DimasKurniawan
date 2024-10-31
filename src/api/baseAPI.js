import axios from "axios";

const BASE_URL = "https://take-home-test-api.nutech-integrasi.com";

// Register
export const registerUserApi = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/registration`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Login
export const loginUserApi = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// getProfile
export const getProfileApi = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token not found");
  }

  const response = await axios.get(`${BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// updateProfile
export const updateProfileApi = async (profileData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token not found");
  }

  try {
    const response = await axios.put(
      `${BASE_URL}/profile/update`,
      profileData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// UpdateProfileImage
export const updateProfileImageApi = async (formData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token not found");
  }

  const response = await axios.put(`${BASE_URL}/profile/image`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// GetLayanan/Serivces
export const getServicesApi = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token not found");
  }

  try {
    const response = await axios.get(`${BASE_URL}/services`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

// GetBanners
export const getBannersApi = async () => {
  const response = await axios.get(`${BASE_URL}/banner`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response;
};

// GetBalance
export const getBalanceApi = async () => {
  const response = await axios.get(`${BASE_URL}/balance`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response;
};

// PostTop Up Balance
export const topUpApi = async (top_up_amount) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token not found");
  }

  if (typeof top_up_amount !== "number" || top_up_amount < 0) {
    throw new Error("Amount must be a number greater than or equal to 0");
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/topup`,
      { top_up_amount },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// PostTransaction
export const TransactionApi = async (transactionData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token not found");
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/transaction`,
      transactionData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// GetHistoryTransaction
export const getTransactionHistoryApi = async (offset = 0, limit = null) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token not found");
  }

  try {
    const response = await axios.get(`${BASE_URL}/transaction/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        offset,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
