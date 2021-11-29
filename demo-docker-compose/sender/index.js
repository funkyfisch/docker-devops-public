const axios = require("axios");

setInterval(async () => {
  let res = await axios.get("http://server:3000");
  console.log(res.data);
}, 3000);
