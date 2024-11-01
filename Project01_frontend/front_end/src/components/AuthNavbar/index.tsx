import { useEffect, useState } from "react";
import { ListTodo } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";

const AuthNavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 flex justify-between items-center w-full border-b shadow-sm">
      <div className="">
        <Button
          variant="ghost"
          className="text-2xl font-semibold font-clash hover:scale-105 transition-transform"
          icon={<ListTodo className="h-6 w-6" />}
          onClick={() => navigate("/")}
        >
          My Todowo
        </Button>
      </div>

      <div className="font-semibold">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default AuthNavBar;
