import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Form, redirect } from "react-router-dom";
import { createGroup } from "../api/groupApi";

export async function action({ request }) {
  const formData = await request.formData();
  const newGroup = Object.fromEntries(formData);
  const res = await createGroup(newGroup);
  return redirect(`/groups/${res.id}`);
}

export default function Header() {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <header className="sidebar__header">
      {isAdding ? (
        <>
          <Form
            onSubmit={() => setIsAdding(false)}
            className="sidebar__form"
            method="post"
          >
            <input name="name" required type="text" placeholder="Group name" />

            <button type="submit" className="btn">
              <FontAwesomeIcon fixedWidth icon={faCheck} />
            </button>

            <button
              onClick={() => setIsAdding(false)}
              type="button"
              className="btn"
            >
              <FontAwesomeIcon fixedWidth icon={faXmark} />
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
