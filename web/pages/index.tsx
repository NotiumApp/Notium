import { NextPage } from "next/types";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Sidebar } from "../components/Sidebar";
import { auth } from "../util/initFirebase";

const Home: NextPage = () => {
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    user
      ? user.getIdToken(true).then(async (idToken) => {
          console.log(idToken);
        })
      : null;
  }, [user]);
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="">{user?.email}</div>
      </div>
    </>
  );
};

export default Home;
