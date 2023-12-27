"use client";

import { useEffect } from "react";
import {
  MONTHS,
  LABELS,
  checkMONTHS,
  getFakeData,
} from "@utils/mainChartTools";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Menu } from "./Menu";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Legend,
  Title,
  Tooltip
);

const MainChart = ({ id }) => {
  const year = new Date().getFullYear();

  id &&
    useEffect(() => {
      const fetchBilling = async () => {
        const data = await fetch(`/api/billing/user/${id}/year/${year}`).then(
          (response) => response.json()
        );

        data.forEach((item) => {
          MONTHS[item.month - 1].shopping_date.indexOf(item.day) === -1 &&
            MONTHS[item.month - 1].shopping_date.push(item.day);
          MONTHS[item.month - 1].total += item.itemPrice * item.itemQuantity;
        });
      };

      fetchBilling();
    });

  const checkMonth = checkMONTHS(MONTHS);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: id ? `Your activity in ${year}` : "THIS IS A FAKE DATA!",
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

  const dataset1 = MONTHS.map((m) => m.shopping_date.length);
  const dataset2 = MONTHS.map((m) => m.total);

  const [fakeDataset1, fakeDataset2] = getFakeData();

  const data = {
    labels: LABELS,
    datasets: [
      {
        label: "Shopping times",
        data: checkMonth ? dataset1 : !id ? fakeDataset1 : [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "line-y-axis",
        type: "line",
      },
      {
        label: "Total spending (HUF)",
        data: checkMonth ? dataset2 : !id ? fakeDataset2 : [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "bar-y-axis",
        type: "bar",
      },
    ],
  };

  return (
    <section>
      {!checkMonth && id && (
        <h1 className="my-10 text-xl font-extrabold text-center">
          You do not have any activity yet
        </h1>
      )}
      {checkMonth || !id ? <Line data={data} options={options} /> : <Menu />}
    </section>
  );
};

export default MainChart;
