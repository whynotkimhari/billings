"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";
import { dictionary } from "@utils/global";
import { useLanguage } from "@components/LanguageContext";

const CreateBilling = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [billings, setBillings] = useState([]);

  // Listen the change of language
  // Rerender when it happens
  const { language } = useLanguage();
  useEffect(() => {}, [language]);

  const createBillings = async (event) => {
    event.preventDefault();

    billings.forEach(async (billing) => {
      const date = new Date(billing.date);
      const body = {
        userID: session?.user.id,
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        itemID: billing.id,
        itemName: billing.itemName,
        itemPrice: billing.itemPrice,
        itemQuantity: billing.itemQuantity,
      };

      try {
        const rs = await fetch("api/billing/new", {
          method: "POST",
          body: JSON.stringify(body),
        });

        if (rs.ok) router.push("/");
      } catch (error) {
        console.log(error);
      }
    });
  };

  // Prevent unauthorized users from accessing
  if (session) {
    return (
      <Form
        billings={billings}
        setBillings={setBillings}
        handleSubmit={createBillings}
      />
    );
  } else {
    alert(dictionary[language].err_not_login);
    router.push("/");
  }
};

export default CreateBilling;
