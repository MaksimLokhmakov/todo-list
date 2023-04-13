import React from "react";
import classNames from "classnames";
import axios from "axios";

import "./Tasks.scss";

import { AddTaskForm, Task } from "..";

// ? Иконка
import closeList from "../../assets/images/closeList.svg";
import reductIcon from "../../assets/images/Reduct.svg";
import doneIcon from "../../assets/images/doneIcon.svg";

const Tasks = ({ list, onReductTitle, onAddTask, onDeleteTask }) => {
  let tempTitle = list.name;

  const [titleInputActive, setTitleInputActive] = React.useState(true);
  const [title, setTitle] = React.useState(list.name);

  React.useEffect(() => {
    setTitle(list.name);
  }, [list]);

  const deleteTask = (taskOnDeleteId) => {
    if (window.confirm("Удалить задачу?")) {
      axios
        .delete("http://localhost:3002/tasks/" + taskOnDeleteId)
        .then(() => onDeleteTask(taskOnDeleteId, list.id));
    }
  };

  const changeTitle = () => {
    if (title.length !== 0) {
      onReductTitle(list.id, title);
      setTitleInputActive(!titleInputActive);
      axios
        .patch("/lists/" + list.id, { name: title })
        .catch(() => alert("Не удалось обновить название списка!"));
    } else alert("Введите название списка!");
  };

  return (
    <div>
      <div className="task__header">
        <input
          className={classNames(
            `header-title header-title--${list.color.name}`,
            `${!titleInputActive && `task__input--${list.color.name}`}`
          )}
          name="titleInput"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          readOnly={titleInputActive}
        />
        {titleInputActive && (
          <img
            className="header__reduct-icon"
            src={reductIcon}
            alt="reductIcon"
            onClick={() => setTitleInputActive(!titleInputActive)}
          />
        )}
        {!titleInputActive && (
          <div className="header__input-active">
            <img
              src={doneIcon}
              style={{ width: "18px" }}
              alt="doneIcon"
              onClick={changeTitle}
            />
            <img
              src={closeList}
              alt="canselIcon"
              onClick={() => {
                setTitle(tempTitle);
                setTitleInputActive(!titleInputActive);
              }}
            />
          </div>
        )}
      </div>
      {!list && !list.tasks.length && <h1>Задачи отсутствуют</h1>}
      {list.tasks &&
        list.tasks.map((task) => {
          return (
            <Task
              key={task.id}
              {...task}
              color={list.color.name}
              deleteTask={deleteTask}
            />
          );
        })}
      <AddTaskForm list={list} onAddTask={onAddTask} />
    </div>
  );
};

export default Tasks;
