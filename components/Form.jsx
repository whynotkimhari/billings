import Link from "next/link";
import { useState } from "react";

const CURRENCY = "HUF";
let isEdit = false;
let editedID = -1;
let currentIDnotEdited = 0

const Form = ({ type, billing, setBilling, submitting, handleSubmit }) => {
  let [formData, setFormData] = useState({
    id: 0,
    date: "",
    itemName: "",
    itemPrice: 0,
    itemQuantity: 0,
  });

  let [registeredItems, setRegisteredItems] = useState([]);

  const getData = (id) => {
    return {
      id: id,
      date: document.getElementById("dateID").value,
      itemName: document.getElementById("nameID").value,
      itemPrice: Number(document.getElementById("priceID").value),
      itemQuantity: Number(document.getElementById("quantityID").value),
    };
  };

  const checkValidForm = (form) =>
    form.date && form.itemName && Number(form.itemPrice) >= 0 && Number(form.itemQuantity) >= 0;

  const handleAddButtonClick = () => {

    console.log(document.getElementById("isEdited").value, currentIDnotEdited)

    // console.log(document.getElementById("isEdited").value)
    formData = document.getElementById("isEdited").value === "false" ? getData(formData.id) : getData(Number(document.getElementById("editedID").value))
    // Add the current form data to the list of registered items

    if (checkValidForm(formData)) {
      document.getElementById("dateID").style.display = "none";
      document.getElementById("items-date").innerText = `Date: ${formData.date}`

      registeredItems.push(formData)
      setRegisteredItems(registeredItems)

      console.log("Registered Items after Adding: ", registeredItems)

      // Add to the registered view
      document.getElementById("items").innerHTML += `
        <div class="flex justify-around" id="item-${formData.id}">
          <label class="font-satoshi font-semibold text-base text-gray-700 w-full flex rounded-lg outline-0">
            ${formData.itemName} : ${formData.itemPrice} x ${formData.itemQuantity} = ${formData.itemQuantity * formData.itemPrice} ${CURRENCY}
          </label>
          <span class="form_btn mr-1 edit-btn" data-id=${formData.id}>Edit</span>
          <span class="form_btn del-btn" data-id=${formData.id}>Delete</span>
        </div>
      `

      document.querySelectorAll('[id^="item-"]').forEach(item => {
        const handleDeleteButton = e => {
          const id = Number(e.target.dataset.id)
          registeredItems = registeredItems.filter(i => i.id !== id)
          setRegisteredItems(registeredItems)

          console.log("Registered Items after Deleting: ", registeredItems)
          document.getElementById(`item-${id}`).remove()
        }

        const handleEditButton = e => {
          const id = Number(e.target.dataset.id)

          const editedItem = registeredItems.filter(i => i.id === id)[0]

          document.getElementById("nameID").value = editedItem.itemName
          document.getElementById("priceID").value = editedItem.itemPrice
          document.getElementById("quantityID").value = editedItem.itemQuantity
          
          isEdit = true
          editedID = id

          registeredItems = registeredItems.filter(i => i.id !== id)
          setRegisteredItems(registeredItems)
          console.log("Registered Items after taking item to Edit: ", registeredItems)
          document.getElementById(`item-${id}`).remove()
        }

        item.querySelector('.del-btn').addEventListener('click', handleDeleteButton)
        item.querySelector('.edit-btn').addEventListener('click', handleEditButton)
      })

      // Clear the form data for the next entry
      if(!isEdit) currentIDnotEdited++

      const nextFormData = {
        id: currentIDnotEdited,
        date: formData.date,
        itemName: "",
        itemPrice: 0,
        itemQuantity: 0,
      }
      setFormData(nextFormData)

      // reset

      document.getElementById("nameID").value = ""
      document.getElementById("priceID").value = ""
      document.getElementById("quantityID").value = ""


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
          <span className="blue_gradient">{type} Billing</span>
        </h1>
        <p className="desc text-left max-w-md">
          Let's {type.toLowerCase()} your new billing
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
          <input type="text" value={isEdit} hidden id="isEdited" />
          <input type="text" value={editedID} hidden id="editedID" />
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
            required
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
            required
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
            required
          />
          <div className="flex justify-around">
            <input
              type="button"
              value="Add"
              className="form_btn"
              onClick={handleAddButtonClick}
            />
            <input type="button" value="Save" className="form_btn" />
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
