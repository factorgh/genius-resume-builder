import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpenCheck,
  CirclePlus,
  ExternalLink,
  FileText,
  Pencil,
  Search,
  Trash2,
} from "lucide-react";
import { CV } from "../types/CV";

interface DashboardProps {
  savedCVs: CV[];
  deleteCV: (id: string) => void;
}

const Dashboard = ({ savedCVs, deleteCV }: DashboardProps) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCVs, setFilteredCVs] = useState<CV[]>(savedCVs);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Filter CVs based on search term
  useEffect(() => {
    const filtered = savedCVs.filter(
      (cv) =>
        cv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cv.personalInfo.fullName
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setFilteredCVs(filtered);
  }, [searchTerm, savedCVs]);

  // Create a new CV
  const createNewCV = () => {
    navigate("/editor");
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Confirm deletion
  const confirmDelete = (id: string) => {
    setDeletingId(id);
    setTimeout(() => {
      deleteCV(id);
      setDeletingId(null);
    }, 300);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
        <div className="mb-6 sm:mb-0">
          <h1 className="text-4xl font-bold text-[#333333] font-heading flex items-center">
            <BookOpenCheck size={38} className="mr-3 text-[#285C56]" />
            <span className="bg-clip-text  bg-gradient-to-r from-[#285C56] to-[#22504A] text-[#285C56]">
              Gradsuite
            </span>
          </h1>
          <p className="text-[#595959] mt-2 text-lg">
            Craft your perfect resume with our CV builder
          </p>
        </div>
        <button
          onClick={createNewCV}
          className="group transition-all duration-300 flex items-center bg-[#285C56] hover:bg--700 text-white px-6 py-3 rounded-lg shadow-button hover:shadow-lg"
        >
          <CirclePlus
            size={20}
            className="mr-2 group-hover:rotate-90 transition-transform duration-300"
          />
          Create New CV
        </button>
      </div>

      {/* Search bar */}
      <div className="mb-10 relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={20} className="text-[#B3B3B3]" />
        </div>
        <input
          type="text"
          placeholder="Search your CVs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-4 border border-[#E0E0E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[[#2D665F]] focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md"
        />
      </div>

      {/* CV list */}
      {filteredCVs.length === 0 ? (
        <div className="bg-white rounded-xl shadow-elegant p-12 text-center transform transition-all hover:shadow-lg duration-300">
          <FileText size={64} className="mx-auto text-[#578C84] mb-6" />
          <h2 className="text-2xl font-medium text-[#595959] mb-4 font-heading">
            No CVs Found
          </h2>
          <p className="text-[#999999] mb-8 max-w-md mx-auto">
            {searchTerm
              ? "No CVs match your search criteria."
              : "You haven't created any CVs yet. Let's get started!"}
          </p>
          <button
            onClick={createNewCV}
            className="inline-flex items-center bg-[#285C56] hover:bg-[#22504A] text-white px-6 py-3 rounded-lg shadow-button hover:shadow-lg transition-all duration-300"
          >
            <CirclePlus size={20} className="mr-2" />
            Create Your First CV
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCVs.map((cv) => (
            <div
              key={cv.id}
              className={`bg-white rounded-xl shadow-card overflow-hidden hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-1 ${
                deletingId === cv.id ? "scale-95 opacity-50" : ""
              }`}
            >
              <div className="p-6 border-b border-[#F2F2F2]">
                <h3 className="text-xl font-medium text-[#404040] truncate font-heading">
                  {cv.title}
                </h3>
                <p className="text-[#737373] mt-2 font-medium">
                  {cv.personalInfo.fullName}
                </p>
                <p className="text-sm text-[#B3B3B3] mt-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {formatDate(cv.lastModified)}
                </p>
              </div>
              <div className="p-4 bg-[#F9F9F9] flex justify-between items-center">
                <div className="space-x-2">
                  <button
                    onClick={() => navigate(`/editor/${cv.id}`)}
                    className="inline-flex items-center text-sm text-[#285C56] hover:text-[#1C443F] transition-colors px-2 py-1 rounded-md hover:bg-[#E6EFEE]"
                  >
                    <Pencil size={16} className="mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => navigate(`/preview/${cv.id}`)}
                    className="inline-flex items-center text-sm text-[#737373] hover:text-[#404040] transition-colors px-2 py-1 rounded-md hover:bg-[#F2F2F2]"
                  >
                    <ExternalLink size={16} className="mr-1" />
                    Preview
                  </button>
                </div>
                <button
                  onClick={() => confirmDelete(cv.id)}
                  className="inline-flex items-center text-sm text-red-500 hover:text-red-700 transition-colors px-2 py-1 rounded-md hover:bg-red-50"
                >
                  <Trash2 size={16} className="mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pro Features Banner */}
      <div className="mt-16 bg-[#F4B400] rounded-xl p-6 md:p-8 shadow-gold text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold font-heading">
              Upgrade to Gradsuite Pro
            </h3>
            <p className="mt-2 text-white/90 max-w-lg">
              Get unlimited CVs, advanced AI features, and premium templates to
              stand out from the competition
            </p>
          </div>
          <button className="mt-4 md:mt-0 bg-white text-[#CA9300] cursor-pointer hover:bg-[#F9F9F9] font-medium px-6 py-3 rounded-lg transition-colors shadow-sm">
            Try Pro Features
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
