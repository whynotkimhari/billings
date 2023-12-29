import { dictionary } from "./global"

export const CURRENCY = "HUF"
export const initFormData = {
    id: 0,
    date: "",
    itemName: "",
    itemPrice: 0,
    itemQuantity: 0
}

export const checkValidForm = form =>
    form.date && form.itemName && Number(form.itemPrice) >= 0 && Number(form.itemQuantity) >= 0

export const getData = id => {
    return {
        id: id,
        date: document.getElementById("dateID").value,
        itemName: document.getElementById("nameID").value,
        itemPrice: Number(document.getElementById("priceID").value),
        itemQuantity: Number(document.getElementById("quantityID").value),
    }
}

export const generateDiv = (formData, CURRENCY, language) => {
    return `
        <div class="flex justify-around" id="item-${formData.id}">
            <label class="font-satoshi font-semibold text-base text-gray-700 w-full flex rounded-lg outline-0">
            ${formData.itemName} : ${formData.itemPrice} x ${formData.itemQuantity} = ${formData.itemQuantity * formData.itemPrice} ${CURRENCY}
            </label>
            <span class="form_btn mr-1 edit-btn" data-id=${formData.id} id="edit-btn-${formData.id}">${dictionary[language].form_edit_btn}</span>
            <span class="form_btn del-btn" data-id=${formData.id} id="del-btn-${formData.id}">${dictionary[language].form_delete_btn}</span>
        </div>
    `
}

export const handleItemsDateChange = (date, language) => document.getElementById("items-date").innerText = dictionary[language].form_date(date)
export const handleItemsBtnChange = (language) => {
    document.querySelectorAll(`[id^="edit-btn-"]`).forEach(item => item.innerHTML = dictionary[language].form_edit_btn)
    document.querySelectorAll(`[id^="del-btn-"]`).forEach(item => item.innerHTML = dictionary[language].form_delete_btn)
}

export const generateNextForm = (currentIDnotEdited, date) => {
    return {
        id: currentIDnotEdited,
        date: date,
        itemName: "",
        itemPrice: 0,
        itemQuantity: 0
    }
}

export const setFormUI = (name = "", price = "", quantity = "") => {
    document.getElementById("nameID").value = name
    document.getElementById("priceID").value = price
    document.getElementById("quantityID").value = quantity
}