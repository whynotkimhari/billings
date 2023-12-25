import MainChart from "@components/MainChart";

const Home = () => {
  return (
    <div>
      <h1 className="head_text text-center">
        Billin'
        <br />
        <span className="orange_gradient text-center">
          {" "}
          Let's keep track of your billings
        </span>
      </h1>
      <MainChart />
    </div>
  );
};

export default Home;
