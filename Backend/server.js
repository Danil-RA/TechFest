require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");


const logger = require("./middleware/logger");

const {
    notFound,
    errorHandler
} = require("./middleware/errorhandler");

const cors = require("cors");
const app = express();
app.use(cors());

app.use(express.json());

app.use(logger);

app.use("/api/events", require("./routes/events"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/registrations", require("./routes/registrations"));

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("DB error", err.message));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
});