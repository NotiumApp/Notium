import type { NextPage } from "next";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../util/initFirebase";
import { registerUser } from "../util/registerUser";
import Router, { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { Form } from "../components/Form";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { LoginValues } from "./login";
import { Meta } from "../partials/Meta";
import { useEffect } from "react";

export const signInWithGithHub = async () => {
  const provider = new GithubAuthProvider();
  console.log(provider);
  signInWithPopup(auth, provider)
    .then(async (result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      // The signed-in user info.
      const user = result.user;

      await user.getIdToken(true).then(async (idToken) => {
        const result = await registerUser(idToken);
        Router.push("/");
      });
    })
    .catch((error) => {
      const credential = GithubAuthProvider.credentialFromError(error);
      toast.error(error.message);
    });
};

type SignUpValues = LoginValues & { username: string };

const SignUp: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<SignUpValues>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });
  }, []);

  const createUser = handleSubmit(
    ({ username: displayName, email, password }: SignUpValues) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async ({ user }) => {
          await updateProfile(user, { displayName });
          await user.getIdToken(true).then(async (idToken) => {
            await registerUser(idToken);
            router.push("/");
          });
        })
        .catch(({ message }) => {
          toast.error(message);
        });
    }
  );

  return (
    <>
      <Meta title="Sign Up | Notium" />
      <div className="h-screen grid place-items-center mx-auto w-screen">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 text-center">
            <h2 className="font-semibold">notium.sh</h2>
            <p className="text-lg">
              Get ready to supercharge your notes with Notium!
            </p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <Form
              onSubmit={createUser}
              submitText="Sign Up"
              otherOptions={
                <>
                  <div className="my-4">
                    <p className="relative flex justify-center text-xs uppercase text-neutral-500">
                      or continue with
                    </p>
                  </div>
                  <button
                    className="px-4 py-2 flex justify-center items-center gap-1 w-full border-[1px] border-neutral-400 hover:bg-neutral-100 rounded-md"
                    onClick={signInWithGithHub}
                  >
                    <FaGithub className="text-lg" />
                    <p className="text-md">GitHub</p>
                  </button>
                </>
              }
            >
              <div className="space-y-6">
                <Input placeholder="Username" {...register("username")} />
                <Input
                  type="email"
                  placeholder="Email address"
                  {...register("email")}
                />
                <Input
                  type="password"
                  placeholder="••••••••••••"
                  {...register("password")}
                />
              </div>
            </Form>
          </div>

          <p className="text-center">
            Already have an account?{" "}
            <Link href="/login">
              <a className="underline">Login</a>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
