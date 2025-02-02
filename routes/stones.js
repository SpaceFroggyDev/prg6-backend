import express from 'express';
import Stone from "../models/Stone.js";

const router = express.Router()

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

// CREATE
// router.post('/', async (req, res) => {
//     try {
//         const {name, type, description} = req.body;
//         const stone = await Stone.create({
//             name: name,
//             type: type,
//             description: description,
//         });
//         res.header('Access-Control-Allow-Origin', '*');
//         res.header('Access-Control-Allow-Headers', '*');
//         res.status(201).json(stone);
//
//     } catch (error) {
//         res.status(400).res.json({error: error.message});
//     }
//
//     res.json({success: true})
// });

router.post('/', async (req, res) => {
    try {
        await Stone.create({
            name: req.body.name,
            type: req.body.type,
            description: req.body.description,
        });
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        res.status(201).json({message: "Created :D"});
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message});
    }
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

// DELETE
router.delete('/:id', async (req, res) => {
    const stoneId = req.params.id;

    try {
        const stones = await Stone.findByIdAndDelete({_id:stoneId})
        res.status(410);
    } catch (error) {
        res.json({error: error.message});
    }
})

// EDIT / PUT
router.put('/:id', async (req, res) => {
    try {
        const stone = await Stone.findOne({_id: req.params.id})

        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        if (!req.body.name || !req.body.type || !req.body.description) {
            return res.status(400).json({ message: "Required fields missing" });
        } else {
            await Stone.findByIdAndUpdate(
                stone.id,
                {
                    name: req.body.name,
                    type: req.body.type,
                    description: req.body.description,
                });
            await res.status(201).json({message: "Stone has been edited"});
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message});
    }
});

// OPTIONS
router.options('/:id', async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        res.header('ALLOW', 'GET, PUT, PATCH, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Methods', '*');
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.json({error: error.message})
    }
});

router.options('/', async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', '*');
        res.header('ALLOW', 'GET, POST, OPTIONS');
        res.header('Access-Control-Allow-Methods', '*');
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.json({error: error.message})
    }
});

export default router
