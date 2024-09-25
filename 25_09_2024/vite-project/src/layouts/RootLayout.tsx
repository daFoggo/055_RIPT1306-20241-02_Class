import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
const RootLayout = () => {
  return (
    <div className="bg-base">
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
