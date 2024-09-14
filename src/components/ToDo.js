import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useContext, useState } from "react";
import { ListContext } from "../contexts/listContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
export default function ToDo({ todo }) {
  const { todos, setTodos } = useContext(ListContext);
  const [iconBtn, setIconBtn] = useState(false);
  const changeStyle = todo.isCompleted ? "style2" : "style1";
  function handleCheckClick() {
    const updateToDo = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updateToDo);
    localStorage.setItem("todos", JSON.stringify(updateToDo));
  }
  function handleDeleteTodo() {
    const updateTodo = todos.filter((t) => {
      return t.id !== todo.id;
    });
    setTodos(updateTodo);
    localStorage.setItem("todos", JSON.stringify(updateTodo));
  }
  const handleMouseOver = () => {
    setIconBtn(true);
  };
  const handleMouseOut = () => {
    setIconBtn(false);
  };
  return (
    <div
      className="task"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <IconButton onClick={handleCheckClick}>
        {todo.isCompleted ? (
          <CheckCircleIcon className="checkbtn" />
        ) : (
          <CircleOutlinedIcon className="checkbtn" />
        )}
      </IconButton>
      <span className={changeStyle}>{todo.title}</span>
      <IconButton onClick={handleDeleteTodo}>
        <HighlightOffIcon
          className={iconBtn ? "deleteIcon" : "hide"}
        ></HighlightOffIcon>
      </IconButton>
    </div>
  );
}
