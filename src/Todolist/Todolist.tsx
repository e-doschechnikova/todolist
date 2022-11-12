import React, {memo, useCallback} from "react";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../components/EditableSpan/EditableSpan";
import {Button, IconButton, List} from "@material-ui/core";
import {DeleteOutlineOutlined} from "@material-ui/icons";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../api/todolist-api";
import {FilterValuesType} from "../reducers/todolists-reducer";

type TodoListPropsType = {
    id: string;
    title: string;
    tasks: TaskType[];
    filter: FilterValuesType;

    addTask: (title: string, todolistID: string) => void;
    removeTask: (taskID: string, todolistID: string) => void;
    changeTaskTitle: (
        taskTitle: string,
        title: string,
        todolistID: string
    ) => void;
    changeTaskStatus: (
        taskID: string,
        status: TaskStatuses,
        todolistID: string
    ) => void;

    changeTodoListFilter: (filter: FilterValuesType, todolistID: string) => void;
    changeTodoListTitle: (title: string, todolistID: string) => void;

    removeTodolist: (todolistID: string) => void;
};

export const TodoList = memo((props: TodoListPropsType) => {

    let tasks = props.tasks;

    if (props.filter === "active") {
        tasks = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    // const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.id), [props.removeTask, props.id]);
    // const changeTaskStatus = useCallback((taskId: string, newTaskStatus: boolean) =>
    //     props.changeTaskStatus(taskId, newTaskStatus, props.id), [props.changeTaskStatus, props.id]);
    // const changeTaskTitle = useCallback((taskId: string, newTaskTitle: string) => {
    //     props.changeTaskTitle(taskId, newTaskTitle, props.id)
    // }, [props.changeTaskTitle, props.id]);

    const tasksJSX = tasks.length ?
        tasks.map(t => <Task key={t.id}
                             task={t}
                             todolistID={props.id}
        />)
        : <span>Your taskslist is empty</span>;

    const createOnClickHandler = (filter: FilterValuesType) => {
        return () => props.changeTodoListFilter(filter, props.id);
    };
    const addTask = useCallback((title: string) => props.addTask(title, props.id), [props.addTask, props.id]);
    const removeTodolist = () => props.removeTodolist(props.id);
    const changeTodoListTitle = (todolistTitle: string) =>
        props.changeTodoListTitle(todolistTitle, props.id);

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton>
                    <DeleteOutlineOutlined color={"primary"} onClick={removeTodolist}/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <List style={{listStyle: "none"}}>{tasksJSX}</List>
            <div>
                <Button
                    size={"small"}
                    variant={"outlined"}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    onClick={createOnClickHandler("all")}
                    style={{margin: "5px"}}
                    /* onClick={() => props.changeTodoListFilter("all", props.id)}*/
                >
                    All
                </Button>
                <Button
                    size={"small"}
                    variant={"outlined"}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    onClick={createOnClickHandler("active")}
                    style={{margin: "5px"}}
                >
                    Active
                </Button>
                <Button
                    size={"small"}
                    variant={"outlined"}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    onClick={createOnClickHandler("completed")}
                    style={{margin: "5px"}}
                >
                    Completed
                </Button>
            </div>
        </div>
    );
})

