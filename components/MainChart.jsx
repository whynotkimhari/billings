"use client";

import { useState, useEffect } from "react";
import Billing from "@models/billing";

const MainChart = () => {
  useEffect(() => {
    const fetchBilling = async () => {
      const rs = await fetch("/api/billing/date/25");
      const data = await rs.json();

      console.log(data);
    };

    fetchBilling();
  }, []);

  return (
    <section>
      <h1>Your activity in this year</h1>
    </section>
  );
};

export default MainChart;
