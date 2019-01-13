require("dotenv").config({ path: "variables.env" });
const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

//  Middleware to handle cookies (JWT)
/* server.express.use(cookieParser()); */

// Middleware to populate current user (decode JWT)
/* server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    // Verify that nobody has monkeyed with the token
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // Put userId on the request for future requests to access
    req.userId = userId;
  }
  next();
}); */

// Middleware to pop user onto each request
/*
server.express.use(async (req, res, next) => {
  // If they are not logged in, skip
  if (!req.userId) return next();
  // Query the user
  const user = await db.query.user(
    { where: { id: req.userId } },
    "{ id, name, email, permissions }"
  );
  req.user = user;
  next();
}); */

server.start(
  {
    cors: {
      // Requirements for accessing endpoint
      credentials: true,
      origin: true
    }
  },
  //Callback function
  deets => {
    console.log(`Server is now running on port http:/localhost:${deets.port}`);
  }
);
