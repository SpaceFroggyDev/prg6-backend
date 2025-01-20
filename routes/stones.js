import express from 'express';
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
        const {name, img_url, category, hardness, diaphaneity, description} = req.body;
        const stone = await Stone.create({
            name: name,
            img_url: img_url,
            category: category,
            hardness: hardness,
            diaphaneity: diaphaneity,
            description: description,
        });
        
        res.status(201).json(stone);

    } catch (error) {
        res.status(400).res.json({error: error.message});
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
