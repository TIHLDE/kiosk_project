export default function SubwaySurfers() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] min-h-screen bg-gray-50">
      {/* Left Section: Video */}
      <div className="flex justify-center items-center p-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-screen object-contain"
        >
          <source src="minecraft.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Middle Section: Text */}
      <div className="flex flex-col justify-center items-center p-8 bg-white shadow-lg">
        <h1 className="text-3xl font-bold text-sky-900 mb-4 text-center">
          Har du noen anbefalinger til skjermen?
        </h1>
        <h1 className="text-3xl font-bold text-sky-900 mb-4 text-center">
          Send til driftsminister@tihlde.org
        </h1>
      </div>

      {/* Right Section: Video */}
      <div className="flex justify-center items-center p-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-screen object-contain"
        >
          <source src="subwaysurfers.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}