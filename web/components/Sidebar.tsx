import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { api } from "../util/api";
import { auth } from "../util/initFirebase";
import { HiPlus } from "react-icons/hi";
import { CreateNoteModal } from "./CreateNoteModal";
import { createState } from "niue";

interface Notes {
  id: string;
  title: string;
  body: string;
  userUid: string;
}

export const [useStore, setState] = createState([]);

export const Sidebar = ({
  highlighted,
}: {
  highlighted?: string | undefined;
}) => {
  const [user, error, loading] = useAuthState(auth);
  const [notes, setNotes] = useState<Notes[]>([]);

  const [open, setOpen] = useState(false);

  const notesNiue = useStore(null);

  const toggleModal = () => {
    setOpen(!open);
  };
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
      setState(data.notes);

      // setNotes(data.notes);
    });
  }, [user]);

  return (
    <>
      <CreateNoteModal parentOpen={open} toggleModal={toggleModal} />
      <div className="bg-slate-100 w-72 sticky left-0 top-0 h-screen flex flex-col justify-between space-y-3 overflow-y-auto pt-4">
        <div className="px-2">
          <div className="flex justify-between w-full mb-2">
            <p className="text-base font-bold">Your notes</p>
            <button
              onClick={() => {
                setOpen(!open);
              }}
            >
              <div className="p-1 rounded-md hover:bg-slate-300 transition cursor-pointer">
                <HiPlus size={18} />
              </div>
            </button>
          </div>
          {notesNiue.map((note: Notes, i) => {
            return (
              <a href={`/note/${note.id}`} key={i}>
                <div
                  className={`rounded-md hover:bg-slate-200 transition text-left px-4 py-2 ${
                    note.id === highlighted ? "bg-slate-200" : ""
                  }`}
                >
                  <p>{note.title}</p>
                </div>
              </a>
            );
          })}
        </div>
        <div className="p-4 bg-slate-200 rounded-t-xl flex items-center space-x-4">
          <img
            src={user?.photoURL || ""}
            alt="user"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-semibold">{user?.displayName}</p>
            <small className="text-xs text-gray-600">{user?.email}</small>
          </div>
        </div>
      </div>
    </>
  );
};
