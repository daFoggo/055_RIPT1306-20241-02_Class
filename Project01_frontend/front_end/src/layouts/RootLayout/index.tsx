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
      <div className="flex flex-col md:flex-row min-h-screen w-full">
        <RootSidebar />
        <main className="flex-grow w-full p-6">
          <div className="w-full">
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
