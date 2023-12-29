"use client";

import { useEffect } from "react";

import { formatNumber } from "@utils/yearViewTools";
import { dictionary } from "@utils/global";
import { useLanguage } from "./LanguageContext";

const MonthView = ({ day, month, year, data, rate }) => {
  const { language } = useLanguage();
  useEffect(() => {}, [language]);

  const sumDay = data.reduce(
    (sum, item) => sum + item.itemPrice * item.itemQuantity,
    0
  );
  return (
    <div className="w-full md:w-1/2 xl:w-1/4 lg:w-1/3 border border-black py-2 m-1 bg-cyan-50">
      <h3 className="text-center font-semibold">
        {day}/{month}/{year}
      </h3>
      <ul className="text-center font-semibold">
        {data.map((item) => {
          return (
            <li>
              <span className="text-red-500">{item.itemName}</span>:{" "}
              {item.itemPrice} x {item.itemQuantity} ={" "}
              <span className="text-green-500">
                {item.itemPrice * item.itemQuantity}
              </span>
            </li>
          );
        })}
        <li className="font-bold">
          {dictionary[language].monthview_li_1(formatNumber(sumDay))}
        </li>
        <li className="font-bold">
          {dictionary[language].monthview_li_2(
            formatNumber(Math.ceil(sumDay * rate))
          )}
        </li>
      </ul>
    </div>
  );
};

export default MonthView;
