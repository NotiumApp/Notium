import { NextPage } from "next";
import { api } from "../../util/api";
import { auth } from "../../util/initFirebase";
import { setState, useStore, Sidebar } from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import io, { Socket } from "socket.io-client";
import piston from "piston-client";

import { UnControlled as CodeMirror } from "react-codemirror2";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/neo.css";

if (typeof navigator !== "undefined") {
  require("codemirror/mode/javascript/javascript");
  require("codemirror/mode/markdown/markdown");
}

interface NotePageProps {
  notes: any;
}

const NotePage: NextPage<NotePageProps> = () => {
  const [notes, setNotesMetaData] = useState<any>({});
  const [notesTitle, setNotesTitle] = useState<any>("");
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [body, setBody] = useState(
    "Start typing here with Markdown! Click the title of the note to edit it."
  );

  // react codemirror 2 does some weird stuff hence why we use this (sidenote: this hurts to use)
  const [initialBody, setInitialBody] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const notesNiue = useStore(null);

  useEffect(() => {
    (async () => {
      user?.getIdToken(true).then(async (idToken) => {
        const newSocket = io(
          process.env.NEXT_SOCKET_PUBLIC_API_URL || "http://localhost:5000",
          {
            auth: {
              authToken: idToken,
            },
            query: {
              noteId: router.query.noteid,
            },
          }
        );

        setSocket(newSocket);

        const { data } = await api({
          url: "/note/read/",
          method: "POST",
          data: {
            noteId: router.query.noteid,
          },
          headers: {
            Authorization: idToken,
          },
        });

        console.log(data.note);

        setNotesMetaData(data.note);
        setNotesTitle(data.note.title);
        setBody(data.note.body);
        setInitialBody(data.note.body);
        console.log("IM HERE INNIT", initialBody);
      });
    })();
  }, [user, router]);

  return (
    <div className="flex">
      <Sidebar highlighted={router.query.noteid?.toString()} />
      <div className="px-8 h-[90vh] w-full">
        <div className="py-4">
          <input
            value={notesTitle}
            className="outline-none text-3xl font-semibold hover:bg-slate-100 px-4 rounded-lg py-2 transition duration-150 ease-in-out"
            autoCorrect="none"
            autoCapitalize="none"
            autoComplete="none"
            onChange={(e) => {
              socket?.emit(
                "updateTitle",
                e.target.value.length > 0 ? e.target.value : "New Note"
              );
              setNotesTitle(
                e.target.value.length > 0 ? e.target.value : "New Note"
              );

              let dummy = notesNiue;

              for (const note in dummy) {
                if (dummy[note].id === notes.id) {
                  dummy[note].title =
                    e.target.value.length > 0 ? e.target.value : "New Note";
                }
              }
            }}
          />
        </div>
        <div className="w-full flex">
          <CodeMirror
            value={initialBody}
            options={{
              mode: "markdown",
              theme: "neo",
              lineNumbers: true,
            }}
            onChange={(editor, data, value) => {
              console.log(value);
              setBody(value);
              socket?.emit("update", value);
            }}
            className="h-full resize-none p-4 w-1/2  "
          />

          <ReactMarkdown
            className="h-full p-4 overflow-y-auto prose w-1/2"
            remarkPlugins={[remarkGfm]}
            children={
              body
              //  ||
              // "Start typing here with Markdown! Click the title of the note to edit it."
            }
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <>
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, "")}
                      style={dracula}
                      language={match[1]}
                      PreTag="pre"
                      {...props}
                    />
                    <button
                      onClick={async () => {
                        const client = piston({});

                        const runtimes = await client.runtimes();
                        // [{ language: 'python', version: '3.9.4', aliases: ['py'] }, ...]
                        console.log(runtimes, match);

                        const result = await client.execute(
                          match[1],
                          String(children).replace(/\n$/, ""),
                          { version: "*" }
                        );
                        console.log(result);
                        // { language: 'python', version: '3.9.4', run: {
                        //     stdout: 'Hello World!\n',
                        //     stderr: '',
                        //     code: 0,
                        //     signal: null,
                        //     output: 'Hello World!\n'
                        // }}
                      }}
                    >
                      Run
                    </button>
                  </>
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
    </div>
  );
};

export default NotePage;
