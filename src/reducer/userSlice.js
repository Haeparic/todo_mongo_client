// 작은 store 역할의 slice
// 사용자 정보 저장 내용 userSlice
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    // 사용자 닉네임
    nickName: "", // 사용자 닉네임
    email: "",
    uid: "", // firebase 연동을 위한 고유식별자
    accessToken: "", //firebase 임시생성
  },
  reducers: {
    // 로그인 되면  user 스토어 state 업데이트
    loginUser: (state, action) => {
      // action.payload 로 담겨옮
      state.nickName = action.payload.displayName;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.accessToken = action.payload.accessToken;
    },
    // 로그아웃 하면 user 스토어 state 비우기
    clearUser: (state, action) => {
      state.nickName = "";
      state.email = "";
      state.uid = "";
      state.accessToken = "";
    },
  },
});
// 비구조화
export const { loginUser, clearUser } = userSlice.actions;
export default userSlice;
