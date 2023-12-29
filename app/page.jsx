"use client";

import MainChart from "@components/MainChart";
import { useSession } from "next-auth/react";

const Home = () => {
  const ss = useSession();

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
      <div className="w-4/5 block my-0 mx-auto">
        <MainChart id={ss.data?.user?.id} />
      </div>
    </section>
  );
};

export default Home;
