import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Sidebar } from "../components/Sidebar";
import { auth } from "../util/initFirebase";

const Home: NextPage = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  useEffect(() => {
    // user
    //   ? user.getIdToken(true).then(async (idToken) => {
    //       console.log(idToken);
    //     })
    //   : null

    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });
  }, [user]);
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="ml-72 w-full h-screen flex items-center justify-center">
          <div className="max-w-xl space-y-2">
            <h2>
              Hey
              {user && user?.displayName ? `, ${user?.displayName}` : " there"}!
            </h2>
            <h4 className="font-medium">
              Get started by click the "+" icon in the sidebar to your left to
              create a note!
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
