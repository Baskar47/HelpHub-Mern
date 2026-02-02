import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/common/Loader";
const loggedUser = JSON.parse(localStorage.getItem("user"));

const ProblemDetails = () => {
  const { id } = useParams();

  const [problem, setProblem] = useState(null);
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [solutionText, setSolutionText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // edit solution
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // delete solution
  const [deleteId, setDeleteId] = useState(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Add these with your other state declarations:
const [showDeleteProblemModal, setShowDeleteProblemModal] = useState(false);
const [deletingProblem, setDeletingProblem] = useState(false);

  // fetch problem + solutions
  const fetchData = async () => {
    try {
      const p = await axios.get(
        `http://localhost:5000/api/post/${id}`
      );
      const s = await axios.get(
        `http://localhost:5000/api/solution/${id}`
      );

      setProblem(p.data.data);
      setSolutions(s.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);


// Replace the existing handleDeleteProblem function
const handleDeleteProblem = async () => {
  if (!token) return alert("Login required");

  setDeletingProblem(true);
  try {
    await axios.delete(
      `http://localhost:5000/api/post/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // alert("Problem deleted successfully");
    window.location.href = "/problems"; // redirect
  } catch (err) {
    console.log(err);
    alert("Delete failed");
  } finally {
    setDeletingProblem(false);
  }
};

  // add solution
  const handleSolutionSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert("Login required");

    setSubmitting(true);

    await axios.post(
      "http://localhost:5000/api/solution",
      { solutionText, problemId: id },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setSolutionText("");
    setSubmitting(false);
    fetchData();
  };

  // like / dislike
  const handleLike = async (sid, type) => {
    if (!token) return alert("Login required");

    await axios.put(
      `http://localhost:5000/api/solution/${sid}/${type}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    fetchData();
  };

  // edit solution
  const handleEdit = async (sid) => {
    await axios.put(
      `http://localhost:5000/api/solution/${sid}`,
      { solutionText: editText },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setEditingId(null);
    setEditText("");
    fetchData();
  };

  // delete solution
  const confirmDelete = async () => {
    await axios.delete(
      `http://localhost:5000/api/solution/${deleteId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setDeleteId(null);
    fetchData();
  };

  if (loading) return <Loader />;
  if (!problem) return <p>Problem not found</p>;

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Back Navigation */}
        <div className="mb-6">
          <Link 
            to="/problems" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Problems
          </Link>
        </div>

        {/* Problem Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">

            
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${getCategoryColor(problem.category)}`}>
                  {problem.category || "General"}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(problem.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{problem.title}</h1>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-medium">
                  {problem.createdBy?.name?.charAt(0) || "U"}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{problem.createdBy?.name || "Anonymous"}</p>
                <p className="text-xs text-gray-500">Problem Author</p>
              </div>
            </div>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed  whitespace-pre-line">{problem.description}</p>
          </div>
          <div className="">
  <div className="mt-2 flex justify-end">
   {/* 🔥 DELETE PROBLEM – OWNER ONLY */}
{problem.createdBy?._id === user?._id && (
  <button
    onClick={() => setShowDeleteProblemModal(true)}
    className="group ml-4 inline-flex items-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 hover:text-red-700 rounded-xl transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
  >
    <span className="relative z-10">
      <svg
        className="w-4 h-4 group-hover:scale-110 transition-transform duration-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </span>
    <span className="relative z-10 font-medium text-sm">
      Delete Problem
    </span>
  </button>
)}

<div>
  {/* Delete Problem Modal */}
{showDeleteProblemModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    {/* Backdrop */}
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
      onClick={() => !deletingProblem && setShowDeleteProblemModal(false)}
    />
    
    {/* Modal */}
    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md transform transition-all">
      {/* Modal Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <svg 
                className="w-6 h-6 text-red-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Delete Problem
            </h3>
            <p className="text-gray-600 mt-1">
              Are you sure you want to delete this problem?
            </p>
          </div>
        </div>
      </div>

      {/* Warning Message */}
      <div className="p-6">
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <svg 
              className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
                clipRule="evenodd" 
              />
            </svg>
            <div>
              <p className="text-red-800 font-medium mb-1">Warning</p>
              <p className="text-red-700 text-sm">
                This action will delete the problem "{problem.title}" and all {solutions.length} associated solution{solutions.length !== 1 ? 's' : ''}.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowDeleteProblemModal(false)}
            disabled={deletingProblem}
            className="flex-1 px-5 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteProblem}
            disabled={deletingProblem}
            className="flex-1 px-5 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {deletingProblem ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Deleting...
              </span>
            ) : "Delete Problem"}
          </button>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setShowDeleteProblemModal(false)}
        disabled={deletingProblem}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors disabled:opacity-50"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
)}
</div>
  </div> 
</div>


          
        </div>
        

        {/* Solutions Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Solutions ({solutions.length})
            </h2>
            <div className="text-sm text-gray-600">
              {solutions.length === 0 ? "Be the first to help!" : "Latest solutions first"}
            </div>
          </div>

          {solutions.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No solutions yet</h3>
              <p className="text-gray-600 mb-6">Share your knowledge and help solve this problem</p>
            </div>
          ) : (
            <div className="space-y-4">
              {solutions.map((sol) => (
                <div key={sol._id} className="bg-white rounded-xl border border-gray-200 p-5">
                  
                  {/* Solution Author */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-sm font-medium">
                          {sol.createdBy?.name?.charAt(0) || "A"}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{sol.createdBy?.name || "Anonymous"}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(sol.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    {/* Like/Dislike */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleLike(sol._id, "like")}
                        className={`flex items-center gap-1 px-3 py-1 rounded-lg ${sol.likes?.includes(user?._id) ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`}
                      >
                        <span>👍</span>
                        <span className="text-sm">{sol.likes?.length || 0}</span>
                      </button>
                      <button
                        onClick={() => handleLike(sol._id, "dislike")}
                        className={`flex items-center gap-1 px-3 py-1 rounded-lg ${sol.dislikes?.includes(user?._id) ? 'bg-red-50 text-red-700' : 'text-gray-600 hover:bg-gray-100'}`}
                      >
                        <span>👎</span>
                        <span className="text-sm">{sol.dislikes?.length || 0}</span>
                      </button>
                    </div>
                  </div>

                  {/* Solution Content */}
                  {editingId === sol._id ? (
                    <div className="mb-4">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleEdit(sol._id)}
                          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditText("");
                          }}
                          className="px-4 py-2 border border-gray-300 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-4">{sol.solutionText}</p>
                      
                      {/* Edit/Delete for solution author */}
                      {sol.createdBy?._id === user?._id && (
                        <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                          <button
                            onClick={() => {
                              setEditingId(sol._id);
                              setEditText(sol.solutionText);
                            }}
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteId(sol._id)}
                            className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Solution Form */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Your Solution</h3>
          <form onSubmit={handleSolutionSubmit}>
            <textarea
              value={solutionText}
              onChange={(e) => setSolutionText(e.target.value)}
              required
              rows="5"
              placeholder="Share your solution here. Be clear and helpful..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none placeholder-gray-500"
            />
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-500">
                {token ? "Your solution will be visible to everyone" : "Please login to post a solution"}
              </p>
              <button
                type="submit"
                disabled={submitting || !token}
                className={`px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors ${
                  submitting || !token ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Posting...
                  </span>
                ) : token ? "Post Solution" : "Login Required"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Solution</h3>
                <p className="text-sm text-gray-600 mt-1">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this solution? This will remove all likes and replies associated with it.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2.5 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Solution
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemDetails;