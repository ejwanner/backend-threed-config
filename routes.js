const express = require('express');
const boxModel = require("./models/box.model");
const router = express.Router();

// post route for add geometries ( only with postman)
router.post('/add_geometry', async (req, res) => {
    const newBox = new boxModel(req.body);

    try {
        await newBox.save();
        res.status(200).json({geometries: newBox});
    } catch (err) {
        res.status(500).send(err);
    }
});

// endpoint to get all the entries in the db
router.get('/box_geometries', async (req, res) => {
    const box_geometries = await boxModel.find();

    try {
        res.send(box_geometries);
        return box_geometries;
    } catch (err) {
        res.status(500).send(err);
    }
})

// endpoint to get one specific box from the database
router.get('/one_box/:boxId', async (req, res) => {
    const boxId = req.params.boxId;
    try {
        const box = await boxModel.findById(boxId);
        res.send(box);
        return box;
    } catch (err) {
        res.status(500).send(err);
    }
})

// endpoint to update the color of one box in the database
router.post('/update_one_box/:boxId/:boxColor', async (req, res) => {
    const boxId = req.params.boxId;
    const boxColor = req.params.boxColor;
    const box = await boxModel.findById(boxId);
    const newBox = new boxModel({
        _id: boxId,
        name: box.name,
        height: box.height,
        width: box.width,
        depth: box.depth,
        color: '#' + boxColor
    })
    try {
        const box = await boxModel.updateOne({_id:boxId}, newBox);
        res.send(box);
        return box;
    } catch (err) {
        res.status(500).send(err);
    }
})

// endpoint to delete one box geometry in the database
router.delete('/delete_one_box/:boxId', async (req, res) => {
    const boxId = req.params.boxId;
    try {
        const box = await boxModel.findByIdAndDelete(boxId);
        return box;
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router;
