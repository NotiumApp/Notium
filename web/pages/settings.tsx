import { NextPage } from "next/types";
import { useState } from "react";
import { useEffect } from "react";
import {
  useAuthState,
  useUpdateEmail,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { HiOutlineAtSymbol, HiOutlinePencil } from "react-icons/hi";
import { auth } from "../util/initFirebase";

const Settings: NextPage = () => {
  const [user, loading, error] = useAuthState(auth);
  const [updateProfile, updating, profileError] = useUpdateProfile(auth);
  const [updateEmail, emailUpdating, emailError] = useUpdateEmail(auth);

  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();
  useEffect(() => {
    user
      ? user.getIdToken(true).then(async (idToken) => {
          console.log(idToken);
        })
      : null;

    setName(user?.displayName || "");
    setEmail(user?.email || "");
  }, [user]);
  return (
    <>
      {/* <div className=""> */}
      <div className="max-w-5xl mx-auto">
        <h2>Settings</h2>
        <hr className="mt-2 mb-4" />

        <div className="space-y-4">
          <div>
            <p className="text-2xl font-bold">Profile</p>
            <p className="text-gray-500">
              This information is not public and will not be shown to anybody.
            </p>
          </div>

          <div className="flex items-center space-x-8">
            <div className="space-y-6 w-1/2">
              <div>
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium" htmlFor="firstName">
                    Name
                  </label>
                  <input
                    name="name"
                    onChange={(e) => {
                      setName(e.target.value);
                      updateProfile({ displayName: e.target.value });
                    }}
                    placeholder="John Doe"
                    value={name}
                    className="rounded-md text-sm outline-none border-2 border-slate-300 text-slate-400 py-2 px-4"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email">
                  Email
                </label>
                <div className="flex w-full">
                  <div className="flex justify-center items-center p-2 rounded-l-md bg-slate-300">
                    <HiOutlineAtSymbol size={20} className="text-white " />
                  </div>
                  <input
                    name="email"
                    type={"email"}
                    placeholder="john@example.com"
                    onChange={async (e) => {
                      setEmail(e.target.value);
                      await updateEmail(e.target.value);
                    }}
                    value={email}
                    className="rounded-r-md text-sm outline-none border-2 border-slate-300 py-2 px-4 w-full text-slate-400"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {/* TODO: fix this to actual default avatar */}
              <img
                src={user?.photoURL || "DEFAULT AVATAR"}
                className="w-40 h-40 rounded-full"
              />
              <div className="flex justify-center">
                <button className="flex items-center justify-center rounded-md hover:bg-slate-200 py-1 px-4 transition duration-150 ease-in-out space-x-2">
                  <HiOutlinePencil size={17} />{" "}
                  <p className="font-medium">Edit</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Settings;
