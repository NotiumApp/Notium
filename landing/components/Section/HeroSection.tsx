//Hero section, right below the navbar
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Blob } from "../Blob";

const addEmail = (e: any) => {
  e.preventDefault();

  console.log(e.target.value);
};

const HeroSection = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="md:flex z-0 relative md:justify-center lg:mx-16 lg:mt-32 pb-8 md:pb-0">
      <div className="flex flex-col-reverse lg:flex-row items-center space-x-0 space-y-8 lg:space-y-0 lg:space-x-12 xl:space-x-20">
        <div className="space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-rubik font-black text-center lg:text-left">
            Computer Science <br /> notes,{" "}
            <span className="text-accent-primary">revolutionized</span>
          </h1>
          <p className="text-gray-600 text-center lg:text-left text-base md:text-lg font-rubik max-w-xl">
            Meet Notium, a notetaking app specialized for the field of CS.
            Whether you're a CS student or learning a new technology, we've got
            your back. Although we're currently building Notium right now, we
            can notify you when our product launches and even give you an early
            sneak peek!
          </p>

          {/* <form
            onSubmit={async (e) => {
              e.preventDefault();

              setLoading(true);

              try {
                const { data } = await axios({
                  url: "/api/email",
                  method: "POST",
                  data: {
                    email: (e.target as any).email.value,
                  },
                });

                if (data) {
                  setLoading(false);
                }
                toast.success("Email added sucessfully!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });

                (e.target as any).email.value = "";
              } catch (err) {
                console.log("An error has occurred", err);
                toast.error("Hmm, something went wrong", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }
            }}
            className="flex flex-col md:flex-row md:space-x-2 space-x-0 space-y-2 md:space-y-0 justify-end lg:justify-start"
          > */}
          <div className="">
            {/* <input
                className="px-4 py-1 bg-fg border-2 border-accent-primary outline-none ring-variant-2 focus:ring-2 rounded-lg w-full h-[4rem] font-rubik"
                placeholder="example@email.com"
                type={"email"}
                disabled={loading}
                name="email"
              /> */}

            <div className="w-full bg-accent-primary text-white text-center text-lg font-rubik font-semibold rounded-lg px-4 py-4 md:py-2 cursor-pointer transition duration-150 ease-in-out hover:bg-[#16a085]">
              <a href="https://notiumapp.vercel.app">Try the demo</a>
            </div>
          </div>
          {/* <input
              type="submit"
              value={!loading ? "Join Waitlist" : "Submitting..."}
              disabled={loading}
              className="bg-accent-primary text-white text-sm font-rubik font-semibold rounded-xl px-4 py-4 md:py-2 cursor-pointer transition duration-150 ease-in-out hover:bg-[#16a085]"
            /> */}
          {/* </form> */}
        </div>

        <div>
          <img
            src="/computer.svg"
            className="w-full max-w-lg lg:max-w-none z-40 relative"
          />

          <Blob />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
