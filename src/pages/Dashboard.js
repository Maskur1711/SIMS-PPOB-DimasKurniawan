import React, { useEffect, useState } from "react";

// Components
import Layanan from "../components/card/Layanan";
import Saldo from "../components/card/Balance";

// Assets
import Profile from "../assets/Profile Photo.png";
import ImageSlider from "../components/slider/ImageSlider";
import { getProfileApi } from "../api/baseAPI";

export const Dashboard = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await getProfileApi();
        setProfileData(data.data);
      } catch (err) {
        setError("Token tidak valid atau kadaluwarsa.");
      } finally {
        setLoading(false);
      }
    };

    getProfile();

    const timer = setTimeout(() => {
      setShowProfile(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4 md:p-16 mt-20">
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${
          loading ? "animate-pulse" : ""
        }`}
      >
        <div className="col-span-1 md:col-span-2 flex items-start justify-between">
          {loading && showProfile && (
            <img
              src={Profile}
              alt="Loading Profile Avatar"
              className="w-16 h-16 rounded-full mb-2"
            />
          )}
          {error && showProfile && (
            <h2 className="text-lg md:text-2xl font-bold text-red-500">
              {error}
            </h2>
          )}
          {!loading && showProfile && profileData && (
            <div className="flex items-center w-full">
              <div className="flex flex-col">
                <img
                  src={profileData.profile_image}
                  alt="Profile Avatar"
                  className="w-16 h-16 rounded-full mb-2"
                />
                <h1 className="text-lg md:text-xl font-normal">
                  Selamat Datang,
                </h1>
                <h2 className="text-lg md:text-2xl font-bold">
                  {profileData.first_name} {profileData.last_name}
                </h2>
              </div>
              <div className="ml-auto flex justify-end w-[50rem]">
                <Saldo />
              </div>
            </div>
          )}
        </div>
      </div>
      <Layanan />
      <ImageSlider />
    </div>
  );
};

export default Dashboard;
