import { NextPage } from "next";
import { api } from "../../util/api";
import { auth } from "../../util/initFirebase";
import { Sidebar } from "../../components/Sidebar";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface NotePageProps {
  notes: any;
}

const NotePage: NextPage<NotePageProps> = () => {
  const [notes, setNotesMetaData] = useState<any>({});
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [body, setBody] = useState("");

  useEffect(() => {
    user?.getIdToken(true).then(async (idToken) => {
      const { data } = await api({
        url: "/note/read/",
        method: "POST",
        data: {
          authToken: idToken,
          noteId: router.query.noteid,
        },
      });

      console.log(data, router.query.noteid);

      setNotesMetaData(data.note);
      setBody(data.note.body);
    });
  }, [user, router]);

  return (
    <>
      <Sidebar />
      <div className="ml-20 min-h-screen">
        <h1>{notes.title}</h1>
        <button
          className="px-4 py-2 rounded-lg bg-accent text-white"
          onClick={() => {
            user?.getIdToken(true).then(async (idToken) => {
              const { data } = await api({
                url: "/note/update/",
                method: "PUT",
                data: {
                  authToken: idToken,
                  noteId: router.query.noteid,
                  body: body,
                },
              });
            });
          }}
        >
          Update
        </button>
        <div className="flex space-x-4 h-full">
          <textarea
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
            }}
            className="border border-accent-primary outline-0 min-h-screen resize-none p-4 w-1/2"
          />
          <ReactMarkdown
            className="h-full p-4 overflow-y-auto w-1/2"
            remarkPlugins={[remarkGfm]}
            children={body}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, "")}
                    // style={dark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default NotePage;
