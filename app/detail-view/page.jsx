"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Legend,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Legend,
  Title,
  Tooltip
);

import { minifyData, groupBy } from "@utils/profileTools";
import { formatNumber } from "@utils/yearViewTools";
import MonthView from "@components/MonthView";
import { getDataForChart } from "@utils/monthViewTools";
import { getOptions } from "@utils/mainChartTools";
import { Line } from "react-chartjs-2";
import { dictionary } from "@utils/global";
import { useLanguage } from "@components/LanguageContext";

const DetailView = () => {
  const searchParams = useSearchParams();
  const month = searchParams.get("month");
  const year = searchParams.get("year");
  const userID = searchParams.get("userID");
  const rate = Number(searchParams.get("rate"));
  const totalSpending = Number(searchParams.get("total"));
  const router = useRouter();

  const { language } = useLanguage();
  useEffect(() => {}, [language]);

  // Prevent unauthorized users from accessing
  if (!(month && year && userID && rate && totalSpending)) {
    console.log(dictionary[language].err_not_login, "detail-view");
    router.push("/");
  } else {
    const [billing, setBilling] = useState({});

    useEffect(() => {
      const getDetailView = async () => {
        let data = await fetch(
          `/api/billing/user/${userID}/month/${month}/year/${year}`
        )
        .then(rs => rs.json())

        data = minifyData(data, { getMonth: false, getYear: false });
        data = groupBy(data, "day");

        setBilling(data);
      };

      getDetailView();
    }, []);

    const options = getOptions();
    const data = getDataForChart(billing, month, year, language);

    return (
      <section className="w-full">
        <div>
          <h1 className="text-center head_text">
            {dictionary[language].detailview_h1(month, year)}
          </h1>
          <h2 className="text-center sm:text-2xl text-xl font-bold mt-1 text-red-500">
            {dictionary[language].detailview_h2(
              formatNumber(totalSpending),
              formatNumber(Math.ceil(rate * totalSpending))
            )}
          </h2>
          <h2 className="text-center sm:text-2xl text-xl font-bold text-red-500">
            {dictionary[language].profile_h2(rate)}
          </h2>
        </div>
        <div className="flex justify-center mt-4 flex-wrap">
          {Object.keys(billing).map((day) => (
            <MonthView
              day={day}
              month={month}
              year={year}
              data={billing[day]}
              rate={rate}
            />
          ))}
        </div>
        <div className="w-full sm:w-3/4 mx-auto mb-4">
          <Line data={data} options={options} />
        </div>
      </section>
    );
  }
};

export default DetailView;
