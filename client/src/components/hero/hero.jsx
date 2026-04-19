const Hero = () => {
  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center bg-mist-100 px-4 mt-0">
      <div className="max-w-5xl text-center">

     
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          Build, Run & Debug Code <br />
          <span className="text-blue-600">in Your Browser</span>
        </h1>

     
        <p className="mt-6 text-lg md:text-xl text-gray-700">
          A powerful MERN stack code editor with real-time execution,
          multi-language support, and a seamless developer experience.
        </p>

     
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition">
            Start Coding
          </button>
          <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition">
            View Features
          </button>
        </div>

     
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-800">
          <div className="p-4 rounded-xl bg-white shadow-sm">
            <h3 className="font-semibold text-lg text-blue-600">⚡ Fast Execution</h3>
            <p className="text-sm mt-2">Run code instantly with optimized backend support.</p>
          </div>

          <div className="p-4 rounded-xl bg-white shadow-sm">
            <h3 className="font-semibold text-lg text-blue-600">🌐 Multi-language</h3>
            <p className="text-sm mt-2">Supports JavaScript, Python, C++, and more.</p>
          </div>

          <div className="p-4 rounded-xl bg-white shadow-sm">
            <h3 className="font-semibold text-lg text-blue-600">🛠 MERN Powered</h3>
            <p className="text-sm mt-2">Built with MongoDB, Express, React, and Node.js.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
