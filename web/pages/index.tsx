import { NextPage } from "next/types";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
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
  return <div>{user?.email}</div>;
};

export default Home;
