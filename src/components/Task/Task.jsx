import React from "react";
import classNames from "classnames";

// ? Иконка
import checkMark from "../../assets/images/checkMark.svg";
import closeList from "../../assets/images/closeList.svg";


const Task = ({ id, text, color, deleteTask }) => {
  return (
    <div className="task" key={id}>
      <div className="checkbox">
        <input type="checkbox" id={`task-${id}`} />
        <label htmlFor={`task-${id}`}>
          <img src={checkMark} alt="checkMark" />
        </label>
      </div>
      <input
        className={classNames(`task__input task__input--${color}`)}
        type="text"
        value={text}
        readOnly
      />
      <div className="task__close-icon">
        <img src={closeList} alt="closeList" onClick={() => deleteTask(id)} />
      </div>
    </div>
  );
};

export default Task;
