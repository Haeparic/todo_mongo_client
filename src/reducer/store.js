// slice 들을 모아서 store 에 저장
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

// local storage 사용
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

const reducers = combineReducers({
  user: userSlice.reducer,
});

const persistConfig = {
  key: "root",
  //local storage에 저장
  storage: storageSession,
  whitelist: ["user"],
};
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  // reducer: { user: userSlice.reducer },
  reducer: persistedReducer,
  // 임시로 middleware 체크 기능 제거
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
