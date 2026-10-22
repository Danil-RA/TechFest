const express = require("express");
const Event = require("../models/Event");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        next(err);
    }
});

router.post("/", auth, async (req, res, next) => {
    try {
        const event = await Event.create(req.body);
        res.status(201).json(event);
    } catch (err) {
        next(err);
    }
});

router.put("/:id", auth, async (req, res, next) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!event) {
            return res.status(404).json({
                message: "Not Found"
            });
        }

        res.json(event);
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", auth, async (req, res, next) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);

        if (!event) {
            return res.status(404).json({
                message: "Not Found"
            });
        }

        res.json({
            message: "Event Deleted"
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;