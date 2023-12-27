import { toStr } from "@utils/yearViewTools";
import { useRouter } from "next/navigation";

const YearView = ({ data, year, month, rate, userID }) => {
  const list = Object.values(data).flat(1);

  const shoppingTimes = list.length;
  const totalSpending = list.reduce(
    (sum, item) => sum + item.itemPrice * item.itemQuantity,
    0
  );

  const router = useRouter();

  const handleViewDetails = () => {
    console.log(rate);
    router.push(
      `/detail-view?month=${month}&year=${year}&userID=${userID}&rate=${rate.toString()}`
    );
  };

  return (
    <div className="sm:w-1/2 lg:w-1/4 mt-4 md:w-1/3">
      <h1 className="text-center text-2xl font-bold">
        {toStr(month)} {year}
      </h1>
      <ul className="text-center">
        <li>
          Went shopping: <strong>{shoppingTimes}</strong> times
        </li>
        <li>
          Total spending is: <strong>{totalSpending}</strong> forints
        </li>
        <li>
          Approximately:{" "}
          <strong>{Math.ceil(rate * totalSpending).toLocaleString()}</strong>{" "}
          vnd
        </li>
        <li
          className="border border-black rounded-full mx-5 p-1 cursor-pointer hover:bg-black hover:text-white transition-all"
          onClick={handleViewDetails}
        >
          View details in {month}/{year}
        </li>
      </ul>
    </div>
  );
};

export default YearView;
