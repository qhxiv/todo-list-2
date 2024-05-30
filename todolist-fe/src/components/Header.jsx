import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Form } from "react-router-dom";

export default function Header() {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <header className="sidebar__header">
      {isAdding ? (
        <>
          <Form method="post">
            <input name="name" required type="text" placeholder="Group name" />
            <button type="submit" className="btn">
              <FontAwesomeIcon fixedWidth icon={faCheck} />
            </button>
          </Form>
        </>
      ) : (
        <>
          <h1>Groups</h1>
          <button onClick={() => setIsAdding(true)} className="btn">
            <FontAwesomeIcon fixedWidth icon={faPlus} />
          </button>
        </>
      )}
    </header>
  );
}
