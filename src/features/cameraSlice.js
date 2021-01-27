import { createSlice } from "@reduxjs/toolkit";

export const cameraSlice = createSlice({
  name: "camera",
  initialState: {
    cameraImg: null,
  },
  reducers: {
    setImage: (state, action) => {
      state.cameraImg = action.payload;
    },
    resetImage: (state) => {
      state.cameraImg = null;
    },
  },
});

export const { setImage, resetImage } = cameraSlice.actions;

export const selectCameraImg = (state) => state.camera.cameraImg;

export default cameraSlice.reducer;
