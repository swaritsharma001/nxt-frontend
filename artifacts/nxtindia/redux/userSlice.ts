import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DiscordUser {
  Id?: string;
  username?: string;
  pic?: string;
  isPremium?: boolean;
}

interface UserState {
  user: DiscordUser | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    seetUser: (state, action: PayloadAction<DiscordUser>) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { seetUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
