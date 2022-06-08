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

  return (
    <>
      <div className="bg-slate-100 w-72 left-0 top-0 h-screen flex flex-col justify-between space-y-3 overflow-y-auto pt-4">
        <div className="px-2 overflow-auto">
          <div className="flex justify-between w-full mb-2">
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
            return (
              <div
                className={`cursor-pointer flex justify-between transition rounded-md  px-4 py-2 items-center hover:bg-slate-200 ${
                  note.id === highlighted ? "bg-slate-200" : ""
                }`}
              >
                <Link shallow href={`/note/${note.id}`} key={i}>
                  <div className={`w-full`}>
                    <p>{note.title}</p>
                  </div>
                </Link>
                <button
                  onClick={() => {
                    console.log("hi hihiihihi", note.id, note.title);
                    user?.getIdToken(true).then(async (idToken) => {
                      try {
                        const { data } = await api({
                          url: "/note/delete",
                          method: "POST",
                          headers: {
                            Authorization: idToken,
                          },
                          data: {
                            id: note.id,
                          },
                        });

                        console.log(data);

                        let dummy: any = notes;

                        dummy = dummy.filter(
                          (newNote: any) => newNote.id !== note.id
                        );

                        setNotes(dummy);
                        setState(dummy);
                        toast.success("Note deleted sucessfully");
                        router.push(
                          dummy.length > 0 ? `/note/${dummy[0].id}` : "/"
                        );
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
