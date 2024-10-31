import React, { useEffect, useState } from "react";
import { getProfileApi } from "../../api/baseAPI";

// Components
import Saldo from "../../components/card/Balance";
import Profile from "../../assets/Profile Photo.png";
import TransactionList from "../../components/List/Transaction";

const ViewTransaction = () => {
  const [profileData, setProfileData] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [errorProfile, setErrorProfile] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await getProfileApi();
        setProfileData(data.data);
      } catch (err) {
        setErrorProfile("Token tidak valid atau kadaluwarsa.");
      } finally {
        setLoadingProfile(false);
      }
    };

    getProfile();
  }, []);

  return (
    <div className="min-h-scree p-8 mt-10">
      <main className="px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1 md:col-span-2 flex items-start justify-between">
            {loadingProfile && (
              <img
                src={Profile}
                alt="Loading Profile Avatar"
                className="w-16 h-16 rounded-full mb-2"
              />
            )}
            {errorProfile && (
              <h2 className="text-lg md:text-2xl font-bold text-red-500">
                {errorProfile}
              </h2>
            )}
            {!loadingProfile && !errorProfile && profileData && (
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

        <section className="mt-10">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 item">
            Semua Transaksi
          </h3>
          <TransactionList />
        </section>
      </main>
    </div>
  );
};

export default ViewTransaction;
