export default function SubwaySurfers() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-gray-50">
      {/* Left Section: Text */}
      <div className="flex flex-col justify-center items-center p-8 bg-white shadow-lg">
        <h1 className="text-3xl font-bold text-sky-900 mb-4 text-center">
          Har du noen anbefalinger til skjermen?
        </h1>
        <p className="text-lg text-gray-600 text-center">
          Send til <span className="font-semibold">driftsminister@tihlde.org</span>
        </p>
      </div>

      {/* Right Section: Image */}
      <div className="flex justify-center items-center p-8">
        <img
          src="/subway_surfers.gif"
          alt="Subway Surfers Animation"
          className="rounded-lg shadow-lg max-w-full h-auto"
        />
      </div>
    </div>
  );
}