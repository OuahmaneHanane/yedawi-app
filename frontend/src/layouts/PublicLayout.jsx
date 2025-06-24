import React from 'react';

const PublicLayout = ({ children }) => {
  return (
    <div>
      {/* Public Navbar */}
      <header className="bg-white shadow-md p-4">
        <h1 className="text-lg font-bold text-emerald-600">Yedawi</h1>
      </header>

      {/* Page Content */}
      <main className="p-6">{children}</main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-12 py-6 border-t">
        &copy; {new Date().getFullYear()} Yedawi. All rights reserved.
      </footer>
    </div>
  );
};

export default PublicLayout;
