import express from 'express';
import Stone from "../models/Stone.js";

const router = express.Router();

router.get('/', async (req , res) => {
    try {
        const stones = await Stone.find();
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
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

// POST
router.post('/', async (req, res) => {
    try {
        const {name, category, description} = req.body;
        const stone = await Stone.create({
            name: name,
            category: category,
            description: description,
        });
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        res.status(201).json(stone);

    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// DETAILS
router.get('/:id', async (req , res) => {
    const stoneId = req.params.id;

    try {
        const stone = await Stone.findOne({_id:stoneId})
        if (!stone) {
            return res.status(404).json({ message: "Stone does not exist!" });
        }
        res.json(stone);
    } catch (error) {
        res.json({error: error.message});
    }
});

//DELETE
router.delete('/:id', async (req, res) => {
    const stoneId = req.params.id;

    try {
        const stone = await Stone.findByIdAndDelete({_id: stoneId});
        if (!stone) {
            return res.status(404).json({ message: "Stone does not exist!" });
        }
        res.status(204).json({message: "Stone has been deleted"});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

// EDIT / PUT
router.put('/:id', async (req, res) => {
    try {
        const stone = await Stone.findOne({_id: req.params.id})

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        if (!req.body.name || !req.body.category || !req.body.description) {
            return res.status(400).json({ message: "Required fields missing" });
        } else {
            await Stone.findByIdAndUpdate(
                stone.id,
                {
                    name: req.body.name,
                    category: req.body.category,
                    description: req.body.description,
                });
            await res.status(201).json({message: "Stone has been edited"});
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message});
    }
});

router.options('/', (req, res) => {
    res.setHeader("Allow", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.status(204).send();
})

router.options('/:id', (req, res) => {
    res.setHeader("Allow", "GET,PUT,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,DELETE,OPTIONS");
    res.status(204).send();
});

export default router
