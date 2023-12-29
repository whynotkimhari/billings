"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Legend,
  Title,
  Tooltip,
  LineController,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  BarController,
  BarElement,
  CategoryScale,
  LineController,
  LinearScale,
  LineElement,
  PointElement,
  Legend,
  Title,
  Tooltip
);

import {
  getDataForChart,
  getOptions,
  getMonths,
  checkMONTHS,
} from "@utils/mainChartTools";
import { Menu } from "./Menu";
import { dictionary } from "@utils/global";
import { useLanguage } from "./LanguageContext";


const MainChart = ({ id }) => {
  const year = new Date().getFullYear();
  const [months, setMonths] = useState([]);

  useEffect(() => {
    const fetchBilling = async () => {
      if (!id) return;

      const result = await fetch(`/api/billing/user/${id}/year/${year}`).then(
        (response) => response.json()
      );

      setMonths(getMonths(result));
    };

    fetchBilling();
  }, [id]);

  const { language } = useLanguage();
  useEffect(() => { }, [language]);

  const checkMonth = checkMONTHS(months);
  const options = getOptions(dictionary[language].mainchart_title(id, year));
  const data = getDataForChart(months, checkMonth, id, language);

  return (
    <section>
      {!checkMonth && id && (
        <h1 className="my-10 text-xl font-extrabold text-center">
          {dictionary[language].err_no_activity}
        </h1>
      )}
      {checkMonth || !id ? <Line data={data} options={options} /> : <Menu />}
    </section>
  );
};

export default MainChart;
