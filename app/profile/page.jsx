"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Profile from "@components/Profile";
import { groupData, minifyData } from "@utils/profile_tools";

const MyProfile = () => {
  const { data: session } = useSession();
  const [items, setItems] = useState({});

  useEffect(() => {
    const fetchBilling = async () => {
      if (session?.user) {
        let data = await fetch(`/api/billing/user/${session?.user.id}`);
        data = await data.json();
        data = groupData(minifyData(data));
        setItems((prev) => ({ ...prev, ...data }));
      }
    };

    fetchBilling();
  }, [session?.user]);

  return (
    <Profile name="My" desc="Welcome to your profile page" items={items} />
  );
};

export default MyProfile;
