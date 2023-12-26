"use client";
import { toStr } from "@utils/card_tools";

const Card = ({ data, year, month }) => {
  const list = Object.values(data).flat(1);

  const shoppingTimes = list.length;
  const totalSpending = list.reduce(
    (sum, item) => sum + item.itemPrice * item.itemQuantity,
    0
  );

  return (
    <div className="w-1/4 mt-4">
      <h1 className="text-center text-2xl font-bold">
        {toStr(month)} {year}
      </h1>
      <ul className="text-center">
        <li>
          Shopping: <strong>{shoppingTimes}</strong> times
        </li>
        <li>
          Total spend: <strong>{totalSpending}</strong> forints
        </li>
        <li>
          Appr: <strong>{totalSpending}</strong> vnd
        </li>
      </ul>
    </div>
  );
};

export default Card;
