import React from "react";
import axios from "axios";

import List from "../List/List";
import Badge from "../Badge";

import "./AddButtonList.scss";

import close from "../../assets/images/closeButton.svg";

const AddList = ({ colors, onAddLi }) => {
  const [showPopup, setShowPopup] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState();
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsloading] = React.useState(false);

  React.useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setShowPopup(false);
    setSelectedColor(colors[0].id);
    setInputValue("");
  };

  const addList = () => {
    if (!inputValue) {
      alert("Введите название папки");
      return;
    }

    setIsloading(true);
    axios
      .post("/lists", { name: inputValue, colorId: selectedColor })
      .then(({ data }) => {
        console.log(data);
        const color = colors.filter((color) => color.id === selectedColor)[0]
          .name;
        const newList = { ...data, color: { name: color }, tasks: [] };
        onAddLi(newList);
        onClose();
        setIsloading(false);
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  return (
    <div className="add-list">
      <List
        onClick={() => setShowPopup(true)}
        items={[
          {
            className: "todo__sidebar__list__add-button",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="14px"
                viewBox="0 0 24 24"
                width="14px"
                fill="#7C7C7C"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            ),
            name: "Добавить папку",
          },
        ]}
        add={true}
      />

      {showPopup && (
        <div className="add-list__popup">
          <img
            className="add-list__popup--closeIcon"
            onClick={onClose}
            src={close}
            alt="CloseIcon"
          />
          <input
            className="field"
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
            type="text"
            placeholder="Название папки"
          />
          <div className="add-list__popup__colors">
            {colors.map((color) => (
              <Badge
                onClick={() => setSelectedColor(color.id)}
                key={color.id}
                color={color.name}
                className={selectedColor === color.id && "active"}
              />
            ))}
          </div>
          <button className="button" onClick={addList}>
            {isLoading ? "Добавление..." : "Добавить"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddList;
