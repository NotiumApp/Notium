import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../util/initFirebase";

export const SidebarLeft = () => {
  const [user, error, loading] = useAuthState(auth);

  return (
    <div className="w-20 h-screen bg-[#0A0025] flex flex-col justify-between">
      N
      <a href="/settings">
        <img
          src={
            (user && user?.photoURL) ||
            `https://avatars.dicebear.com/api/bottts/${
              (user && user.displayName) || "user"
            }.svg`
          }
          alt="user"
          className="w-12 h-12 rounded-full mx-auto mb-4"
        />
      </a>
    </div>
  );
};
