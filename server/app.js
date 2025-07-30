import express from "express";
import "dotenv/config";

import userRouter from "./routes/user.routes.js";

const app = express();

app.use(express.json());
app.use("/api", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

export default app;
