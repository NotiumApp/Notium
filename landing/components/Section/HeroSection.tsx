//Hero section, right below the navbar
import { Blob } from "../Blob";

const HeroSection = () => {
  return (
    <div className="md:flex z-0 relative md:justify-center lg:mx-16 md:mt-32 mt-12">
      <div className="flex xl:space-x-36">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-rubik font-semibold">
            Computer Science <br /> notes,{" "}
            <span className="text-accent-primary">revolutionized</span>
          </h1>
          <p className="text-gray-600 text-lg font-rubik max-w-xl">
            Meet Notium, a notetaking app specialized for the field of CS.
            Whether you're a CS student or learning a new technology, we've got
            your back. Although we're currently building Notium right now, we
            can notify you when our product launches and even give you an early
            sneak peek at Notium!
          </p>

          <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
            <div className="relative w-full md:w-[25rem]">
              <input
                className="px-4 py-1 bg-fg border-2 border-accent-primary outline-none ring-variant-2 focus:ring-2 rounded-lg w-full h-[4rem] font-rubik"
                placeholder="example@email.com"
              />
            </div>
            <button className="bg-accent-primary text-white text-sm font-rubik font-semibold rounded-xl px-4 py-4 md:py-2 cursor-pointer transition duration-150 ease-in-out hover:bg-[#16a085]">
              Join Waitlist
            </button>
          </div>
        </div>

        <div>
          <img
            src="/computer.svg"
            className="hidden xl:block w-full z-40 relative"
          />

          <Blob />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
