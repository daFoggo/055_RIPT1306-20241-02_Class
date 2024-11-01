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
      <div className="relative flex flex-col md:flex-row min-h-screen w-full">
        <div className="fixed md:relative w-full md:w-64 lg:w-72 z-50">
          <RootSidebar />
        </div>
        <main className="flex-grow overflow-x-hidden">
          <div className="max-w-7xl">
            <Outlet />
          </div>
          <Toaster
            toastOptions={{
              style: {
                color: "#752ceb",
              },
              className: "z-[1000]",
            }}
            position="top-center"
          />
        </main>

        <footer className="mt-auto py-4 px-6 border-t bg-background z-10"></footer>
      </div>
    </SidebarProvider>
  );
};

export default RootLayout;
