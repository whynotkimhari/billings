"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { minifyData, groupBy } from "@utils/profileTools";
import MonthView from "@components/MonthView";

const DetailView = () => {
  const searchParams = useSearchParams();
  const month = searchParams.get("month");
  const year = searchParams.get("year");
  const userID = searchParams.get("userID");
  const rate = searchParams.get("rate");

  const [billing, setBilling] = useState({});

  // console.log(month, year, userID, rate);

  useEffect(() => {
    const getDetailView = async () => {
      const response = await fetch(
        `/api/billing/user/${userID}/month/${month}/year/${year}`
      );
      let data = await response.json();

      data = minifyData(data, { getMonth: false, getYear: false });
      data = groupBy(data, "day");

      setBilling(data);
    };

    if (userID) getDetailView();
  }, [userID]);

  console.log(billing);
  return (
    <div className="sm:w-1/2 lg:w-1/4 mt-4 md:w-1/3">
      {Object.keys(billing).map((day) => (
        <MonthView data={billing[day]} rate={rate} />
      ))}
    </div>
  );
};

export default DetailView;
