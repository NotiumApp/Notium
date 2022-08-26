import { NextPage } from "next/types";
import { useState } from "react";
import { useEffect } from "react";
import {
  useAuthState,
  useUpdateEmail,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { HiLogout, HiOutlineAtSymbol, HiOutlinePencil } from "react-icons/hi";
import { auth } from "../util/initFirebase";
import { useRouter } from "next/router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import toast from "react-hot-toast";

const Settings: NextPage = () => {
  const [user, loading, error] = useAuthState(auth);
  const [updateProfile, updating, profileError] = useUpdateProfile(auth);
  const [updateEmail, emailUpdating, emailError] = useUpdateEmail(auth);
  const router = useRouter();
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();
  useEffect(() => {
    // user
    //   ? user.getIdToken(true).then(async (idToken) => {
    //       console.log(idToken);
    //     })
    //   : null;

    // if (!user) {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user?.displayName || "");
        setEmail(user?.email || "");
      } else {
        router.push("/");
      }
    });
    // }
  }, [user]);
  return (
    <>
      {/* <div className=""> */}
      <div className="max-w-5xl mx-auto my-8">
        <h2>Settings</h2>
        <hr className="mt-2 mb-4" />

        <div className="space-y-4">
          <div>{/* <p className="text-2xl font-bold">Profile</p> */}</div>
          <div className="w-max flex flex-col justify-center mx-auto">
            {/* TODO: fix this to actual default avatar */}
            <img
              src={
                user?.photoURL ||
                `https://avatars.dicebear.com/api/bottts/${name}.svg`
              }
              className="w-40 h-40 rounded-full"
            />
            <div className="-translate-y-14 -translate-x-2 flex">
              <button className="flex items-center justify-center rounded-full border border-gray-300 bg-slate-100 hover:bg-slate-200 p-3 transition duration-150 ease-in-out space-x-2">
                <HiOutlinePencil size={17} />{" "}
                {/* <p className="font-medium">Edit</p> */}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-8 w-full">
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

              <button
                onClick={() => {
                  signOut(auth)
                    .then(() => {
                      router.push("/login");
                    })
                    .catch((err) => {
                      toast.error("We couldn't log you out :(");
                    });
                }}
                className="bg-red-600 w-full text-white px-6 text-md font-semibold rounded-lg hover:bg-red-700 transition duration-150 py-2 flex justify-center space-x-3 items-center"
              >
                <HiLogout size={20} />
                <p className="text-white text-md font-semibold">Log Out</p>{" "}
              </button>
              {/* <div className="space-y-2">
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

                      try {
                        await updateEmail(e.target.value);
                      } catch (err) {
                        console.log(err);
                      }
                    }}
                    value={email}
                    className="rounded-r-md text-sm outline-none border-2 border-slate-300 py-2 px-4 w-full text-slate-400"
                  />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Settings;
