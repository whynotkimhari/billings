"use client";

import MainChart from "@components/MainChart";

const FakeView = () => {
  return (
    <section>
      <h1 className="head_text text-center">
        Billin'
        <br />
        <span className="orange_gradient text-center">
          {" "}
          Let's keep track of your billings
        </span>
      </h1>
      <MainChart id={undefined} />
    </section>
  );
};

export default FakeView;
