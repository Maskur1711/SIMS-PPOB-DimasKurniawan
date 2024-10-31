import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProfileApi,
  updateProfileApi,
  updateProfileImageApi,
} from "../../api/baseAPI";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async () => {
    const response = await getProfileApi();
    return response.data;
  }
);

export const saveProfile = createAsyncThunk(
  "profile/saveProfile",
  async (profileData, { getState }) => {
    const { profile } = getState();

    await updateProfileApi(profileData);

    if (profile.newProfileImage) {
      const formData = new FormData();
      formData.append("file", profile.newProfileImage);
      const response = await updateProfileImageApi(formData);
      return { ...profileData, profile_image: response.data.profile_image };
    }

    return profileData;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    email: "",
    first_name: "",
    last_name: "",
    profile_image: "",
    originalData: {},
    newProfileImage: null,
    imagePreview: "",
    isEdited: false,
    successMessage: "",
    loading: false,
  },
  reducers: {
    setField(state, action) {
      const { name, value } = action.payload;
      state[name] = value;
      state.isEdited = value !== state.originalData[name] || value === "";
    },
    setNewProfileImage(state, action) {
      state.newProfileImage = action.payload.file;
      state.imagePreview = action.payload.preview;
      state.isEdited = true;
      state.successMessage = "";
    },
    resetSuccessMessage(state) {
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        const profile = action.payload;
        state.email = profile.email;
        state.first_name = profile.first_name;
        state.last_name = profile.last_name;
        state.profile_image = profile.profile_image;
        state.imagePreview = profile.profile_image;
        state.originalData = profile;
        state.loading = false;
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        const updatedProfile = action.payload;
        state.email = updatedProfile.email;
        state.first_name = updatedProfile.first_name;
        state.last_name = updatedProfile.last_name;
        state.profile_image = updatedProfile.profile_image;
        state.imagePreview = updatedProfile.profile_image;
        state.originalData = updatedProfile;
        state.isEdited = false;
        state.successMessage = "Profile updated successfully!";
        state.loading = false;
      });
  },
});

export const { setField, setNewProfileImage, resetSuccessMessage } =
  profileSlice.actions;
export default profileSlice.reducer;
