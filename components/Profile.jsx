"use client";

import { useEffect, useState } from "react";
import YearView from "./YearView";

const Profile = ({ name, items, userID }) => {
  const [rate, setRate] = useState(0);
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
        <span className="orange_gradient">{name}'s profile</span>
      </h1>
      <h2 className="text-left sm:text-2xl text-xl font-bold text-red-500">
        Today rate: 1 forint = {rate} vnd
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
