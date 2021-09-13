import "./Tasks.scss";

import React from "react";

// ? Иконка
import checkMark from "../../assets/images/checkMark.svg";
import closeList from "../../assets/images/closeList.svg";

export default function Tasks() {
  return (
    <div>
      <div className="task__header">Фронтенд</div>
      {console.log("hello")}
      <div className="task">
        <div className="checkbox">
          <input type="checkbox" id="check" />
          <label htmlFor="check">
            <img src={checkMark} alt="checkMark" />
          </label>
        </div>
        <input
          className="task__input"
          type="text"
          value="ReactJS Hooks (useState, useReducer, useEffect и т.д.)"
        />
        <div className="task__close-icon">
          <img src={closeList} alt="closeList" />
        </div>
      </div>
    </div>
  );
}
