//Hero section, right below the navbar
const HeroSection = () => {
  return (
    <div className="md:flex z-0 relative md:justify-center lg:mx-16 md:mt-32 mt-12">
      <div className="flex xl:space-x-60">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-rubik font-semibold">
            Computer Science <br /> notes,{" "}
            <span className="text-accent-primary">revolutionized</span>
          </h1>
          <p className="text-gray-600 text-lg font-rubik max-w-xl">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>

          <div className="flex space-x-2">
            <div className="relative w-full md:w-[25rem]">
              <span className="rounded-full h-5 bg-accent-primary text-xs text-white absolute -top-2 left-4 px-5 text-[0.5rem] font-bold font-rubik grid place-items-center">
                Email Address
              </span>
              <input
                className="p-4 bg-fg border-2 border-accent-primary outline-none ring-variant-2 focus:ring-2 rounded-lg w-full h-[4rem] font-rubik"
                placeholder="example@email.com"
              />
            </div>
            <button className="bg-accent-primary w-28 text-white text-sm font-rubik font-semibold rounded-xl">
              Join Waitlist
            </button>
          </div>
        </div>

        <div>
          <h1 className="hidden lg:block">placeholder</h1>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
