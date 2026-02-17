// app/admin/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginForm from './components/LoginForm';

/**
 * Admin login page - server component
 * Checks if user is already authenticated and redirects to orders if so
 */
export default async function AdminLoginPage() {
  // Check if admin session cookie exists
  const cookieStore = await cookies();
  const adminSession = cookieStore.get('admin-session');

  // If authenticated, redirect to orders dashboard
  if (adminSession) {
    redirect('/admin/orders');
  }

  // Otherwise, show login form
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">TEMB Admin</h1>
          <p className="text-gray-400">Sign in to manage orders</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}