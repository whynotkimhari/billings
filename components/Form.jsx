"use client"

import Link from "next/link"
import { useState } from "react"
import { CURRENCY, initFormData, checkValidForm, getData, generateDiv, generateNextForm, resetFormUI } from "@utils/form_tools"

let isEdit = false
let editedID = -1
let currentIDnotEdited = 0

const Form = ({ billings, setBillings, handleSubmit }) => {
  const [formData, setFormData] = useState(initFormData)

  const handleAddButtonClick = () => {
    const currentFormData = !isEdit ? getData(formData.id) : getData(editedID)

    let currentBillings = billings
    // console.log(currentFormData, currentBillings)
    console.log("currentID: ", isEdit ? editedID : currentIDnotEdited)

    if (checkValidForm(currentFormData)) {
      // terminate date input
      document.getElementById("dateID").style.display = "none";
      document.getElementById("items-date").innerText = `Date: ${currentFormData.date}`

      // push data to memory
      currentBillings.push(currentFormData)
      // setBillings(billings)

      console.log("Registered Items after Adding: ", currentBillings)

      // push data to user view
      document.getElementById("items").innerHTML += generateDiv(currentFormData, CURRENCY)

      // add function for each item
      // + Delete
      // + Edit
      document.querySelectorAll('[id^="item-"]').forEach(item => {
        const handleDeleteButton = e => {
          console.log("currentID: ", isEdit ? editedID : currentIDnotEdited)
          
          currentBillings = currentBillings.filter(i => i.id !== Number(e.target.dataset.id))
          setBillings(currentBillings)
          document.getElementById(`item-${id}`).remove()

          console.log("Registered Items after Deleting: ", currentBillings)
        }

        const handleEditButton = e => {
          console.log("currentID: ", isEdit ? editedID : currentIDnotEdited)

          const id = Number(e.target.dataset.id)
          const editedItem = currentBillings.filter(i => i.id === id)[0]
          document.getElementById("nameID").value = editedItem.itemName
          document.getElementById("priceID").value = editedItem.itemPrice
          document.getElementById("quantityID").value = editedItem.itemQuantity
          isEdit = true
          editedID = id
          currentBillings = currentBillings.filter(i => i.id !== id)
          setBillings(currentBillings)
          document.getElementById(`item-${id}`).remove()

          console.log("Registered Items after taking item to Edit: ", currentBillings)
        }

        item.querySelector('.del-btn').addEventListener('click', handleDeleteButton)
        item.querySelector('.edit-btn').addEventListener('click', handleEditButton)
      })

      // prepare next form
      if(!isEdit) currentIDnotEdited++

      const nextFormData = generateNextForm(currentIDnotEdited, currentFormData.date)

      setFormData(nextFormData)
      setBillings(currentBillings)

      // Clear the form data for the next entry
      resetFormUI()
      
      // reset variable
      isEdit = false
      editedID = -1
      
    } else {
      // will use Sweet alert here later !
      alert("Please fill out all the box!")
    }
  };

  return (
    <section className="w-full md:flex block">
      <div className="w-full max-w-full flex-start flex-col mr-1">
        <h1 className="head_text text-left">
          <span className="blue_gradient">{isEdit ? "Edit" : "Create"} Billing</span>
        </h1>
        <p className="desc text-left max-w-md">
          Let's {isEdit ? "edit" : "create"} your{isEdit ? "" : " new"} billing
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        >
          <label>
            <span className="font-satoshi font-semibold text-base text-gray-700">
              Your Billing
            </span>
          </label>
          <label
            htmlFor="date"
            className="font-satoshi font-semibold text-base text-gray-700"
          >
            Date: {formData.date}
          </label>
          <input type="date" name="date" className="form_input" id="dateID" />
          <label
            htmlFor="itemName"
            className="font-satoshi font-semibold text-base text-gray-700"
          >
            Item name:
          </label>
          <input
            type="text"
            name="itemName"
            autoComplete="off"
            className="form_input"
            placeholder="Your item name here"
            id="nameID"
          />
          <label
            htmlFor="itemPrice"
            className="font-satoshi font-semibold text-base text-gray-700"
          >
            Item price:
          </label>
          <input
            type="number"
            name="itemPrice"
            autoComplete="off"
            className="form_input"
            placeholder="Please type the price"
            id="priceID"
            min="0"
          />
          <label
            htmlFor="itemQuantity"
            className="font-satoshi font-semibold text-base text-gray-700"
          >
            Item quantity:
          </label>
          <input
            type="number"
            name="itemQuantity"
            autoComplete="off"
            className="form_input"
            placeholder="Please type the quantity"
            id="quantityID"
            min="0"
          />
          <div className="flex justify-around">
            <input
              type="button"
              value="Add"
              className="form_btn"
              onClick={handleAddButtonClick}
            />
            <input type="submit" value="Save" className="form_btn" />
          </div>
        </form>
      </div>

      <div className="w-full max-w-full ml-1">
        <h1 className="head_text text-right">
          <span className="blue_gradient">Items</span>
        </h1>
        <p className="desc text-right max-w-md">See your registered items</p>
        <form
          id="items"
          className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
        >
          <label className="font-satoshi font-semibold text-base text-gray-700" id="items-date">
            Date:
          </label>
        </form>
      </div>
    </section>
  );
};

export default Form;
