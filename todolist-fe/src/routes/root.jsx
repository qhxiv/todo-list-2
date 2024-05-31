import { useState } from "react";
import { getGroups } from "../api/groupApi";
import { Outlet, useLoaderData } from "react-router-dom";
import Header from "../components/Header";
import GroupItem from "../components/GroupItem";

export async function loader() {
  const groups = await getGroups();
  return groups;
}

export default function Root() {
  const [isAdding, setIsAdding] = useState(false);
  const groups = useLoaderData();

  return (
    <>
      <div className="sidebar">
        <Header />

        <nav className="sidebar__list">
          {groups.length ? (
            <ul>
              {groups.map((group) => (
                <GroupItem key={group.id} id={group.id} name={group.name} />
              ))}
            </ul>
          ) : (
            <p>
              <i>No group</i>
            </p>
          )}
        </nav>
      </div>

      <div className="detail">
        <Outlet />
      </div>
    </>
  );
}
