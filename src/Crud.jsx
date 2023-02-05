import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

const Crud = () => {
  const [todos, setTodos] = useState();
  const [todoInput, setTodoInput] = useState();

  const getDatas = async () => {
    const data = await (await fetch("/todos")).json();
    setTodos(data);
  };

  const saveData = async () => {
    await fetch("/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todo: {
          title: todoInput.title,
          time: todoInput.time,
        },
      }),
    });
  };

  const handleAdd = useCallback(async () => {
    await saveData();
    getDatas();
  }, [todoInput, saveData]);

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <>
      <h1>
        Crud {todoInput?.title} = {todoInput?.time}
      </h1>
      Title:
      <input
        type="text"
        onChange={(e) => {
          setTodoInput({ ...todoInput, title: e.target.value });
        }}
      />
      <br />
      Title:
      <input
        type="time"
        onChange={(e) => {
          setTodoInput({ ...todoInput, time: e.target.value });
        }}
      />
      <br />
      {todos?.map((todo) => {
        return (
          <>
            <span key={todo.id}>
              {todo.title} - {todo.time}
            </span>
            <br />
          </>
        );
      })}
      <button onClick={handleAdd}>Add</button>
    </>
  );
};

export default Crud;
