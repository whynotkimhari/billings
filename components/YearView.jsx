"use client"

import { toStr, formatNumber } from "@utils/yearViewTools";
import { useRouter } from "next/navigation";

const YearView = ({ data, year, month, rate, userID }) => {
  const list = Object.values(data).flat(1);

  const shoppingTimes = Object.values(data).length;
  const totalSpending = list.reduce(
    (sum, item) => sum + item.itemPrice * item.itemQuantity,
    0
  );

  const router = useRouter();

  const handleViewDetails = () => {
    router.push(
      `/detail-view?month=${month}&year=${year}&userID=${userID}&rate=${rate}&total=${totalSpending}`
    );
  };

  return (
    <div className="w-full sm:w-1/2 lg:w-1/4 mt-4 md:w-1/3">
      <h1 className="text-center sm:text-2xl text-xl font-bold">
        {toStr(month)} {year}
      </h1>
      <ul className="text-center">
        <li>
          Went shopping: <strong>{shoppingTimes}</strong> times
        </li>
        <li>
          Total spending is: <strong>{totalSpending}</strong> forint
        </li>
        <li>
          Approximately:{" "}
          <strong>{formatNumber(Math.ceil(rate * totalSpending))}</strong>{" "}
          vnd
        </li>
        <li
          className="border border-black rounded-full p-1 cursor-pointer hover:bg-black hover:text-white transition-all inline-block"
          onClick={handleViewDetails}
        >
          View details in {month}/{year}
        </li>
      </ul>
    </div>
  );
};

export default YearView;
