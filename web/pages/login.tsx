import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";

import {
  GithubAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../util/initFirebase";
import React from "react";
import { registerUser } from "../util/registerUser";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  // const auth = getAuth();

  const router = useRouter();

  const signInUser = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // e.target.email.value;
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    signInWithEmailAndPassword(auth, target.email.value, target.password.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className="min-h-screen p-16">
      <div className="space-y-4 max-w-2xl mx-auto">
        <h1>Login</h1>
        <p>Let's jump back into an awesome notetaking experience</p>

        <button
          className="rounded-full bg-black text-white p-2 w-full flex justify-center space-x-4 items-center"
          onClick={() => {
            const provider = new GithubAuthProvider();
            console.log(provider);
            signInWithPopup(auth, provider)
              .then(async (result) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const credential =
                  GithubAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;

                // The signed-in user info.
                const user = result.user;

                await user.getIdToken(true).then(async (idToken) => {
                  const result = await registerUser(idToken);
                  router.push("/");
                });

                // ...
              })
              .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential =
                  GithubAuthProvider.credentialFromError(error);

                console.log(error);

                // ...
              });
          }}
        >
          <FaGithub className="text-2xl" />
          <h4 className="text-white text-lg">Sign in with GitHub</h4>
        </button>

        <p className="text-center">or</p>
        <div>
          <form onSubmit={signInUser} className="space-y-12">
            <div className="space-y-8">
              <div className="space-y-2">
                <label htmlFor="email" className="text-white font-bold">
                  Email
                </label>
                <input
                  name="email"
                  placeholder="mail@example.com"
                  type={"email"}
                  autoComplete="email"
                  className="outline-none rounded-lg ring-2 ring-accent w-full transition ease-in-out duration-150 py-2 px-6 font-bold text-gray-500 caret-gray-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-white font-bold">
                  Password
                </label>
                <input
                  name="password"
                  placeholder="••••••••••"
                  type={"password"}
                  autoComplete="password"
                  className="outline-none rounded-lg ring-2 ring-accent w-full transition ease-in-out duration-150 py-2 px-6 font-bold text-gray-500 caret-gray-500"
                />
              </div>
            </div>
            <input
              type="submit"
              value={"Login"}
              className="rounded-full bg-accent hover:bg-accent-hover transition w-full text-white font-bold p-3 text-xl"
            />

            {/* <h4>Login</h4>
          </input> */}
          </form>

          <p className="mt-5">
            Not the right page?{" "}
            <a href="/signup" className="underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
