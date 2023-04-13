import React from "react";
import axios from "axios";
import classNames from "classnames";

import AddIcon from "../../assets/images/add.svg";

const AddTaskForm = ({ list, onAddTask }) => {
  const [addTaskForm, setAddTaskForm] = React.useState(false);
  const [formInputValue, setFormInputValue] = React.useState("");

  React.useEffect(() => {
    setAddTaskForm(false);
  }, [list]);

  const addTask = () => {
    if (formInputValue) {
      axios
        .post("/tasks", {
          listId: list.id,
          text: formInputValue,
          comleted: false,
        })
        .then(({ data }) => {
          console.log(data);
          onAddTask(list.id, data);
          changeFormVisability(addTaskForm);
        })
        .catch(() => {
          alert("faile");
        });
    } else alert("Введите название задачи!");
  };

  const changeFormVisability = (bool) => {
    setAddTaskForm(!bool);
    setFormInputValue("");
  };

  return (
    <div>
      {!addTaskForm && (
        <div
          className="add-newTask"
          onClick={() => changeFormVisability(addTaskForm)}
        >
          <img src={AddIcon} alt="AddIcon" />
          <span className="add-newTask__text">Новая задача</span>
        </div>
      )}
      {addTaskForm && (
        <div className="add-newTask__form">
          <input
            value={formInputValue}
            onChange={(event) => setFormInputValue(event.target.value)}
            type="text"
            placeholder="Текст задачи"
            className={classNames(`form__input--${list.color.name}`)}
          />
          <div>
            <button
              className="button"
              style={{ marginRight: "10px" }}
              onClick={addTask}
            >
              Добавить задачу
            </button>
            <button
              onClick={() => changeFormVisability(addTaskForm)}
              className="button button-cancel"
              style={{ background: "#F4F6F8" }}
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;
