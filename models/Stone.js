import mongoose from 'mongoose';

const stoneSchema = new mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    author: {type: String, required: true},
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