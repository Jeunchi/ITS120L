const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authentication headers)
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true"); // This is required!
  
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

const response = await api.post('http://localhost:8081/signup', values, {
  withCredentials: true,
});
