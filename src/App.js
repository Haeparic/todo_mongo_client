import React, { useEffect } from "react";
// react-redux 모듈
import { useSelector, useDispatch } from "react-redux";
// firebase 라이브러리 활용
import firebase from "./firebase";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Todo from "./pages/Todo";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import { loginUser, clearUser } from "./reducer/userSlice";
import Userinfo from "./pages/Userinfo";

export default function App() {
  // action 을 보내서 store.user.state 를 업데이트
  const dispatch = useDispatch();
  // 내용 출력하기
  // const user = useSelector((state) => state.user);

  // 로그인 상태 테스트
  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      // firebase 에 로그인 시 출력 정보 확인
      // console.log("로그인 정보 : ", userInfo);
      if (userInfo) {
        // 로그인 시 store.user.state 에 info 저장
        // 여기에서 userInfo 는 Firebase 사이트에서 준 것
        dispatch(loginUser(userInfo.multiFactor.user));
      } else {
        // 로그아웃 시 store.user.state 를 초기화
        dispatch(clearUser());
      }
    });
  });
  // // 임시로 로그아웃을 컴포넌트가 마운트 될때 실행
  // useEffect(() => {
  //   // 로그아웃
  //   // firebase.auth().signOut();
  // }, []);

  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/userinfo" element={<Userinfo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}
