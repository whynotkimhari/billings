import Link from "next/link";
import { useEffect } from "react";

import { dictionary } from "@utils/global";
import { useLanguage } from "./LanguageContext";

export const Menu = () => {

  const { language } = useLanguage();
  useEffect(() => {}, [language]);

  return (
    <div className="flex justify-center flex-col">
      <Link href="/fake-view" className="sub_btn">
        {dictionary[language].nav_link_1}
      </Link>
      <Link href="/profile" className="sub_btn">
        {dictionary[language].nav_link_2}
      </Link>
      <Link href="/create-billing" className="sub_btn">
        {dictionary[language].nav_link_3}
      </Link>
    </div>
  );
};
