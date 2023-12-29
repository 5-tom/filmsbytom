// backend/api.js
import express, { Router as Router2 } from "express";
import serverless from "serverless-http";

// backend/routes/trains.js
import { Router } from "express";
import axios from "axios";
import { JSDOM } from "jsdom";
var router = Router();
router.get("/", async (req, res) => {
  try {
    const ticketAlert = await axios.get(
      "https://www.thetrainline.com/ticketalert"
    );
    const bookingWindowRegex = /<table.*Avanti.*<\/table>/;
    const bookingWindow = ticketAlert.data.match(bookingWindowRegex);
    return res.json(tableToJSON(bookingWindow[0]));
  } catch (err) {
    console.log(err);
    return res.send("Failed to get data.");
  }
});
var trains_default = router;
function tableToJSON(html) {
  const DOM = new JSDOM(html);
  const document = DOM.window.document;
  const table = document.querySelector("table");
  const arr = { bookingWindows: [] };
  table.querySelectorAll("tr").forEach((row) => {
    const cells = row.querySelectorAll("td");
    arr.bookingWindows.push({
      toc: cells[0].textContent,
      date: cells[1].textContent
    });
  });
  const slicedArr = {
    bookingWindows: arr.bookingWindows.slice(1, arr.bookingWindows.length)
  };
  return slicedArr;
}

// backend/api.js
var api = express();
var app = Router2();
app.use("/trains", trains_default);
api.use("/api", app);
api.listen(3e3);
var handler = serverless(api);
export {
  handler
};
