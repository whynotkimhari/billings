"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreateBilling = () => {
  const [submitting, setSubmitting] = useState(false);
  const [billing, setBilling] = useState({
    date: undefined,
    items: [],
  });

  const createBilling = async (event) => {};
  return (
    <Form
      type="Create"
      billing={billing}
      setBilling={setBilling}
      submitting={submitting}
      handleSubmit={createBilling}
    />
  );
};

export default CreateBilling;
