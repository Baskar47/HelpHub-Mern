import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../components/common/Loader";



const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/post")
      .then((res) => {
        setProblems(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  

  const categories = [
    "All",
    "Education",
    "Job",
    "Health",
    "Lost",
    "Personal",
    "Technical",
    "Finance",
    "Other"
  ];

  const filteredProblems = selectedCategory === "All" 
    ? problems 
    : problems.filter(problem => problem.category === selectedCategory);

  const getCategoryColor = (category) => {
    const colors = {
      "Education": "bg-blue-100 text-blue-800",
      "Job": "bg-green-100 text-green-800",
      "Health": "bg-red-100 text-red-800",
      "Lost": "bg-amber-100 text-amber-800",
      "Personal": "bg-purple-100 text-purple-800",
      "Technical": "bg-indigo-100 text-indigo-800",
      "Finance": "bg-emerald-100 text-emerald-800",
      "Other": "bg-gray-100 text-gray-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900">
            Community Problems
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            Browse challenges shared by others and contribute with your solutions
          </p>
          
          {/* Post Problem CTA */}
          <div className="mt-8">
            <Link
              to="/post-problem"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Share Your Problem
            </Link>
          </div>
        </div>
      </div>

      {/* CATEGORY FILTERS */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* PROBLEMS LIST */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {filteredProblems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No problems found
            </h3>
            <p className="text-gray-600 mb-6">
              {selectedCategory === "All" 
                ? "Be the first to share a problem with the community!" 
                : `No problems in "${selectedCategory}" category yet.`}
            </p>
            <Link
              to="/post"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Share Your Problem
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProblems.map((problem) => (
              <div
                key={problem._id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200"
              >
                {/* Category Tag */}
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${getCategoryColor(problem.category)}`}>
                    {problem.category || "General"}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(problem.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {problem.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                  {problem.description}
                </p>

                {/* Footer */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <Link
                    to={`/problems/${problem._id}`}
                    className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    View Details
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                    <span>{problem.solutions?.length || 0} solutions</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {filteredProblems.length > 0 && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-6 px-6 py-4 bg-white rounded-xl border border-gray-200">
              <div>
                <div className="text-2xl font-bold text-gray-900">{filteredProblems.length}</div>
                <div className="text-sm text-gray-600">Problems</div>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {filteredProblems.reduce((total, problem) => total + (problem.solutions?.length || 0), 0)}
                </div>
                <div className="text-sm text-gray-600">Total Solutions</div>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {new Set(filteredProblems.map(p => p.category)).size}
                </div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Problems;