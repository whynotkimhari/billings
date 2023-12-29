"use client";

import { useState, useEffect } from "react";

import {
  CURRENCY,
  initFormData,
  checkValidForm,
  getData,
  generateDiv,
  generateNextForm,
  setFormUI,
  handleItemsDateChange,
  handleItemsBtnChange,
} from "@utils/formTools";
import { dictionary } from "@utils/global";
import { useLanguage } from "./LanguageContext";

// Track the status of each event happened on the page
let isEdit = false;
let editedID = -1;
let currentIDnotEdited = 0;

const Form = ({ billings, setBillings, handleSubmit }) => {
  const [formData, setFormData] = useState(initFormData);

  const { language } = useLanguage();

  useEffect(() => {
    handleItemsDateChange(formData.date, language);
    handleItemsBtnChange(language);
  }, [language]);

  const handleAddButtonClick = () => {
    const currentFormData = !isEdit ? getData(formData.id) : getData(editedID);

    let currentBillings = billings;
    console.log("currentID: ", isEdit ? editedID : currentIDnotEdited);

    if (checkValidForm(currentFormData)) {
      // terminate date input
      document.getElementById("dateID").style.display = "none";
      handleItemsDateChange(currentFormData.date, language);

      // push data to memory
      currentBillings.push(currentFormData);

      console.log("Registered Items after Adding: ", currentBillings);

      // push data to user view
      document.getElementById("items").innerHTML += generateDiv(
        currentFormData,
        CURRENCY,
        language
      );

      // add function for each item
      // + Delete
      // + Edit
      document.querySelectorAll('[id^="item-"]').forEach((item) => {
        const handleDeleteButton = (e) => {
          console.log("currentID: ", isEdit ? editedID : currentIDnotEdited);

          currentBillings = currentBillings.filter(
            (i) => i.id !== Number(e.target.dataset.id)
          );
          setBillings(currentBillings);

          document
            .getElementById(`item-${Number(e.target.dataset.id)}`)
            .remove();

          console.log("Registered Items after Deleting: ", currentBillings);
        };

        const handleEditButton = (e) => {
          console.log("currentID: ", isEdit ? editedID : currentIDnotEdited);

          const id = Number(e.target.dataset.id);
          const editedItem = currentBillings.filter((i) => i.id === id)[0];

          setFormUI(
            editedItem.itemName,
            editedItem.itemPrice,
            editedItem.itemQuantity
          );
          isEdit = true;
          editedID = id;
          currentBillings = currentBillings.filter((i) => i.id !== id);
          setBillings(currentBillings);
          document.getElementById(`item-${id}`).remove();

          console.log(
            "Registered Items after taking item to Edit: ",
            currentBillings
          );
        };

        item
          .querySelector(".del-btn")
          .addEventListener("click", handleDeleteButton);
        item
          .querySelector(".edit-btn")
          .addEventListener("click", handleEditButton);
      });

      // prepare next form
      if (!isEdit) currentIDnotEdited++;

      const nextFormData = generateNextForm(
        currentIDnotEdited,
        currentFormData.date
      );

      setFormData(nextFormData);
      setBillings(currentBillings);

      // Clear the form data for the next entry
      setFormUI();

      // reset variable
      isEdit = false;
      editedID = -1;
    } else {
      // will use Sweet alert here later !
      console.log("Please fill out all the box!");
    }
  };

  return (
    <section className="w-full md:flex block">
      <div className="w-full max-w-full flex-start flex-col mr-1">
        <h1 className="head_text text-left">
          <span className="blue_gradient">
            {dictionary[language].form_h1_1(isEdit)}
          </span>
        </h1>
        <p className="desc text-left max-w-md">
          {dictionary[language].form_p_1(isEdit)}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        >
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              {dictionary[language].form_main_label}
            </span>
          </label>
          <label
            htmlFor="date"
            className="font-satoshi font-semibold text-base text-gray-700"
          >
            {dictionary[language].form_date(formData.date)}
          </label>
          <input type="date" name="date" className="form_input" id="dateID" />
          <label
            htmlFor="itemName"
            className="font-satoshi font-semibold text-base text-gray-700"
          >
            {dictionary[language].form_item_name}
          </label>
          <input
            type="text"
            name="itemName"
            autoComplete="off"
            className="form_input"
            placeholder={dictionary[language].form_item_name_phd}
            id="nameID"
          />
          <label
            htmlFor="itemPrice"
            className="font-satoshi font-semibold text-base text-gray-700"
          >
            {dictionary[language].form_item_price}
          </label>
          <input
            type="number"
            name="itemPrice"
            autoComplete="off"
            className="form_input"
            placeholder={dictionary[language].form_item_price_phd}
            id="priceID"
            min="0"
          />
          <label
            htmlFor="itemQuantity"
            className="font-satoshi font-semibold text-base text-gray-700"
          >
            {dictionary[language].form_item_quantity}
          </label>
          <input
            type="number"
            name="itemQuantity"
            autoComplete="off"
            className="form_input"
            placeholder={dictionary[language].form_item_quantity_phd}
            id="quantityID"
            min="0"
          />
          <div className="flex justify-around">
            <input
              type="button"
              value={dictionary[language].form_add_btn}
              className="form_btn"
              onClick={handleAddButtonClick}
            />
            <input
              type="submit"
              value={dictionary[language].form_save_btn}
              className="form_btn"
            />
          </div>
        </form>
      </div>

      <div className="w-full max-w-full ml-1">
        <h1 className="head_text text-right">
          <span className="blue_gradient">
            {" "}
            {dictionary[language].form_h1_2}
          </span>
        </h1>
        <p className="desc text-right max-w-md">
          {" "}
          {dictionary[language].form_p_2}
        </p>
        <form
          id="items"
          className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        >
          <label
            className="font-satoshi font-semibold text-base text-gray-700"
            id="items-date"
          >
            {dictionary[language].form_date("")}
          </label>
        </form>
      </div>
    </section>
  );
};

export default Form;
