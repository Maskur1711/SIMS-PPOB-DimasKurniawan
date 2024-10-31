import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Assets
import Profile from "../../assets/Profile Photo.png";
import Email from "../../components/InputField/Email";
import Name from "../../components/InputField/Text";
import { Pencil } from "lucide-react";
import { getProfileApi } from "../../api/baseAPI";

const Akun = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfileApi();
        setProfileData(data.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex justify-center items-center mt-40">
      <div className="w-full max-w-md flex flex-col items-center relative">
        <div className="relative">
          <img
            src={profileData?.profile_image || Profile}
            alt="Profile Avatar"
            className="w-24 h-24 rounded-full mb-6"
          />
          <div className="absolute bottom-8 right-4 translate-x-1/2 translate-y-1/2">
            <button
              className="bg-white rounded-full p-1 shadow hover:bg-gray-100 cursor-not-allowed opacity-50"
              disabled
            >
              <Pencil className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
        <div className="w-full mb-4">
          <Email
            value={profileData?.email || ""}
            readOnly
            className="focus:ring focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <div className="w-full mb-4">
          <h1 className="text-gray-700 text-base mb-1">Nama Depan</h1>
          <Name
            value={profileData?.first_name || ""}
            readOnly
            placeholder="First Name"
            className="focus:ring focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <div className="w-full mb-4">
          <h1 className="text-gray-700 text-base mb-1">Nama Belakang</h1>
          <Name
            value={profileData?.last_name || ""}
            readOnly
            placeholder="Last Name"
            className="focus:ring focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <div className="w-full flex justify-center mb-4">
          <Link to="/EditAkun" className="w-full">
            <button className="text-red-500 font-semibold border border-red-500 rounded px-4 py-2 hover:bg-red-100 w-full">
              Edit Profile
            </button>
          </Link>
        </div>

        <div className="w-full flex justify-center">
          <button
            className="bg-red-500 text-white font-semibold border border-red-500 rounded px-4 py-2 hover:bg-red-600 w-full"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Akun;
