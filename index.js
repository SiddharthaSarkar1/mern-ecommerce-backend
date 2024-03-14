const express = require("express");
const server = express();

const PORT = 5050;

server.listen(PORT, () => {
  `Server is running on port: ${PORT}`;
});
