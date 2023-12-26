"use client";

import { useEffect } from "react";
import { MONTHS, LABELS, checkMONTHS } from "@utils/main_chart_tools";
import faker from "faker";
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
import Link from "next/link";

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

const Sub = () => {
  return (
    <div className="flex justify-center flex-col">
      <Link href="/create-billing" className="sub_btn">
        Create a billing
      </Link>
      <Link href="/profile" className="sub_btn">
        View my profile
      </Link>
      <Link href="/fake-view" className="sub_btn">
        View fake data
      </Link>
    </div>
  );
};

const MainChart = ({ id }) => {
  const year = new Date().getFullYear();
  useEffect(() => {
    const fetchBilling = async () => {
      const rs = await fetch("/api/billing/");
      let data = await rs.json();

      data = data.filter(
        (item) =>
          id == item.creator._id && new Date(item.date).getFullYear() === year
      );

      data.forEach((item) => {
        const month = new Date(item.date).getMonth() + 1;
        setyear(new Date(item.date).getFullYear());

        MONTHS[month - 1].shopping_date.indexOf(item.date) === -1 &&
          MONTHS[month - 1].shopping_date.push(item.date);
        MONTHS[month - 1].total += item.itemPrice * item.itemQuantity;
      });
    };

    fetchBilling();
  }, []);

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

  const fakeDataset1 = MONTHS.map(() =>
    faker.datatype.number({ min: 0, max: 20, stepSize: 1 })
  );
  const fakeDataset2 = MONTHS.map(() =>
    faker.datatype.number({ min: 0, max: 50000, stepSize: 1 })
  );

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
      {checkMonth || !id ? <Line data={data} options={options} /> : <Sub />}
    </section>
  );
};

export default MainChart;
