"use client";

import { useEffect, useState } from "react";

import YearView from "./YearView";
import { dictionary } from "@utils/global";
import { useLanguage } from "./LanguageContext";

const Profile = ({ name, items, userID }) => {
  const [rate, setRate] = useState(0);

  const { language } = useLanguage();
  useEffect(() => {}, [language]);

  useEffect(() => {
    const fetchRate = async () => {
      const r = await fetch(
        "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/huf/vnd.min.json"
      )
        .then((rs) => rs.json())
        .then((data) => data.vnd);

      setRate(r);
    };

    fetchRate();
  }, [rate]);

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="orange_gradient">
          {dictionary[language].profile_h1(name)}
        </span>
      </h1>
      <h2 className="text-left sm:text-2xl text-xl font-bold text-red-500">
        {dictionary[language].profile_h2(rate)}
      </h2>

      <div className="flex justify-around mt-4 flex-wrap">
        {Object.keys(items).map((year) => {
          return Object.keys(items[year]).map((month) => (
            <YearView
              data={items[year][month]}
              year={year}
              month={month}
              rate={rate}
              userID={userID}
            />
          ));
        })}
      </div>
    </section>
  );
};

export default Profile;
