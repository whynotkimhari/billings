"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreateBilling = () => {
  const router = useRouter()
  const {data: session} = useSession()
  let [billings, setBillings] = useState([])

  const createBillings = async (event) => {
    event.preventDefault()

    billings.forEach(async billing => {
      try {
        const rs = await fetch('api/billing/new', {
          method: 'POST',
          body: JSON.stringify({
            userEmail: session?.user.email,
            date: billing.date,
            itemID: billing.id,
            itemName: billing.itemName,
            itemPrice: billing.itemPrice,
            itemQuantity: billing.itemQuantity,
          })
        })

        if(rs.ok) {
          router.push('/')
        }
      } catch (error) {
        console.log(error)
      }
    })
  }
  return (
    <Form
      billings={billings}
      setBillings={setBillings}
      handleSubmit={createBillings}
    />
  );
};

export default CreateBilling;
