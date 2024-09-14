import "./App.css";
import "../src/CSS/main.css";

import FlareIcon from "@mui/icons-material/Flare";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import ToDoList from "./components/ToDoList";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { ListContext } from "./contexts/listContext";

const toDoList = [];

function App() {
  const [todos, setTodos] = useState(toDoList);
  const [input, setInput] = useState("");
  const [buttonType, setButtonType] = useState("all");

  const completedList = todos.filter((l) => {
    return l.isCompleted;
  });
  const activeList = todos.filter((l) => {
    return !l.isCompleted;
  });
  const numberOfActiveTodo = activeList.length;

  function handleAdd() {
    const newList = {
      id: uuidv4(),
      title: input,
      isCompleted: false,
    };
    const updatedToDo = [...todos, newList];
    if (input.trim() !== "") {
      setTodos(updatedToDo);
      localStorage.setItem("todos", JSON.stringify(updatedToDo));
      setInput("");
    }
  }
  useEffect(() => {
    const storageToDo = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageToDo);
  }, []);

  const changeType = (e) => {
    setButtonType(e.target.value);
  };
  let todoToBeRendered = todos;
  if (buttonType === "completed") {
    todoToBeRendered = completedList;
  } else if (buttonType === "active") {
    todoToBeRendered = activeList;
  } else {
    todoToBeRendered = todos;
  }
  const handleClear = () => {
    if (todos.length > 0) {
      if (completedList.length > 0) {
        setTodos(activeList);
        localStorage.setItem("todos", JSON.stringify(activeList));
      } else {
        alert("There are currently no completed tasks to clear.");
      }
    } else {
      alert("There are currently no completed tasks to clear.");
    }
  };
  return (
    <div className="App">
      <div className="container">
        <div className="head">
          <div className="header">
            <div className="color">TODO</div>
            <FlareIcon className="icon"/>
          </div>
          <div className="row">
            <CircleOutlinedIcon className="checkbtn" />
            <input
              type="text"
              className="todo-input"
              placeholder="Create a new todo"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && input.trim() !== "") {
                  handleAdd();
                }
              }}
            />
            <button id="addBtn" onClick={handleAdd}>
              +
            </button>
          </div>
        </div>
        <div className="todo-list">
          <div>
            <ListContext.Provider value={{ todos, setTodos }}>
              <ToDoList todo={todoToBeRendered} />
            </ListContext.Provider>
          </div>
          {/* --- Filter Buttons --- */}
          <div className="filter">
            <output>{numberOfActiveTodo} items left</output>
            <button
              value="all"
              type="button"
              onClick={changeType}
              className={buttonType === "all" ? "active" : ""}
            >
              All
            </button>
            <button
              value="active"
              type="button"
              onClick={changeType}
              className={buttonType === "active" ? "active" : ""}
            >
              Active
            </button>
            <button
              value="completed"
              type="button"
              onClick={changeType}
              className={buttonType === "completed" ? "active" : ""}
            >
              Completed
            </button>
            <button type="button" onClick={handleClear}>
              Clear completed
            </button>
          </div>
        </div>
      </div>
      <footer>© 2024 Mai Lahlouh | All Rights Reserved</footer>
    </div>
  );
}
export default App;
