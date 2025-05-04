import CardWrapper from "./wrapper";

export default function SubwaySurfers() {
  return (
    <CardWrapper className="flex items-center justify-center h-full bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] h-full w-full">
        {/* Left Section: Video */}
        <div className="flex justify-center items-center p-0 h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-contain rounded-xl" // Added rounded corners
          >
            <source src="minecraft.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Middle Section: Text */}
        <div className="flex flex-col justify-center items-center p-8 bg-white shadow-lg h-full">
          <h1 className="text-3xl font-bold text-sky-900 mb-4 text-center">
            Har du noen anbefalinger til skjermen?
          </h1>
          <p className="text-lg text-gray-600 text-center">
            Send til <span className="font-semibold">driftsminister@tihlde.org</span>
          </p>
        </div>

        {/* Right Section: Video */}
        <div className="flex justify-center items-center p-0 h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-contain rounded-xl" // Added rounded corners
          >
            <source src="subwaysurfers.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </CardWrapper>
  );
}