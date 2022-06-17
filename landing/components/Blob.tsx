export const Blob = () => {
  return (
    <svg
      width="1000"
      height="1000"
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
      className="hidden lg:block blur-3xl absolute top-0 translate -translate-y-60 z-0 "
    >
      <defs>
        <filter id="grain" x="-50vw" y="-50vh" width="100vw" height="100vh">
          <feFlood floodColor="#ffffff" result="neutral-gray" />

          <feTurbulence
            in="neutral-gray"
            type="fractalNoise"
            baseFrequency="2.5"
            numOctaves="100"
            stitchTiles="stitch"
            result="noise"
          />

          <feColorMatrix
            in="noise"
            type="saturate"
            values="0"
            result="destaturatedNoise"
          ></feColorMatrix>

          <feComponentTransfer in="desaturatedNoise" result="theNoise">
            <feFuncA type="table" tableValues="0 0 0.25 0"></feFuncA>
          </feComponentTransfer>

          <feBlend
            in="SourceGraphic"
            in2="theNoise"
            mode="soft-light"
            result="noisy-image"
          />
        </filter>

        <linearGradient
          id="linearGradientId"
          gradientTransform="rotate(0 0.5 0.5)"
        >
          <stop offset="0%" stopColor="#d5ffdb" />
          <stop offset="100%" stopColor="#c6dbff" />
        </linearGradient>

        <clipPath id="shape">
          <path
            fill="currentColor"
            d="M846,622Q836,744,730,813Q624,882,502,876Q380,870,245,826.5Q110,783,55.5,641.5Q1,500,93,385.5Q185,271,286,212.5Q387,154,506.5,133.5Q626,113,721,191.5Q816,270,836,385Q856,500,846,622Z"
          ></path>
        </clipPath>
      </defs>

      <g filter="url(#grain)" clipPath="url(#shape)">
        <path
          fill="url(#linearGradientId)"
          d="M846,622Q836,744,730,813Q624,882,502,876Q380,870,245,826.5Q110,783,55.5,641.5Q1,500,93,385.5Q185,271,286,212.5Q387,154,506.5,133.5Q626,113,721,191.5Q816,270,836,385Q856,500,846,622Z"
        />
      </g>
    </svg>
  );
};
