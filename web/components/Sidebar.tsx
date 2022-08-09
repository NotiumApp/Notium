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
import { VscTriangleRight } from "react-icons/vsc";
import {Resizable} from 're-resizable';
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
  const [sidebarWidth, setSidebarWidth] = useState<number>(null)
  const notesNiue = useStore(null);
  const router = useRouter();



  useEffect(() => {
    if(localStorage.getItem("sidebarWidth")){
      setSidebarWidth(parseInt(localStorage.getItem("sidebarWidth")))
    }else{
      setSidebarWidth(300)
      
    }

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

  const NoteDiv = ({ passedNote, child, level }) => {
    const [noteExpanded, setNoteExpanded] = useState<boolean>(false);

    const newLevel = level;

    useEffect(() => {
      if (
        localStorage.getItem("expanded") &&
        JSON.parse(localStorage.getItem("expanded")).indexOf(passedNote.id) > -1
      ) {
        setNoteExpanded(true);
      }
    }, []);

    return (
      <div className="w-full">
        <div
          className={`w-full cursor-pointer flex justify-between transition px-4 py-1 items-center hover:bg-slate-200 ${
            passedNote.id === highlighted ? "bg-slate-200" : ""
          } ${child ? "" : ""}`}
          //pl-10
          style={{ paddingLeft: `${level + 1}rem` }}
        >
          <button
            onClick={() => {
              setNoteExpanded(!noteExpanded);

              if (
                localStorage.getItem("expanded") &&
                JSON.parse(localStorage.getItem("expanded")).indexOf(
                  passedNote.id
                ) > -1
              ) {
                const dummy = (
                  JSON.parse(localStorage.getItem("expanded")) || []
                ).filter((noteInLocal) => noteInLocal !== passedNote.id);
                localStorage.setItem("expanded", JSON.stringify(dummy));
              } else {
                let dummy = JSON.parse(localStorage.getItem("expanded")) || [];
                dummy.push(passedNote.id);
                localStorage.setItem("expanded", JSON.stringify(dummy));
              }
            }}
            className={`hover:bg-slate-300 rounded transition ease-in-out mr-2 p-[2px] ${
              passedNote.children.length > 0 ? "" : ""
            }`}
          >
            <VscTriangleRight
              className={`transition duration-150  ease-in-out ${
                noteExpanded ? "rotate-90" : ""
              }`}
              size={12}
            />
          </button>

          <Link shallow href={`/note/${passedNote.id}`} key={passedNote.id}>
            <div className={`w-full`}>
              <p className="text-sm">{passedNote.title}</p>
            </div>
          </Link>
          <div className="flex">
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

                    if (
                      localStorage.getItem("expanded") &&
                      JSON.parse(localStorage.getItem("expanded")).indexOf(
                        passedNote.id
                      ) > -1
                    ) {
                      const dummy = JSON.parse(
                        localStorage.getItem("expanded")
                      ).filter((noteInLocal) => noteInLocal !== passedNote.id);
                      localStorage.setItem("expanded", JSON.stringify(dummy));
                    }
                    // console.log(data);
                    // let dummy: any = notes;
                    // dummy = dummy.filter(
                    //   (newNote: any) => newNote.id !== passedNote.id
                    // );
                    setNotes(data.notes);
                    setState(data.notes);
                    toast.success("Note deleted sucessfully");
                    router.push(
                      data.notes.length > 0 ? `/note/${data.notes[0].id}` : "/"
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

            <button
              onClick={() => {
                user?.getIdToken(true).then(async (idToken) => {
                  try {
                    const createdNote = await api({
                      url: "/note/create/",
                      method: "POST",
                      headers: {
                        Authorization: idToken,
                      },
                      data: {
                        parentId: passedNote.id,
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
              <p className=" hover:bg-slate-300 transition duration-150 ease-in-out p-1 rounded-md">
                <HiPlus size={17} />
              </p>
            </button>
          </div>
        </div>
        <div className="">
          {noteExpanded &&
            passedNote.children.map((childNote) => {
              return (
                <NoteDiv
                  passedNote={childNote}
                  child={true}
                  level={newLevel + 1}
                />
              );
            })}
        </div>
      </div>
    );
  };


  return (

    sidebarWidth !== null ? 
    <Resizable enable={{right:true}} style={{position:"fixed", left:0, top:0}} onResizeStop={(e, direction, ref, d) => {
      localStorage.setItem("sidebarWidth", (sidebarWidth+d.width).toString())
      console.log("changed!", localStorage.getItem("sidebarWidth"))
      
    }}  defaultSize={{width:`${sidebarWidth}px`, height:"500px"}} maxWidth="400px" minWidth={"250px"}>
      

      <div className="w-auto bg-slate-100 h-screen flex flex-col justify-between space-y-3 overflow-y-auto pt-4">
        <div className="px-0 overflow-auto">
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
            return <NoteDiv passedNote={note} child={false} level={0} />;
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
    </Resizable>
   : <></>);
};
