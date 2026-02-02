import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostProblem = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/post",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      navigate("/problems");
    } catch (err) {
      alert("Failed to post problem. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Share Your Problem
          </h1>
          <p className="text-gray-600 mt-2">
            Describe your challenge clearly to get the best help from our community
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Title */}
            <div className="space-y-2">
              <label className="block text-gray-800 font-medium">
                Problem Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Example: My laptop won't turn on after a power outage"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
              />
              <p className="text-sm text-gray-500">
                Be specific to attract relevant help
              </p>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="block text-gray-800 font-medium">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
              >
                <option value="" disabled>Select the most relevant category</option>
                <option value="Education">📚 Education & Study</option>
                <option value="Job">💼 Job & Career</option>
                <option value="Health">🏥 Health & Wellness</option>
                <option value="Lost">🔍 Lost & Found</option>
                <option value="Personal">💬 Personal & Relationships</option>
                <option value="Technical">💻 Technical & IT</option>
                <option value="Finance">💰 Finance & Money</option>
                <option value="Other">🔧 Other</option>
              </select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-gray-800 font-medium">
                Detailed Description
              </label>
              <textarea
                name="description"
                placeholder="Provide as much detail as possible. Include:
• What exactly is the problem?
• When did it start?
• What have you tried already?
• What outcome are you hoping for?"
                value={formData.description}
                onChange={handleChange}
                rows="8"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none placeholder-gray-500 leading-relaxed"
              />
              <p className="text-sm text-gray-500">
                Clear descriptions get better and faster responses
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3.5 px-6 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Posting Problem...
                  </span>
                ) : (
                  "Post Problem to Community"
                )}
              </button>
              
              <p className="text-center text-gray-500 text-sm mt-4">
                Your problem will be visible to the entire community
              </p>
            </div>
          </form>
        </div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-900 font-medium inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Problems
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostProblem;