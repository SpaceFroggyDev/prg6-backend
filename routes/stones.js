import express from 'express';
import {faker} from "@faker-js/faker";
import Stone from "../models/Stone.js";

const router = express.Router()

router.get('/', async (req , res) => {
    try {
        const stones = await Stone.find({});

        const collection = {
            "items": stones,
            "_links": {
                "self": {
                    "href": process.env.BASE_URL + `/stones`
                },
                "collection": {
                    "href": process.env.BASE_URL + `/stones`
                }
            }
        }

        res.json(collection);

    } catch (error) {
        res.json({error: error.message});
    }
});

// CREATE
router.post('/', async (req, res) => {
    try {
        const {title, body, author} = req.body;
        const stone = await Stone.create({
            title: title,
            body: body,
            author: author,
        });
        
        res.status(201).res.json(stone);

    } catch (error) {
        res.status(400).res.json({error: error.message});
    }

    res.json({success: true})
});

// CREATE -> FAKER
router.post('/seed', async (req, res) => {
    try {
        const amount = req.body.amount;

        for(let i = 0; i < amount; i++) {
            await Stone.create({
                title: faker.lorem.lines(1),
                body: faker.lorem.lines(),
                author: faker.person.fullName(),
            });
        }

    } catch (error) {
        res.json({error: error.message});
    }

    res.json({success: true})
});

// DETAILS
router.get('/:id', async (req , res) => {
    const stoneId = req.params.id;

    try {
        const stones = await Stone.find({_id:stoneId})
        res.json(stones);
    } catch (error) {
        res.json({error: error.message});
    }
});

// DELETE -> not sure if this works yet
router.delete('/:id', async (req, res) => {
    const stoneId = req.params.id;

    try {
        const stones = await Stone.findByIdAndDelete({_id:stoneId})
        res.status(410);
    } catch (error) {
        res.json({error: error.message});
    }
})

// EDIT / PUT (To Be Added)

// OPTIONS
router.options('/:id', async (req , res) => {
    res.setHeader('Allow', 'GET, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Methods', ['GET','PUT','DELETE'])
    res.send()
});

export default router
