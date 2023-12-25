"use client";

import { useState, useEffect } from "react";
import { MONTHS, LABELS } from "@utils/main_chart_tools";
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Legend,
  Title,
  Tooltip
);

const MainChart = ({ id }) => {
  const [year, setyear] = useState(0);
  useEffect(() => {
    const fetchBilling = async () => {
      const rs = await fetch("/api/billing/");
      let data = await rs.json();

      data = data.filter((item) => id == item.creator._id);

      // console.log("data after filter: ", data, id);

      data.forEach((item) => {
        const month = new Date(item.date).getMonth() + 1;
        setyear(new Date(item.date).getFullYear());

        MONTHS[month - 1].shopping_date.indexOf(item.date) === -1 && MONTHS[month - 1].shopping_date.push(item.date);
        MONTHS[month - 1].total += item.itemPrice * item.itemQuantity;
      });

      // console.log(MONTHS);
    };

    fetchBilling();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Your activity in ${year}`,
      },
    },
    scales: {
      "bar-y-axis": {
        type: "linear",
        position: "left",
      },
      "line-y-axis": {
        type: "linear",
        position: "right",
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const labels = LABELS;

  const data = {
    labels,
    datasets: [
      {
        label: "Shopping times in months",
        data: MONTHS.map((m) => m.shopping_date.length),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "line-y-axis",
        type: "line",
      },
      {
        label: "Total spending in months",
        data: MONTHS.map((m) => m.total),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "bar-y-axis",
        type: "bar",
      },
    ],
  };

  return <section><Line data={data} options={options} /></section>;
};

export default MainChart;
