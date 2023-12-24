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

export const generateDiv = (formData, CURRENCY) => {
    return `
        <div class="flex justify-around" id="item-${formData.id}">
            <label class="font-satoshi font-semibold text-base text-gray-700 w-full flex rounded-lg outline-0">
            ${formData.itemName} : ${formData.itemPrice} x ${formData.itemQuantity} = ${formData.itemQuantity * formData.itemPrice} ${CURRENCY}
            </label>
            <span class="form_btn mr-1 edit-btn" data-id=${formData.id}>Edit</span>
            <span class="form_btn del-btn" data-id=${formData.id}>Delete</span>
        </div>
    `
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

export const resetFormUI = () => {
    document.getElementById("nameID").value = ""
    document.getElementById("priceID").value = ""
    document.getElementById("quantityID").value = ""
}