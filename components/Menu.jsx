import Link from "next/link";

export const Menu = () => {
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