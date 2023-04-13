import React from "react";
import classNames from "classnames";
import axios from "axios";

// ? СТИЛИ
import "./List.scss";

// ? КОМПОНЕНТЫ
import Badge from "../Badge";

import closeList from "../../assets/images/closeList.svg";

const List = ({
  items,
  onClick,
  isRemoveble,
  onRemove,
  isActive,
  onShowTasks,
  tasks,
  activeHeader
}) => {
  const isRemove = (item) => {
    if (window.confirm("Удалить список?")) {
      axios.delete("http://localhost:3002/lists/" + item.id).then(() => {
        onRemove(item.id);
      });
    }
  };

  return (
    <ul onClick={onClick} className="todo__sidebar__list">
      {items.map((item, index) => (
        <li
          onClick={() => {
            onShowTasks && onShowTasks(item);
          }}
          key={index}
          className={classNames(item.className, {
            active: item.active ? item.active : !activeHeader && tasks && tasks.id === item.id,
          })}
        >
          <span>
            {item.icon ? item.icon : <Badge color={item.color.name} />}
            <span>
              {item.name}
              <span style={{ opacity: 0.3, marginLeft: "5px" }}>
                {item.tasks && `(${item.tasks.length})`}
              </span>
            </span>
          </span>
          {isRemoveble && (
            <img
              onClick={() => isRemove(item)}
              className="list__closeIcon"
              src={closeList}
              alt="closeIcon"
            />
          )}
        </li>
      ))}
    </ul>
  );
};
export default List;
