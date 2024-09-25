import { CalendarHeart } from "lucide-react";
import { ItemProps } from "../types/Item";

const Item = ({ title, date, color, state }: ItemProps) => {
  return (
    <div>
      <div className="flex items-center gap-4">
        <input type="checkbox" className="rounded-full w-4 h-4" checked={state}/>
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold">{title}</h1>
          <div className={`flex gap-2 text-center text-sm text-${color ? `${color}-500` : ''}`}>
            <CalendarHeart />
            <p>{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
