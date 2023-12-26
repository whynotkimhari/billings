import { Schema, model, models } from 'mongoose';

const BillingSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    day: {
        type: Number,
        required: [true, 'day is required']
    },
    month: {
        type: Number,
        required: [true, 'month is required']
    },
    year: {
        type: Number,
        required: [true, 'year is required']
    },
    itemID: {
        type: Number,
        required: [true, 'itemID is required']
    },
    itemName: {
        type: String,
        required: [true, 'itemName is required']
    },
    itemPrice: {
        type: Number,
        required: [true, 'itemPrice is required']
    },
    itemQuantity: {
        type: Number,
        required: [true, 'itemQuantity is required']
    }
})

const Billing = models?.Billing || model('Billing', BillingSchema)

export default Billing