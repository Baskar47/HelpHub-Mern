import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* HERO SECTION */}
      <div className="max-w-6xl mx-auto px-4 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* LEFT */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Ask any problem,
                <span className="text-blue-600 block">Get real solutions.</span>
              </h1>
              
              <p className="text-gray-600 text-lg mt-6 leading-relaxed">
                An open community where you can post technical, personal, 
                career, or daily challenges and receive helpful answers 
                from real people.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/problems"
                className="px-8 py-3.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm text-center"
              >
                Explore Problems
              </Link>
              <Link
                to="/"
                className="px-8 py-3.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              What you can share
            </h3>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <span className="text-gray-700">Technical & coding challenges</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                <span className="text-gray-700">Study & career guidance</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
                <span className="text-gray-700">Daily life or work obstacles</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3"></div>
                <span className="text-gray-700">General questions & ideas</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* VALUE SECTION */}
      <div className="bg-gray-50 py-20 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
                <div className="w-6 h-6 bg-blue-500 rounded-lg"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Open Platform
              </h3>
              <p className="text-gray-600">
                All questions welcome, no restrictions
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto">
                <div className="w-6 h-6 bg-green-500 rounded-lg"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Community Driven
              </h3>
              <p className="text-gray-600">
                Real people helping each other grow
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto">
                <div className="w-6 h-6 bg-purple-500 rounded-lg"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Simple to Use
              </h3>
              <p className="text-gray-600">
                Ask, solve, and learn effortlessly
              </p>
            </div>
            
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Ready to find solutions?
          </h2>
          <p className="text-gray-600 text-lg">
            Join thousands already getting help with their challenges.
          </p>
          
          <Link
            to="/register"
            className="inline-block px-10 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            Get Started Free
          </Link>
          
          <p className="text-gray-500 text-sm mt-4">
            No credit card required
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;