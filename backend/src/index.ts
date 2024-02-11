import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
// Connections and listeneres

// Only wnat to connect to app server once databse is connected
const PORT = process.env.PORT || 5000;
connectToDatabase()
  .then(() => {
    // Opening development server - Port in which we are creating the app server
    app.listen(PORT,()=>console.log("Server Open & Connected to Database"));
  })
  .catch((err) => console.log(err));


