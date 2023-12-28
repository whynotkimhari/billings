"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Profile from "@components/Profile";
import { groupData, minifyData } from "@utils/profileTools";
import { useRouter } from "next/navigation";

const MyProfile = () => {
  const { data: session } = useSession();
  const [items, setItems] = useState({});
  const router = useRouter()

  if(session === null) {
    alert("Please login first!")
    router.push('/')
  }

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
  }, [session?.user.id]);

  if(session !== null && session !== undefined) {
    return <Profile name={session?.user.name} items={items} userID={session?.user.id} />;
  }
};

export default MyProfile;
