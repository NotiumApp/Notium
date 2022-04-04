import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { api } from "../util/api";
import { auth } from "../util/initFirebase";

interface Notes {
  id: string;
  title: string;
  body: string;
  userUid: string;
}

export const Sidebar = () => {
  const [user, error, loading] = useAuthState(auth);
  const [notes, setNotes] = useState<Notes[]>([]);

  useEffect(() => {
    user?.getIdToken(true).then(async (idToken) => {
      const { data } = await api({
        url: "/note/read/all",
        method: "GET",
        data: {
          authToken: idToken,
        },
      });

      console.log(data.notes);

      setNotes(data.notes);
    });
  }, [user]);

  return (
    <div className="w-20 fixed left-0 top-0 h-screen flex flex-col space-y-4 overflow-y-auto py-4">
      {notes.map((note, i) => {
        return (
          <a href={`/note/${note.id}`} key={i}>
            <div
              key={i}
              className="rounded-full bg-orange-500 text-white uppercase text-xl w-12 flex justify-center items-center h-12 mx-auto"
            >
              {note.title[0]}
            </div>
          </a>
        );
      })}
    </div>
  );
};
