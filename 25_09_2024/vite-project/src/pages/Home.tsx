import { Plus } from "lucide-react";
import Item from "../components/Item";
import { useState } from "react";

const Home = () => {
  const [todoData, setTodoData] = useState([
    {
      title: "Học lập trình web với React",
      date: "Tomorrow",
      color: "orange",
      state: true,
    },
    {
      title: "Gửi email nộp bài tập về nhà",
      date: "Saturday",
      color: "lavender",
      state: false,
    },
    {
      title: "Học từ vựng tiếng anh mỗi ngày",
      date: "Monday",
      color: "lavender",
      state: true,
    },
    {
      title: "Viết tiểu luận môn triết học",
      date: "Today",
      color: "green",
      state: false,
    },
  ]);

  const toggleItemState = (index: number) => {
    setTodoData(prevData => prevData.map((item, i) => 
      i === index ? { ...item, state: !item.state } : item
    ));
  };

  return (
    <div className="flex flex-col gap-6 min-h-screen bg-base p-4">
      <h1 className="font-bold text-3xl">My work</h1>
      <div className="flex flex-col gap-6">
        {todoData.map((item, index) => (
          <Item
            key={index}
            title={item.title}
            date={item.date}
            color={item.color}
            state={item.state}
            onToggle={() => toggleItemState(index)}
          />
        ))}
      </div>
      <button className="flex items-center gap-2 w-fit bg-white rounded-md p-2 text-slate-900 font-semibold hover:bg-white/90 hover:scale-105 transition-all">
        <Plus />
        Add task
      </button>
    </div>
  );
};

export default Home;
