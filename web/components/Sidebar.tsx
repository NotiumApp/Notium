import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { api } from "../util/api";
import { auth } from "../util/initFirebase";
import { HiPlus } from "react-icons/hi";
import { createState } from "niue";
import Link from "next/link";
import { useRouter } from "next/router";
import { HiX } from "react-icons/hi";
import toast from "react-hot-toast";

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
  const router = useRouter();

  useEffect(() => {
    user?.getIdToken(true).then(async (idToken) => {
      const { data } = await api({
        url: "/note/read/all",
        method: "POST",
        data: {
          authToken: idToken,
        },
        headers: {
          Authorization: idToken,
        },
      });

      console.log(data);
      setState(data.notes);

      setNotes(data.notes);
    });
  }, [user]);

  const NoteDiv = ({ passedNote, child }) => {
    return (
      <div className="w-full space-y-1">
        <div
          className={`w-full cursor-pointer flex justify-between transition px-4 py-2 items-center hover:bg-slate-200 ${
            passedNote.id === highlighted ? "bg-slate-200" : ""
          } ${child ? "pl-10" : ""}`}
        >
          <Link shallow href={`/note/${passedNote.id}`} key={passedNote.id}>
            <div className={`w-full`}>
              <p>{passedNote.title}</p>
            </div>
          </Link>
          <button
            onClick={() => {
              user?.getIdToken(true).then(async (idToken) => {
                try {
                  const { data } = await api({
                    url: "/note/delete",
                    method: "POST",
                    headers: {
                      Authorization: idToken,
                    },
                    data: {
                      id: passedNote.id,
                    },
                  });

                  console.log(data);

                  let dummy: any = notes;

                  dummy = dummy.filter(
                    (newNote: any) => newNote.id !== passedNote.id
                  );

                  setNotes(dummy);
                  setState(dummy);
                  toast.success("Note deleted sucessfully");
                  router.push(dummy.length > 0 ? `/note/${dummy[0].id}` : "/");
                } catch (err) {
                  toast.error("Hmm, something went wrong");
                }
              });
            }}
          >
            <p className="hover:text-gray-500 transition duration-150 ease-in-out p-1 rounded-md">
              <HiX size={17} />
            </p>
          </button>
        </div>
        <div className="">
          {passedNote.children.map((childNote) => {
            return <NoteDiv passedNote={childNote} child={true} />;
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-slate-100 fixed z-40 w-72 left-0 top-0 h-screen flex flex-col justify-between space-y-3 overflow-y-auto pt-4">
        <div className="px-0 overflow-auto space-y-1">
          <div className="flex justify-between mx-2 mb-2">
            <p className="text-base font-bold">Your notes</p>
            <button
              onClick={() => {
                // setOpen(!open);
                user?.getIdToken(true).then(async (idToken) => {
                  try {
                    const createdNote = await api({
                      url: "/note/create/",
                      method: "POST",
                      headers: {
                        Authorization: idToken,
                      },
                    });

                    const { data } = await api({
                      url: "/note/read/all",
                      method: "POST",
                      data: {
                        authToken: idToken,
                      },
                      headers: {
                        Authorization: idToken,
                      },
                    });

                    setState(data.notes);

                    setNotes(data.notes);
                    router.push(`/note/${createdNote.data.note.id}`);
                  } catch (err) {
                    console.log("err", err);
                  }
                });
              }}
            >
              <div className="p-1 rounded-md hover:bg-slate-300 transition cursor-pointer">
                <HiPlus size={18} />
              </div>
            </button>
          </div>
          {notes.map((note: Notes, i) => {
            return <NoteDiv passedNote={note} />;
          })}
        </div>
        <a href="/settings">
          <div className="p-4 bg-slate-200 rounded-t-xl flex items-center space-x-4">
            <img
              src={
                (user && user?.photoURL) ||
                `https://avatars.dicebear.com/api/bottts/${
                  (user && user.displayName) || "user"
                }.svg`
              }
              alt="user"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold">{user?.displayName}</p>
              <small className="text-xs text-gray-600">{user?.email}</small>
            </div>
          </div>
        </a>
      </div>
    </>
  );
};
