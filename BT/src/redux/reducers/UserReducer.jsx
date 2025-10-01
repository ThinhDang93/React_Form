import { createSlice } from "@reduxjs/toolkit";
import { httpClient } from "../../Utils/interceptor";

const initialState = {
  arrAllUser: [],
  UserDetail: {},
};

const UserReducer = createSlice({
  name: "UserReducer",
  initialState,
  reducers: {
    setArrAllUser: (state, action) => {
      state.arrAllUser = action.payload;
    },
    setUserDetail: (state, action) => {
      state.UserDetail = action.payload;
    },
  },
});

export const { setArrAllUser, setUserDetail } = UserReducer.actions;

export default UserReducer.reducer;

export const getArrAllUserActionThunk = () => {
  return async (dispatch) => {
    const res = await httpClient.get("/api/users");
    dispatch(setArrAllUser(res.data.content));
  };
};

export const getUserDetailbyIDActionThunk = (id) => {
  return async (dispatch) => {
    const res = await httpClient.get(`/api/users/${id}`);
    dispatch(setUserDetail(res.data.content));
  };
};
