import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Group({ id, name }) {
  const [isAppearing, setIsAppearing] = useState(false);

  function handleClick() {
    setIsAppearing(false);
  }

  return (
    <li key={id} className="group btn">
      <p>{name}</p>
      <div className="group__actions" onClick={() => setIsAppearing(true)}>
        <FontAwesomeIcon fixedWidth icon={faEllipsis} />
      </div>
      {isAppearing && <GroupOptions onClick={handleClick} />}
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
