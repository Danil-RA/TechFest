const express = require("express");

const Event = require("../models/Event");
const Registration = require("../models/Registration");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res, next) => {
    try {
        const { name, department, course, eventId } = req.body;

        if (!name || !department || !course || !eventId) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        if (event.seats < 1) {
            return res.status(400).json({
                message: "No seats left"
            });
        }

        const registration = await Registration.create({
            name,
            department,
            course,
            event: event._id
        });

        event.seats -= 1;
        await event.save();

        res.status(201).json({
            message: "Registration successful",
            registration
        });

    } catch (err) {
        next(err);
    }
});

module.exports = router;