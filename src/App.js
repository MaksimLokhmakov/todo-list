import React from "react";
import { Route, useHistory } from "react-router";

// ? ИМПОРТ КОМПОНЕНТОВ
import { List, AddList, Tasks } from "./components";

// ? ИМПОРТ Data-Base
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3002";

// import DB from "./assets/db/db.json";

function App() {
  const [list, setList] = React.useState(null);
  const [tasks, setTasks] = React.useState(null);
  const [colors, setColors] = React.useState(null);
  const [activeHeader, setActiveHeader] = React.useState(true);
  let history = useHistory();

  React.useEffect(() => {
    axios.get("/lists?_expand=color&_embed=tasks").then(({ data }) => {
      setList(data);
    });
    axios.get("/colors").then(({ data }) => {
      setColors(data);
    });
  }, []);

  // React.useEffect(() => {
  //   const listId = history.location.pathname.split("/lists/")[1];
  //   let newTask;
  //   if (list) {
  //     newTask = list.filter((item) => item.id === Number(listId));
  //     console.log(newTask);
  //   }
  //   setTasks(newTask);
  // }, [history.location.pathname.split("/lists/")[1]]);
  // console.log(history.location.pathname.split("/lists/")[1]);

  const reductTitle = (titleId, title) => {
    const newList = list.map((item) => {
      if (item.id === titleId) {
        item.name = title;
      }
      return item;
    });
    setList(newList);
  };

  const onDeleteTask = (onDeleteTaskId, listId) => {
    const newList = list.map((item) => {
      if (item.id === listId) {
        item.tasks = item.tasks.filter((item) => item.id !== onDeleteTaskId);
      }
      return item;
    });
    setList(newList);
  };

  const onAddTask = (id, data) => {
    const newList = list.map((item) => {
      if (item.id === id) {
        item.tasks = [...item.tasks, data];
      }
      return item;
    });
    setList(newList);
  };

  const showTasks = (object) => {
    history.push(`/lists/${object.id}`);
    setTasks(object);
    {
      activeHeader && setActiveHeader(false);
    }
  };

  const addLi = (object) => {
    // console.log(object);
    const newList = [...list, object];
    setList(newList);
  };

  const removeLi = (object) => {
    const newList = list.filter((item) => item.id !== object);
    setList(newList);
    setTasks(list[list.length - 2]);
  };


  return (
    <div className="todo">
      <div className="todo__sidebar">
        {list && list.length !== 0 && (
          <List
            items={[
              {
                active: activeHeader,
                className: "todo__sidebar__list__header",
                icon: (
                  <svg
                    width="14"
                    height="12"
                    viewBox="0 0 14 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.96 5.10001H5.74001C5.24321 5.10001 5.20001 5.50231 5.20001 6.00001C5.20001 6.49771 5.24321 6.90001 5.74001 6.90001H10.96C11.4568 6.90001 11.5 6.49771 11.5 6.00001C11.5 5.50231 11.4568 5.10001 10.96 5.10001ZM12.76 9.60001H5.74001C5.24321 9.60001 5.20001 10.0023 5.20001 10.5C5.20001 10.9977 5.24321 11.4 5.74001 11.4H12.76C13.2568 11.4 13.3 10.9977 13.3 10.5C13.3 10.0023 13.2568 9.60001 12.76 9.60001ZM5.74001 2.40001H12.76C13.2568 2.40001 13.3 1.99771 13.3 1.50001C13.3 1.00231 13.2568 0.600006 12.76 0.600006H5.74001C5.24321 0.600006 5.20001 1.00231 5.20001 1.50001C5.20001 1.99771 5.24321 2.40001 5.74001 2.40001ZM2.86001 5.10001H1.24001C0.743212 5.10001 0.700012 5.50231 0.700012 6.00001C0.700012 6.49771 0.743212 6.90001 1.24001 6.90001H2.86001C3.35681 6.90001 3.40001 6.49771 3.40001 6.00001C3.40001 5.50231 3.35681 5.10001 2.86001 5.10001ZM2.86001 9.60001H1.24001C0.743212 9.60001 0.700012 10.0023 0.700012 10.5C0.700012 10.9977 0.743212 11.4 1.24001 11.4H2.86001C3.35681 11.4 3.40001 10.9977 3.40001 10.5C3.40001 10.0023 3.35681 9.60001 2.86001 9.60001ZM2.86001 0.600006H1.24001C0.743212 0.600006 0.700012 1.00231 0.700012 1.50001C0.700012 1.99771 0.743212 2.40001 1.24001 2.40001H2.86001C3.35681 2.40001 3.40001 1.99771 3.40001 1.50001C3.40001 1.00231 3.35681 0.600006 2.86001 0.600006Z"
                      fill="#7C7C7C"
                    />
                  </svg>
                ),
                name: "Все задачи",
              },
            ]}
            className="active"
            onShowTasks={() => {
              history.push(`/`);
              setActiveHeader(true);
            }}
          />
        )}
        {list && (
          <List
            items={list}
            className="active"
            isRemoveble={true}
            onRemove={removeLi}
            onShowTasks={showTasks}
            tasks={tasks}
            activeHeader={activeHeader}
          />
        )}
        {colors && <AddList onAddLi={addLi} colors={colors} />}
      </div>
      <div className="todo__tasks">
        <Route exact path="/">
          {list &&
            list.map((task) => (
              <Tasks
                key={task.id}
                onDeleteTask={onDeleteTask}
                onAddTask={onAddTask}
                onReductTitle={reductTitle}
                list={task}
              />
            ))}
        </Route>
        <Route exact path="/lists/:id">
          {list && tasks && (
            <Tasks
              onDeleteTask={onDeleteTask}
              onAddTask={onAddTask}
              onReductTitle={reductTitle}
              list={tasks}
            />
          )}
        </Route>
      </div>
    </div>
  );
}

export default App;
