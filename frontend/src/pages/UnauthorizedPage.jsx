import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-lg mx-auto border border-green-100 font-sans">
        {/* Icon */}
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-3 font-sans">
          Access <span className="text-green-600">Restricted</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-gray-600 mb-8 leading-relaxed font-sans">
          You don't have permission to view this page. 
          <br />
          Please contact your administrator for access.
        </p>
        
        {/* Action Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl font-sans"
          >
            ← Go Back
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-8 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;