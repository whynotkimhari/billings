import { useEffect, useState } from "react";
import YearView from "./YearView";

const Profile = ({ name, desc, items, userID }) => {
  const [rate, setRate] = useState({});
  useEffect(() => {
    const fetchRate = async () => {
      const r = await fetch(
        "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/huf/vnd.json"
      )
      .then(rs => rs.json())
      .then(data => data.vnd)

      setRate(r);
    };

    fetchRate()
  }, []);

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="green_gradient">{name} profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="flex justify-around mt-4 flex-wrap">
        {Object.keys(items).map((year) => {
          return Object.keys(items[year]).map((month) => (
            <YearView
              data={items[year][month]}
              year={year}
              month={month}
              rate={rate}
              userID={userID}
            />
          ));
        })}
      </div>
    </section>
  );
};

export default Profile;
