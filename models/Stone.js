import mongoose from 'mongoose';

const stoneSchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},

}, {toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {

            ret._links = {
                self: {
                    href: process.env.BASE_URL + `/stones/${ret._id}`
                },
                collection: {
                    href: process.env.BASE_URL + `/stones`
                }
            }

            delete ret._id
        }
    }});

const Stone = mongoose.model('Stone', stoneSchema);

export default Stone;