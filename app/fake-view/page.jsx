"use client";

import MainChart from "@components/MainChart";

const FakeView = () => {
  return (
    <section className="flex justify-center flex-col">
      <h1 className="head_text text-center">
        Billin'
        <br />
        <span className="orange_gradient text-center">
          {" "}
          Let's keep track of your billings
        </span>
      </h1>
      <div className="w-4/5 block my-0 mx-auto">
        <MainChart id={undefined} />
      </div>
    </section>
  );
};

export default FakeView;
