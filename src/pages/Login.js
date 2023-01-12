import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginDiv from "../styles/loginCss";
// firebase 로그인
import firebase from "../firebase";
import { useSelector } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../reducer/userSlice"

const Login = () => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);

  // 글자 사라짐
  useEffect(() => {
    if (errMsg !== "") {
      setTimeout(() => {
        setErrMsg("");
      }, 3000);
    }
  }, [errMsg]);

  // 로그인 처리
  const signInFunc = (e) => {
    e.preventDefault();
    if (!email) {
      alert("이메일을 입력하세요.");
    }
    if (!pw) {
      alert("비밀번호를 입력하세요.");
    }

    const tempUser = firebase.auth();
    tempUser
      .signInWithEmailAndPassword(email, pw)
      .then((userCredential) => {
        // 로그인 성공
        const user = userCredential.user;
        console.log(user);
        // dispatch(loginUser(user))
        navigate("/todo");
        // Redux 를 이용한 App 의 store 관리 시작
        // component 의 state 로 관리하기는 복잡하다
      })
      .catch((error) => {
        // 로그인 실패
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(errorCode, errorMessage);
        if (errorCode === "auth/wrong-password") {
          setErrMsg("비밀번호를 확인하세요.");
        } else if (errorCode === "auth/user-not-found") {
          setErrMsg("이메일을 확인하세요.");
        } else {
          setErrMsg("로그인에 실패하였습니다.");
        }
      });
  };
  return (
    <div className="p-6 m-4 shadow">
      <h2>Login</h2>
      <LoginDiv>
        <form>
          <label>이메일</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>비밀번호</label>
          <input
            type="password"
            required
            minLength={6}
            maxLength={16}
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          {errMsg !== "" && (
            <p style={{ color: "red", textAlign: "center" }}>{errMsg}</p>
          )}
          <button onClick={(e) => signInFunc(e)}>로그인</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/signup");
            }}
          >
            회원가입
          </button>
        </form>
      </LoginDiv>
    </div>
  );
};

export default Login;
