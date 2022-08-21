import { NextPage } from "next";
import { api } from "../../util/api";
import { auth } from "../../util/initFirebase";
import { setState, useStore, Sidebar } from "../../components/Sidebar";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import io, { Socket } from "socket.io-client";
import piston from "piston-client";

import { UnControlled as CodeMirror2 } from "react-codemirror2";

import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { githubLight } from "@uiw/codemirror-theme-github";

import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/neo.css";
import { stderr } from "process";
import { HiPlay } from "react-icons/hi";
import Select from "react-select/";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Spinner } from "../../components/Spinner";
import { recursivelyEdit } from "../../util/recursiveEdit";

// if (typeof navigator !== "undefined") {
//   require("codemirror/mode/javascript/javascript");
//   require("codemirror/mode/markdown/markdown");
// }

interface NotePageProps {
  // notes: any;
  noteid: string;
}

type View = "markdown" | "rendered" | "both";
const NotePage: NextPage<NotePageProps> = ({ noteid }) => {
  const [notes, setNotesMetaData] = useState<any>({});
  const [notesTitle, setNotesTitle] = useState<any>("");
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [body, setBody] = useState(
    "Start typing here with Markdown! Click the title of the note to edit it."
  );

  const [view, setView] = useState<View>("both");
  // react codemirror 2 does some weird stuff hence why we use this (sidenote: this hurts to use)
  const [initialBody, setInitialBody] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const notesNiue = useStore(null);

  useEffect(() => {
    const localView: View = (localStorage.getItem("view") as View) || "both";
    setView(localView);

    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });

    user?.getIdToken(true).then(async (idToken) => {
      console.log(router.query.noteid, "eeee");
      const newSocket = io(
        process.env.NEXT_PUBLIC_SOCKET_API_URL || "http://localhost:5000",
        {
          auth: {
            authToken: idToken,
          },
          query: {
            noteId: noteid,
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
  }, [user, router]);

  return (
    <div className="flex">
      <Sidebar highlighted={router.query.noteid?.toString()} />
      <div className="h-[90vh] w-full px-4">
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

              for (const note of dummy) {
                recursivelyEdit(
                  note,
                  notes.id,
                  e.target.value.length > 0 ? e.target.value : "New Note"
                );
              }
            }}
          />
        </div>

        <select
          onChange={(e) => {
            setView(e.target.value as View);
            localStorage.setItem("view", e.target.value);
          }}
          className="rounded-md bg-white text-black font-sans p-1 font-medium text-xs border border-black ml-4"
          value={view}
        >
          <option value={"markdown"}>Markdown</option>
          <option value="rendered">Rendered</option>
          <option value={"both"}>Both</option>
        </select>
        <div className="w-full flex overflow-y-auto">
          {/* <CodeMirror2
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
            // className={`overflow-y-auto h-full  pt-4  ${
            //   view === "markdown" || view === "both" ? "" : "hidden"
            // } ${view === "markdown" ? "w-3/4 mx-auto h-full" : "w-1/2"} ${
            //   view === "both" ? "max-w-3xl" : ""
            // }
            className={`overflow-y-auto h-full  pt-4
            `}
          /> */}

          {/* <CodeMirror
            onChange={useCallback((value, viewUpdate) => {
              console.log("value:", value);

              setBody(value);
              socket?.emit("update", value);
              console.log(socket);
            }, [])}
            value={body}
            theme={githubLight}
            basicSetup={{
              highlightActiveLine: false,
              highlightActiveLineGutter: false,
              syntaxHighlighting: true,
              autocompletion: true,
            }}
            height="500px"
            extensions={[
              markdown({ base: markdownLanguage, codeLanguages: languages }),
            ]}
            className={`text-[1rem] overflow-y-auto   pt-4  ${
              view === "markdown" || view === "both" ? "" : "hidden"
            } ${view === "markdown" ? "w-3/4 mx-auto h-full" : "w-1/2"} ${
              view === "both" ? "max-w-3xl" : ""
            }
            `}
          /> */}

          <Editor
            height="80vh"
            defaultLanguage="markdown"
            className={`pt-4 ${view === "rendered" && "hidden w-0"}`}
            width={
              view === "rendered"
                ? "0vw"
                : view === "markdown"
                ? "100%"
                : "44vw"
            }
            value={body}
            onChange={(value) => {
              setBody(value);
              socket?.emit("update", value);
            }}
          />

          {/* */}

          <ReactMarkdown
            className={`h-[80vh] p-4 overflow-y-auto break-words prose prose-h1:text-[28px] prose-h2:text-[24px] prose-h3:text-[20px] prose-h4:text-[16px] prose-p:text-[16px] prose-headings:font-bold  w-1/2 ${
              view === "rendered" || view === "both" ? "" : "hidden"
            } ${view === "rendered" ? "w-full mx-auto mt-4" : "w-1/2"}`}
            remarkPlugins={[remarkGfm]}
            children={
              body
              //  ||
              // "Start typing here with Markdown! Click the title of the note to edit it."
            }
            components={{
              code({ node, inline, className, children, ...props }) {
                interface outputInterface {
                  type: "error" | "success";
                  stdout: string;
                  stderr?: string;
                }
                interface Runtime {
                  language: string;
                  version: string;
                  aliases: string[];
                  runtime?: string;
                }

                const client = piston({});
                const [output, setOutput] = useState<outputInterface>();
                const [runtimes, setRunTimes] = useState<any[]>([]);
                const [selectedLanguage, setSelectedLanguage] =
                  useState("auto-detect");

                const [loading, setLoading] = useState(false);

                useEffect(() => {
                  (async () => {
                    const clientRuntimes: Runtime[] = await client.runtimes();
                    console.log(clientRuntimes);
                    setRunTimes(
                      clientRuntimes.map((language) => {
                        let label = language.runtime
                          ? `${language.language} on ${language.runtime}`
                          : language.language;
                        return {
                          label: label,
                          value: language.aliases[0] || language.language,
                        };
                      })
                    );
                  })();
                }, []);

                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <div className="w-auto overflow-auto">
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, "")}
                      style={dracula}
                      language={match[1]}
                      PreTag="pre"
                      {...props}
                    />

                    <div className="items-center flex space-x-4">
                      <button
                        onClick={async () => {
                          // [{ language: 'python', version: '3.9.4', aliases: ['py'] }, ...]
                          setLoading(true);
                          console.log(runtimes, match);

                          const result = await client.execute(
                            selectedLanguage === "auto-detect"
                              ? match[1]
                              : selectedLanguage,
                            String(children).replace(/\n$/, ""),
                            { version: "*" }
                          );
                          console.log(result);

                          if (result) {
                            setLoading(false);
                          }

                          // if (result.compile.stderr) {
                          if (result.compile && result.compile.stderr) {
                            setOutput({
                              type: "error",
                              stdout: result.compile.stdout,
                              stderr: result.compile.stderr,
                            });
                          } else if (result.run.stderr) {
                            setOutput({
                              type: "error",
                              stdout: result.run.stdout,
                              stderr: result.run.stderr,
                            });
                          } else {
                            setOutput({
                              type: "success",
                              stdout: result.run.stdout,
                            });
                          }
                        }}
                      >
                        {loading ? <Spinner /> : <HiPlay size={35} />}
                      </button>
                      <select
                        onChange={(e) => {
                          setSelectedLanguage(e.target.value);
                        }}
                        className="rounded-md bg-white text-black font-sans p-1 font-medium text-xs w-full"
                      >
                        <option value="auto-detect">Auto Detect</option>
                        {runtimes.map((runtime) => {
                          return (
                            <option value={runtime.value}>
                              {runtime.label}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    {output && (
                      <div className="w-auto overflow-auto">
                        <p className="text-white">{output.stdout}</p>
                        <p className="text-red-500">
                          {output.type === "error" ? output.stderr : ""}
                        </p>
                      </div>
                    )}
                  </div>
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

NotePage.getInitialProps = (ctx) => {
  const { noteid } = ctx.query;
  const returnData: NotePageProps = {
    noteid: noteid.toString(),
  };
  return returnData;
};

export default NotePage;
