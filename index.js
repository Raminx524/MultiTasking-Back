const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const connectDB = require("./config/db");
const { verifyToken } = require("./middlewares/auth.middleware");

async function main() {
  await connectDB();
  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );

  const authRoutes = require("./routes/auth.route");

  app.use("/api/auth", authRoutes);

  const taskRoutes = require("./routes/task.route");
  app.use("/api/task", verifyToken, taskRoutes);

  app.listen(PORT, () => console.log(`App running on port ${PORT}`));
}
main();
