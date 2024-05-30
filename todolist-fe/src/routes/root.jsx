import { getGroups } from "../api/groupApi";
import { useLoaderData } from "react-router-dom";
import Group from "../components/Group";
import Header from "../components/Header";

export async function loader() {
  const groups = getGroups();
  return groups;
}

export async function action() {}

export default function Root() {
  const groups = useLoaderData();

  return (
    <>
      <div className="sidebar">
        <Header />

        <nav>
          {groups.length ? (
            <ul>
              {groups.map((group) => (
                <Group key={group.id} id={group.id} name={group.name} />
              ))}
            </ul>
          ) : (
            <p>
              <i>No group</i>
            </p>
          )}
        </nav>
      </div>

      <div className="detail"></div>
    </>
  );
}
