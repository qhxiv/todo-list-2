import {
  faCircle,
  faCircleCheck as hoverIcon,
} from "@fortawesome/free-regular-svg-icons";
import {
  faEllipsis,
  faCircleCheck as doneIcon,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { deleteTodo, updateTodo } from "../api/todoApi";
import { useRevalidator } from "react-router-dom";

export default function Todo({ id, groupId, name, description, done }) {
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isEditting, setIsEditting] = useState(false);
  const nameRef = useRef(null);
  const descRef = useRef(null);

  let revalidator = useRevalidator();

  return (
    <li key={id} className="todo">
      {!isEditting ? (
        <>
          <button
            onClick={async () => {
              const updatedTodo = { groupId, name, description, done: !done };
              await updateTodo(groupId, id, updatedTodo);
              revalidator.revalidate();
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="todo__check"
          >
            <FontAwesomeIcon
              fixedWidth
              icon={done ? doneIcon : isHovered ? hoverIcon : faCircle}
            />
          </button>

          <div className="todo__body">
            <p>{name}</p>
            <span>{description}</span>
          </div>

          <button
            onClick={() => setClicked(true)}
            className="todo__actions btn"
          >
            <FontAwesomeIcon fixedWidth icon={faEllipsis} />
          </button>

          {clicked && (
            <div className="todo__options">
              <span onClick={() => setClicked(false)}></span>

              <ul>
                <button
                  onClick={() => {
                    setIsEditting(true);
                    setClicked(false);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={async () => {
                    await deleteTodo(id);
                    revalidator.revalidate();
                  }}
                >
                  Delete
                </button>
              </ul>
            </div>
          )}
        </>
      ) : (
        <div className="todo__edit">
          <input
            ref={nameRef}
            placeholder="Todo name"
            autoFocus
            defaultValue={name}
            type="text"
            className="todo__name"
          />
          <input
            ref={descRef}
            placeholder="Description"
            defaultValue={description}
            type="text"
            className="todo__desc"
          />

          <div className="todo__controls">
            <button
              onClick={async () => {
                const updatedTodo = {
                  groupId,
                  name: nameRef.current.value,
                  description: descRef.current.value,
                  done,
                };

                await updateTodo(groupId, id, updatedTodo);
                revalidator.revalidate();
                setIsEditting(false);
              }}
              className="todo__save"
            >
              Save
            </button>

            <button
              onClick={() => setIsEditting(false)}
              className="todo__cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
