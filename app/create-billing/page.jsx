"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";
import { dictionary, language } from "@utils/global";

const CreateBilling = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [billings, setBillings] = useState([]);

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

  if (session !== null) {
    return (
      <Form
        billings={billings}
        setBillings={setBillings}
        handleSubmit={createBillings}
      />
    );
  }

  else {
    alert(dictionary[language].err_empty_field)
    router.push('/')
  }
};

export default CreateBilling;
