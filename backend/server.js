const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/database");
const postRoutes = require("./routes/postRoutes");
const solutionRoutes = require("./routes/solutionRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandling");
const adminRoutes=require('./routes/adminRoutes')

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/post", postRoutes);
app.use("/api/solution", solutionRoutes);
app.use("/api/user", userRoutes);
app.use('/api/admin',adminRoutes)

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
