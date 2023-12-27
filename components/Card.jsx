import { toStr } from "@utils/card_tools";

const Card = ({ data, year, month, rate }) => {
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
        <li className="border border-black rounded-full mx-5 cursor-pointer hover:bg-black hover:text-white transition-all">
          View details in {toStr(month)} {year}
        </li>
      </ul>
    </div>
  );
};

export default Card;
