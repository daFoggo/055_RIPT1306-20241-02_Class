import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import RootSidebar from "@/components/RootSidebar";

import { isTokenValid } from "@/utils/Helper/common";

const RootLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
  }, [navigate]);

  const checkToken = async () => {
    const token = localStorage.getItem("token");
    const tokenCheck = await isTokenValid(token);
    if (tokenCheck.success) {
      navigate("/dashboard");
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen min-w-full">
        <RootSidebar />
        <div className="flex flex-col flex-grow">
          <main className="flex-grow p-6">
            <Outlet />
            <Toaster
              toastOptions={{
                style: {
                  color: "#752ceb",
                },
              }}
              position="top-center"
            />
          </main>
          <footer className="z-10">{/* Footer content */}</footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default RootLayout;
