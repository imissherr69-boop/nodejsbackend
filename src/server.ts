import app from "./app.js";
import prisma from "./config/prisma.js";
const PORT = process.env.PORT || 5000;


prisma.todo.findMany().then(console.log);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});