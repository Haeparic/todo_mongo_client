import axios from "axios";
import React, { useState } from "react";

const ListItem = React.memo(({ item, todoData, setTodoData, deleteClick }) => {
  // console.log("ListItem Rendering...");

  // 현재 편집 중인지 아닌지를 관리하는 State 생성
  // isEditing 이 false 라면 목록을 보여줌
  // isEditing 이 true 라면 편집을 보여줌
  const [isEditing, setIsEditing] = useState(false);
  // 제목을 출력하고 변경하는 state
  // 편집창에는 타이틀이 먼저 작정되어 있어야 하므로로
  const [editedTitle, setEditedTitle] = useState(item.title);

  // console.log(item);
  // const deleteClick = (id) => {
  //   // 클릭된 id 와 다른 요소들만 걸러서 새로운 배열 생성
  //   const nowTodo = todoData.filter((item) => item.id !== id);
  //   // console.log("클릭", nowTodo);
  //   setTodoData(nowTodo);
  // };

  // 편집창 내용 갱신 처리
  const editChange = (event) => {
    setEditedTitle(event.target.value);
  };

  // 현재 item.id 에 해당하는 것만 업데이트한다
  const todoId = item.id;
  const updateTitle = () => {
    // 공백 문자열 제거 추가
    let str = editedTitle;
    str = str.replace(/^\s+|\s+$/gm, "");
    if (str.length === 0) {
      alert("제목을 입력하세요.");
      setEditedTitle("");
      return;
    }

    let tempTodo = todoData.map((item) => {
      // 모든 todoData 중에 현재 id 와 같다면
      if (item.id === todoId) {
        // 타이틀 글자를 수정하겠다
        item.title = editedTitle;
      }
      return item;
    });
    let body = {
      id: todoId,
      title: editedTitle,
    };
    // 데이터 갱신
    // axios 를 이용해서 MongoDB 타이틀 업데이트
    axios
      .post("/api/post/updatetitle", body)
      .then((res) => {
        setTodoData(tempTodo);
        // 목록창으로 이동
        setIsEditing(false);
      })
      .catch((err) => {
        console.log(err);
      });
    // 로컬에 저장한다 (DB 예정)
    // localStorage.setItem("todoData", JSON.stringify(tempTodo));
  };

  const toggleClick = (id) => {
    // map 을 통해서 this.state.todoData 의 complete 를 업데이트 해보자
    const updateTodo = todoData.map((item) => {
      if (item.id === id) {
        // if (item.id === true) {
        //   item.completed = false;
        // } else {
        //   item.completed = true;
        // }
        // 할일목록의 값을 번경한다
        // ! 의 의미는 반대값으로 변경한다
        item.completed = !item.completed;
      }
      return item;
    });
    let body = {
      id: todoId,
      completed: item.completed,
    };
    // axios 를 이용해서 MongoDB complete 업데이트
    // then() : 서버에서 회신(응답)이 왔을때 처리
    // catch() : 서버에서 응답이 없을때
    axios
      .post("/api/post/updatetoggle", body)
      .then((res) => {
        // console.log(res);
        setTodoData(updateTodo);
      })
      .catch((err) => {
        console.log(err);
      });
    // 로컬에 저장한다 (DB 예정)
    // localStorage.setItem("todoData", JSON.stringify(updateTodo));
  };
  // 날짜 출력
  const showTime = (_timestamp) => {
    const date = new Date(_timestamp);
    // const WEEKDAY = ["일", "월", "화", "수", "목", "금", "토"];
    let months = date.getMonth();
    months = months + 1 < 9 ? "0" + (months + 1) : months + 1;
    // 시간 오전, 오후 표시
    let hours = date.getHours();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? "0" + hours : hours;
    // 분 표시
    let minutes = date.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let seconds = date.getSeconds();
    seconds = seconds < 10 ? "0" + seconds : seconds;

    let time = date.getFullYear();
    time += "/";
    time += months;
    time += "/";
    time += date.getDate();
    // time += "/";
    // time += WEEKDAY[date.getDay()];
    time += " ";
    time += hours;
    time += ":";
    time += minutes;
    time += ":";
    time += seconds;
    time += " ";
    time += ampm;
    return time;
  };

  if (isEditing) {
    // 편집일때 JSX 리턴
    return (
      <div key={item.id}>
        <div className="flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded">
          <div className="items-center">
            <input
              type="text"
              className="w-full px-3 py-2 mr-4 text-gray-500 bg-white border rounded"
              value={editedTitle}
              onChange={editChange}
            />
          </div>
          <div className="items-center">
            <button className="px-4 py-2" onClick={updateTitle}>
              Update
            </button>
            <button className="px-4 py-2" onClick={() => setIsEditing(false)}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    // 목록일때 JSX 리턴
    return (
      <div key={item.id}>
        <div className="flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded">
          <div className="items-center">
            <input
              type="checkbox"
              defaultChecked={item.completed}
              onChange={() => toggleClick(item.id)}
              className="mx-2"
            />
            <span className={item.completed ? "line-through" : "none"}>
              {item.title}
            </span>
          </div>
          <div className="items-center">
            <span>{showTime(item.id)}</span>
            <button
              className="px-4 py-2"
              onClick={() => {
                setIsEditing(true);
                setEditedTitle(item.title);
              }}
            >
              Edit
            </button>
            <button className="px-4 py-2" onClick={() => deleteClick(item.id)}>
              x
            </button>
          </div>
        </div>
      </div>
    );
  }
});

export default ListItem;
