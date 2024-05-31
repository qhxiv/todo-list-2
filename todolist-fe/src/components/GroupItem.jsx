import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function GroupItem({ id, name }) {
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    setClicked(false);
  }

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
        <p>{name}</p>

        <div
          className="group__actions"
          onClick={() => {
            setClicked(true);
          }}
        >
          <FontAwesomeIcon fixedWidth icon={faEllipsis} />
        </div>

        {clicked && <GroupOptions onClick={handleClick} />}
      </NavLink>
    </li>
  );
}

function GroupOptions({ onClick }) {
  return (
    <div className="group__options">
      <span onClick={onClick}></span>

      <ul>
        <li>Delete</li>
        <li>Rename</li>
      </ul>
    </div>
  );
}
