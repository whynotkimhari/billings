"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useLanguage } from "./LanguageContext";
import { formatNumber } from "@utils/yearViewTools";
import { dictionary } from "@utils/global";

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

  const { language } = useLanguage();
  useEffect(() => {}, [language]);

  return (
    <div className="w-full sm:w-1/2 lg:w-1/4 mt-4 md:w-1/3">
      <h1 className="text-center sm:text-2xl text-xl font-bold">
        {dictionary[language].yearview_h1(month, year)}
      </h1>
      <ul className="text-center font-semibold">
        <li>{dictionary[language].yearview_li_1(shoppingTimes)}</li>
        <li>{dictionary[language].yearview_li_2(totalSpending)}</li>
        <li>
          {dictionary[language].yearview_li_3(
            formatNumber(Math.ceil(rate * totalSpending))
          )}
        </li>
        <li
          className="font-bold border border-black rounded-full p-1 cursor-pointer hover:bg-black hover:text-white transition-all inline-block"
          onClick={handleViewDetails}
        >
          {dictionary[language].yearview_li_4(month, year)}
        </li>
      </ul>
    </div>
  );
};

export default YearView;
