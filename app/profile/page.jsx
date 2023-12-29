"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { dictionary } from "@utils/global";
import { useLanguage } from "@components/LanguageContext";
import { groupData, minifyData } from "@utils/profileTools";
import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [items, setItems] = useState({});
  const router = useRouter();

  const { language } = useLanguage();
  useEffect(() => {}, [language]);

  // Prevent unauthorized users from accessing
  if (session === null) {
    console.log(dictionary[language].err_not_login, "profile");
    router.push("/");
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

  // Prevent unauthorized users from accessing
  if (session !== null && session !== undefined) {
    return (
      <Profile
        name={session?.user.name}
        items={items}
        userID={session?.user.id}
      />
    );
  }
};

export default MyProfile;
