const express = require('express');

require('dotenv').config();

const configure = require('./config');

const app = express();

configure(app);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

// routes starting here: 
const index = require("./routes/index.routes");
app.use("/", index);

// require("./error-handling")(app);

module.exports = app;