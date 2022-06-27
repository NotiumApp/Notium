import type { NextPage } from "next";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../util/initFirebase";
import { registerUser } from "../util/registerUser";
import { useRouter } from "next/router";
import { signInWithGithHub } from "./signup";
import { Form } from "../components/Form";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export type LoginValues = {
  email: string;
  password: string;
};

const Login: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<LoginValues>();

  const signInUser = handleSubmit(({ email, password }: LoginValues) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        await user.getIdToken(true).then(async (idToken) => {
          const result = await registerUser(idToken);
          router.push("/");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  });

  return (
    <div className="h-screen grid place-items-center">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="font-semibold">notium.sh</h2>
          <p className="text-lg">
            Let's jump back into an awesome notetaking experience.
          </p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <Form
            onSubmit={signInUser}
            submitText="Login"
            otherOptions={
              <button
                className="px-4 py-2 flex justify-center items-center gap-1 w-full border-[1px] border-neutral-400 hover:bg-neutral-100 rounded-md mt-6"
                onClick={signInWithGithHub}
              >
                <FaGithub className="text-lg" />
                <p className="text-md">GitHub</p>
              </button>
            }
          >
            <div className="space-y-6">
              <Input
                placeholder="johndoe@example.com"
                labelText="Email"
                {...register("email")}
              />
              <Input
                labelText="Password"
                type="password"
                {...register("password")}
                placeholder="••••••••••••"
              />
            </div>
          </Form>
        </div>
        <p className="text-center">
          Don't have an account?{" "}
          <Link href="/signup">
            <a className="underline">Sign Up</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
