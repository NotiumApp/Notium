//Hero section, right below the navbar
import axios from "axios";
import { toast } from "react-toastify";
import { Blob } from "../Blob";

const addEmail = (e:any) => {
  e.preventDefault();

  console.log(e.target.value);
};

const HeroSection = () => {
  return (
    <div className="md:flex z-0 relative md:justify-center lg:mx-16 lg:mt-32">
      <div className="flex flex-col-reverse lg:flex-row items-center space-x-0 space-y-8 lg:space-y-0 lg:space-x-24">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-rubik font-black text-center lg:text-left">
            Computer Science <br /> notes,{" "}
            <span className="text-accent-primary">revolutionized</span>
          </h1>
          <p className="text-gray-600 text-center lg:text-left text-lg font-rubik max-w-xl">
            Meet Notium, a notetaking app specialized for the field of CS.
            Whether you're a CS student or learning a new technology, we've got
            your back. Although we're currently building Notium right now, we
            can notify you when our product launches and even give you an early
            sneak peek at Notium!
          </p>

          <form
            onSubmit={async (e) => {
              e.preventDefault();

              try {
                const { data } = await axios({
                  url: "/api/email",
                  method: "POST",
                  data: {
                    email: e.target.email.value,
                  },
                });
                toast.success("Email added sucessfully!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
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
            className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0 justify-center"
          >
            <div className="relative w-full md:w-[25rem]">
              <input
                className="px-4 py-1 bg-fg border-2 border-accent-primary outline-none ring-variant-2 focus:ring-2 rounded-lg w-full h-[4rem] font-rubik"
                placeholder="example@email.com"
                type={"email"}
                name="email"
              />
            </div>
            <input
              type="submit"
              value="Join Waitlist"
              className="bg-accent-primary text-white text-sm font-rubik font-semibold rounded-xl px-4 py-4 md:py-2 cursor-pointer transition duration-150 ease-in-out hover:bg-[#16a085]"
            />
          </form>
        </div>

        <div>
          <img
            src="/computer.svg"
            className="lg:block w-full max-w-lg lg:max-w-none z-40 relative"
          />

          <Blob />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
