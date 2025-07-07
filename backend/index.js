require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const open = require("open").default;
const { DBConnection } = require("./database/db");

// 🛣️ Routers
const AuthRouter = require("./Routes/AuthRouter");
const SubmitRouter = require("./Routes/Submit");
const ProblemRouter = require("./Routes/problems"); // ✅ NO destructuring needed unless you did `module.exports = { router }`

const app = express();
const PORT = process.env.PORT || 2000;

// 🌐 Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🛢️ Connect to DB
DBConnection();

// 🧭 Routes
app.use("/api", AuthRouter);
app.use("/api", ProblemRouter); // ✅ Make sure you're exporting router correctly
app.use("/api", SubmitRouter);

// 🔥 Default route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running!");
});

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  open(`http://localhost:${PORT}`);
});
