import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { TasksPropsType } from "./Todolist";

const useState2 = (data: any) => {
  return [data, () => {}];
};

let arr = useState2([{}, {}, {}]);

let tasks = arr[0];
let setTasks = arr[1];

function App() {
  let initTasks: Array<TasksPropsType> = [
    { id: 1, title: "CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "React", isDone: false },
    { id: 4, title: "Redux", isDone: false },
  ];

  let arr = useState(initTasks);

  let tasks = arr[0];
  let setTasks = arr[1];

  const removeTask = (id: number) => {
    let filteredTasks = tasks.filter((el) => el.id !== id);
    setTasks(filteredTasks);

    // const tasks2: Array<TasksPropsType> = [
    //   // { id: 1, title: "The Notebook", isDone: false },
    //   { id: 2, title: "The Great Gatsby", isDone: false },
    //   { id: 3, title: "The Age of Adaline", isDone: true },
    // ];

    return (
      <div className="App">
        <Todolist title="What to learn" tasks={tasks} removeTask={removeTask} />
        {/* <Todolist title="What to watch" tasks={tasks2}/> */}
      </div>
    );
  };
}
export default App;
