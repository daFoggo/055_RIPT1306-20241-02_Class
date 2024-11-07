import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Toaster } from "@/components/ui/sonner";
import AuthNavBar from "@/components/AuthNavbar";

const AuthLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/auth" || location.pathname === "/auth/") {
      navigate("/auth/login");
    }
  }, [location, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="w-full">
        <AuthNavBar />
      </nav>
      <main className="p-6 flex-grow  ">
        <Outlet />
        <Toaster
          toastOptions={{
          }}
          position="top-center"
        />
      </main>
      <footer className="z-10">{/* Footer content */}</footer>
    </div>
  );
};

export default AuthLayout;
