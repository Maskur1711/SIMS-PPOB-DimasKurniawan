import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../../assets/Profile Photo.png";
import Email from "../../components/InputField/Email";
import Name from "../../components/InputField/Text";
import { Pencil } from "lucide-react";
import {
  fetchProfile,
  saveProfile,
  setField,
  setNewProfileImage,
  resetSuccessMessage,
} from "../../redux/profile/profileSlice";

const EditAkun = () => {
  const dispatch = useDispatch();
  const {
    email,
    first_name,
    last_name,
    imagePreview,
    isEdited,
    successMessage,
    loading,
  } = useSelector((state) => state.profile);

  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setField({ name, value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      const fileSize = file.size;

      if (
        (fileType === "image/jpeg" || fileType === "image/png") &&
        fileSize <= 100 * 1024
      ) {
        const preview = URL.createObjectURL(file);
        dispatch(setNewProfileImage({ file, preview }));
        setErrorMessage("");
      } else {
        setErrorMessage(
          "Image must be in JPEG or PNG format and less than 100KB."
        );
        dispatch(resetSuccessMessage());
      }
    }
  };

  const handleSave = () => {
    dispatch(saveProfile({ email, first_name, last_name }));
  };

  return (
    <div className="flex justify-center items-center mt-32">
      <div className="w-full max-w-md flex flex-col items-center relative">
        <div className="relative">
          <img
            src={imagePreview || Profile}
            alt="Profile Avatar"
            className="w-24 h-24 rounded-full mb-6"
          />
          <div className="absolute bottom-8 right-4 translate-x-1/2 translate-y-1/2">
            <button
              className="bg-white rounded-full p-1 shadow hover:bg-gray-100"
              onClick={() => fileInputRef.current.click()}
            >
              <Pencil className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
        <input
          type="file"
          accept="image/jpeg, image/png"
          onChange={handleImageChange}
          ref={fileInputRef}
          className="hidden"
        />
        {errorMessage && (
          <div className="text-white rounded-lg py-2 px-3 text-sm mt-2 border bg-red-400 mb-4">{errorMessage}</div>
        )}
        <div className="w-full mb-4">
          <Email value={email} onChange={handleInputChange} />
        </div>
        <div className="w-full mb-4">
          <h1 className="text-gray-700 text-base mb-1">Nama Depan</h1>
          <Name
            name="first_name"
            value={first_name}
            onChange={handleInputChange}
            placeholder="First Name"
          />
        </div>
        <div className="w-full mb-4">
          <h1 className="text-gray-700 text-base mb-1">Nama Belakang</h1>
          <Name
            name="last_name"
            value={last_name}
            onChange={handleInputChange}
            placeholder="Last Name"
          />
        </div>
        <div className="w-full flex justify-center">
          <button
            className={`font-semibold border rounded px-4 py-2 w-full ${
              isEdited
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-red-400 text-white"
            }`}
            onClick={handleSave}
            disabled={!isEdited || loading}
          >
            Simpan
          </button>
        </div>
        {successMessage && (
          <div
            className={`mt-4 p-2 border w-full rounded-lg ${
              successMessage.includes("successfully")
                ? "bg-green-300"
                : "bg-red-300"
            } text-white text-center`}
          >
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditAkun;
