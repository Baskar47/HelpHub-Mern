import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <div className="bg-gray-900 text-white p-4 flex gap-6">
      <Link to="/admin" className="font-bold">Admin</Link>
      <Link to="/admin/problems">Problems</Link>
    </div>
  );
};

export default AdminNavbar;
