import { useLoaderData, useRevalidator } from "react-router-dom";
import { getGroup } from "../api/groupApi";
import { createTodo, getTodosOfAGroup } from "../api/todoApi";
import Todo from "../components/Todo";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";

export async function loader({ params }) {
  const group = await getGroup(params.groupId);
  const todos = await getTodosOfAGroup(params.groupId);
  group.todos = todos;
  return group;
}

export default function Group() {
  const group = useLoaderData();
  const [isAdding, setIsAdding] = useState(false);
  const nameRef = useRef(null);
  const descRef = useRef(null);
  let revalidator = useRevalidator();

  return (
    <div className="groupPage">
      <div className="groupPage__topbar">
        <h1 className="groupPage__title">{group.name}</h1>

        <button className="groupPage__actions btn">
          <FontAwesomeIcon fixedWidth icon={faEllipsis} />
        </button>
      </div>

      <div className="groupPage__body">
        <ul className="groupPage__list">
          {group.todos.map((todo) => (
            <Todo
              key={todo.id}
              groupId={todo.groupId}
              id={todo.id}
              name={todo.name}
              description={todo.description}
              done={todo.done}
            />
          ))}

          {!isAdding ? (
            <>
              <button
                onClick={() => {
                  setIsAdding(true);
                }}
                className="add-todo"
              >
                <FontAwesomeIcon fixedWidth icon={faPlus} />
                <span>Add todo</span>
              </button>
            </>
          ) : (
            <div className="todo">
              <div className="todo__edit">
                <input
                  required
                  ref={nameRef}
                  placeholder="Todo name"
                  autoFocus
                  type="text"
                  className="todo__name"
                />
                <input
                  required
                  ref={descRef}
                  placeholder="Description"
                  type="text"
                  className="todo__desc"
                />

                <div className="todo__controls">
                  <button
                    onClick={async () => {
                      const newTodo = {
                        name: nameRef.current.value,
                        description: descRef.current.value,
                      };

                      if (!newTodo.name)
                        alert("Please fill out the name input");
                      else {
                        await createTodo(group.id, newTodo);
                        setIsAdding(false);
                        revalidator.revalidate();
                      }
                    }}
                    className="todo__save"
                  >
                    Add todo
                  </button>

                  <button
                    onClick={() => setIsAdding(false)}
                    className="todo__cancel"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}
