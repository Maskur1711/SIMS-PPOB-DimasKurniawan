import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetMessage } from "../../redux/auth/authSlice";

// Assets
import Ilustrasi from "../../assets/Illustrasi Login.png";
import Logo from "../../assets/Logo.png";

// Icons
import { AtSign, Lock, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const [showValidationError, setShowValidationError] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");
    setIsPasswordInvalid(false);

    if (!isValidEmail(email)) {
      setValidationError("Parameter email tidak sesuai format.");
      setShowValidationError(true);
      return;
    }

    if (password.length < 8) {
      setValidationError("Password harus minimal 8 karakter.");
      setShowValidationError(true);
      return;
    }

    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (message) {
      navigate("/dashboard");
      dispatch(resetMessage());
    }

    if (error) {
      setValidationError(error);
      setShowValidationError(true);
      setIsPasswordInvalid(true);
      dispatch(resetMessage());
    }
  }, [message, error, navigate, dispatch]);

  const handleCloseError = () => {
    setShowValidationError(false);
    setValidationError("");
    setIsPasswordInvalid(false);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="flex justify-center items-center lg:w-1/2 w-full bg-white p-40">
        <form className="w-full max-w-md text-center" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-6 flex items-center justify-center space-x-2">
            <img src={Logo} alt="Logo" className="w-7 h-7" />
            <span className="text-lg font-semibold">SIMS PPOB</span>
          </h2>
          <h1 className="text-2xl font-semibold mb-6">
            Masuk atau buat akun untuk memulai
          </h1>

          <div className="relative mb-4">
            <AtSign className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="masukkan email anda"
              className="block w-full pl-10 pr-3 py-3 border rounded focus:border-red-500 focus:outline-none focus:ring-0 focus:ring-red-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative mb-4">
            <Lock
              className={`absolute left-3 top-4 w-5 h-5 ${
                isPasswordInvalid ? "text-red-500" : "text-gray-400"
              }`}
            />
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="masukkan password anda"
              className={`block w-full pl-10 pr-10 py-3 border rounded focus:ring-red-500 focus:outline-none ${
                isPasswordInvalid
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-red-500"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3 top-4 text-gray-400 hover:text-red-500"
              aria-label={passwordVisible ? "Hide password" : "Show password"}
            >
              {passwordVisible ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-4 w-full rounded hover:bg-red-600"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Masuk"}
          </button>

          <p className="mt-4">
            Belum punya akun? Registrasi{" "}
            <Link to="/register" className="text-red-500 font-bold">
              di sini
            </Link>
          </p>

          {showValidationError && (
            <div
              className={`mt-4 p-2 border rounded-lg flex justify-between items-center ${
                message
                  ? "border-green-500 bg-green-100"
                  : "border-red-100 bg-red-100"
              } text-red-500 text-sm`}
            >
              <span>{validationError}</span>
              <button
                onClick={handleCloseError}
                className="text-red-500 font-bold"
              >
                &times;
              </button>
            </div>
          )}
        </form>
      </div>

      <div className="hidden lg:block lg:w-1/2 h-full">
        <img
          src={Ilustrasi}
          alt="Ilustrasi"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
