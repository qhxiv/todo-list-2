import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { NavLink, useNavigate, useRevalidator } from "react-router-dom";
import { deleteGroup, renameGroup } from "../api/groupApi";

export default function GroupItem({ id, name }) {
  const [clicked, setClicked] = useState(false);
  const [isEditting, setIsEditting] = useState(false);
  const inputRef = useRef(null);

  let revalidator = useRevalidator();
  let navigate = useNavigate();

  async function handleEdit() {
    const newGroup = { name: inputRef.current.value };
    await renameGroup(id, newGroup);
    revalidator.revalidate();
    setIsEditting(false);
  }

  if (!!inputRef.current)
    inputRef.current.addEventListener("keydown", (e) => {
      if (e.code === "Enter") handleEdit();
    });

  return (
    <li key={id} className="group btn">
      <NavLink
        className={
          "group__link " +
          (({ isActive, isPending }) =>
            isActive ? "active" : isPending ? "pending" : "")
        }
        to={`/groups/${id}`}
      >
        {!isEditting ? (
          <>
            <p>{name}</p>

            <div
              className="group__actions"
              onClick={() => {
                setClicked(true);
              }}
            >
              <FontAwesomeIcon fixedWidth icon={faEllipsis} />
            </div>
          </>
        ) : (
          <>
            <input
              autoFocus
              className="group__input"
              placeholder="Group name"
              defaultValue={name}
              ref={inputRef}
            />

            <button onClick={handleEdit} type="button">
              <FontAwesomeIcon fixedWidth icon={faCheck} />
            </button>

            <button onClick={() => setIsEditting(false)} type="button">
              <FontAwesomeIcon fixedWidth icon={faXmark} />
            </button>
          </>
        )}

        {clicked && (
          <div className="group__options">
            <span onClick={() => setClicked(false)}></span>

            <ul>
              <button
                onClick={() => {
                  setIsEditting(true);
                  setClicked(false);
                }}
                type="button"
              >
                Rename
              </button>

              <button
                onClick={async () => {
                  await deleteGroup(id);
                  revalidator.revalidate();
                  navigate("/");
                }}
                type="button"
              >
                Delete
              </button>
            </ul>
          </div>
        )}
      </NavLink>
    </li>
  );
}
