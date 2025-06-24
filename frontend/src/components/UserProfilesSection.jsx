import React from 'react';
import { Users } from 'lucide-react';

const UserProfilesSection = ({ profiles }) => {
  return (
    <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
            <Users className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-base font-semibold text-gray-900">Beneficiary Profiles</h3>
        </div>
        <span className="text-sm text-gray-500">{profiles.length} active profiles</span>
      </div>

      {/* Profiles List */}
      <div className="space-y-3">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100 rounded-xl p-4 flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center shadow-sm">
              <Users className="w-4 h-4 text-white" />
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{profile.name}</h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-1">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                      Age: {profile.age}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-amber-400 rounded-full" />
                      {profile.condition}
                    </span>
                  </div>
                </div>

                <div className="mt-2 sm:mt-0">
                  <span className="inline-block bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    ID: {profile.id}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfilesSection;
