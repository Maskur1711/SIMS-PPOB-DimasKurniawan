import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetMessage } from "../../redux/auth/authSlice";

// Assets
import Ilustrasi from "../../assets/Illustrasi Login.png";
import Logo from "../../assets/Logo.png";

// Icons
import { AtSign, User, Lock, Eye, EyeOff } from "lucide-react";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [notification, setNotification] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPasswordTouched(true);
    setNotification("");

    if (formData.password !== formData.confirmPassword) {
      setNotification("Passwords do not match!");
      return;
    }

    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (message) {
      setNotification(message);
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (error) {
      setNotification(error);
    }

    const timer = setTimeout(() => {
      dispatch(resetMessage());
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, error, dispatch, navigate]);

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="flex flex-col justify-center items-center lg:w-1/2 w-full bg-white p-20">
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center space-x-2">
            <img src={Logo} alt="Logo" className="w-7 h-7" />
            <span className="text-lg font-semibold">SIMS PPOB</span>
          </h2>
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Lengkapi data untuk membuat akun
          </h2>

          <div className="relative mb-4">
            <AtSign className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="masukkan email anda"
              className="block w-full pl-10 pr-3 py-3 border rounded focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative mb-4">
            <User className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="first_name"
              placeholder="nama depan"
              className="block w-full pl-10 pr-3 py-3 border rounded focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative mb-4">
            <User className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="last_name"
              placeholder="nama belakang"
              className="block w-full pl-10 pr-3 py-3 border rounded focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative mb-4">
            <Lock className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="buat password"
              className="block w-full pl-10 pr-10 py-3 border rounded focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-4 focus:outline-none"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-gray-400" />
              ) : (
                <Eye className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>

          <div className="relative mb-4">
            <Lock className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="konfirmasi password"
              className={`block w-full pl-10 pr-10 py-3 border rounded focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 ${
                passwordTouched && formData.password !== formData.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-4 focus:outline-none"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5 text-gray-400" />
              ) : (
                <Eye className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-4 w-full rounded hover:bg-red-600"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <p className="text-center mt-4">
            Sudah punya akun? Login{" "}
            <Link to="/login" className="text-red-500 font-bold">
              di sini
            </Link>
          </p>
        </form>

        {notification && (
          <div
            className={`mt-4 p-2 border ${
              message ? "border-green-500 bg-green-300 rounded-lg" : "border-red-500 bg-red-300 rounded-lg"
            } text-white text-center`}
          >
            {notification}
          </div>
        )}
      </div>

      <div className="hidden lg:block lg:w-1/2 h-full">
        <img src={Ilustrasi} alt="Ilustrasi" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Register;
