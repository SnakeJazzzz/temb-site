// app/admin/components/Header.tsx
'use client';

interface HeaderProps {
  role: string;
  onLogout: () => void;
}

/**
 * Header component for admin dashboard
 * Displays title, role badge, and logout button
 */
export default function Header({ role, onLogout }: HeaderProps) {
  const getRoleBadgeStyles = () => {
    if (role === 'admin') {
      return 'bg-green-900 text-green-400 border-green-800';
    }
    return 'bg-blue-900 text-blue-400 border-blue-800';
  };

  const getRoleDisplayName = () => {
    return role === 'admin' ? 'Admin' : 'Subadmin';
  };

  return (
    <header className="flex items-center justify-between mb-8 pb-6 border-b border-gray-800">
      <div className="flex items-center gap-4">
        <h1 className="text-4xl font-bold text-white">TEMB Admin</h1>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeStyles()}`}>
          {getRoleDisplayName()}
        </span>
      </div>

      <button
        onClick={onLogout}
        className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-900 border border-gray-700 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200"
      >
        Log Out
      </button>
    </header>
  );
}