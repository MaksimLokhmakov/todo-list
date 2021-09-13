import React from "react";
import classNames from "classnames";

// ? СТИЛИ
import "./List.scss";

// ? КОМПОНЕНТЫ
import Badge from "../Badge";

import closeList from "../../assets/images/closeList.svg";

const List = ({ items, onClick, isRemoveble, onRemove, isActive }) => {
  const isRemove = (item) => {
    if (window.confirm("Удалить список?")) {
      onRemove(item);
    }
  };

  const [activeLi, setActiveLi] = React.useState(1);

  return (
    <ul onClick={onClick} className="todo__sidebar__list">
      {items.map((item, index) => (
        <li
          onClick={() => setActiveLi(item.id)}
          key={index}
          className={classNames(item.className, { active : item.id === activeLi})}
        >
          <span>
            {item.icon ? item.icon : <Badge color={item.color} />}
            <span>{item.name}</span>
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
