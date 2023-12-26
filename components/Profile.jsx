import Card from "./Card";

const Profile = ({ name, desc, items }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="green_gradient">{name} profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="flex justify-around mt-4 flex-wrap">
        {Object.keys(items).map((year) => {
          return Object.keys(items[year]).map((month) => (
            <Card data={items[year][month]} year={year} month={month} />
          ));
        })}
      </div>
    </section>
  );
};

export default Profile;
