import { createSlice } from '@reduxjs/toolkit';
import { UI_CONFIGS } from 'src/configs/constants';

const initialState = {
  themeType: UI_CONFIGS.THEME_TYPE.light
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,

  reducers: {
    changeThemeType(state, action) {
      state.themeType = action.payload;
    },

    switchThemeType(state) {
      state.themeType =
        state.themeType === UI_CONFIGS.THEME_TYPE.light
          ? UI_CONFIGS.THEME_TYPE.dark
          : UI_CONFIGS.THEME_TYPE.light;
    }
  }
});

export const { changeThemeType, switchThemeType } = uiSlice.actions;

export const selectThemeType = (state) => state.uiSlice.themeType;

export default uiSlice.reducer;
