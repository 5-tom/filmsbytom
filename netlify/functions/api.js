// backend/api.ts
import express, { Router as Router2 } from "express";
import serverless from "serverless-http";

// backend/routes/trains.ts
import { Router } from "express";
import axios from "axios";
import { JSDOM as JSDOM2 } from "jsdom";
import multer from "multer";

// backend/routes/fares.ts
import { JSDOM } from "jsdom";
async function fares(req, res) {
  try {
    const { from, to, hour, railcard } = req.body;
    if (from.length > 3 || to.length > 3)
      return res.sendStatus(500);
    if (isNaN(parseInt(hour)) || parseInt(hour) < 1 || parseInt(hour) > 23)
      return res.sendStatus(500);
    if (railcard !== "on" && railcard !== void 0)
      return res.sendStatus(500);
    async function getSWRDate() {
      return await fetch("https://filmsbytom.com/api/trains").then(async (res2) => {
        const { date } = (await res2.json()).bookingWindows.find(
          ({ toc }) => toc === "South Western Railway"
        );
        if (!date)
          throw new Error();
        return date;
      }).catch(() => res.sendStatus(500));
    }
    async function getDatesArray() {
      const datesArray = [];
      const SWRDate = await getSWRDate();
      let startDate = /* @__PURE__ */ new Date();
      const endDate = new Date(SWRDate.replace(/(\d+)(st|nd|rd|th)/, "$1"));
      while (startDate <= endDate) {
        datesArray.push(startDate.toISOString().split("T")[0]);
        startDate.setDate(startDate.getDate() + 3);
      }
      return datesArray;
    }
    const fetchFare = async (date) => {
      const res2 = await fetch(
        `https://traintimes.org.uk/${from}/${to}/${hour}:00/${date}${railcard === "on" ? "?railcard=YNG" : ""}`
      );
      const DOM = new JSDOM(await res2.text());
      const smalls = Array.from(
        DOM.window.document.querySelectorAll("small")
      );
      let fares3 = smalls.map((small) => {
        const words = small.innerHTML.split(" ");
        return words.find((word) => word.startsWith("\xA3"));
      }).filter((fare) => fare !== void 0).map((fare) => parseFloat(fare.split("\xA3")[1]));
      return Math.min(...fares3);
    };
    async function fetchAllFares() {
      const datesArray = await getDatesArray();
      return Promise.all(
        datesArray.map(async (date) => {
          const fare = await fetchFare(date);
          const link = `https://traintimes.org.uk/${from}/${to}/${hour}:00/${date}${railcard === "on" ? "?railcard=YNG" : ""}`;
          return { date, fare, link };
        })
      );
    }
    const fares2 = await fetchAllFares();
    return res.send(fares2);
  } catch {
    return res.sendStatus(500);
  }
}

// backend/routes/trains.ts
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
router.post("/fares", multer().none(), fares);
var trains_default = router;
function tableToJSON(html) {
  const DOM = new JSDOM2(html);
  const document = DOM.window.document;
  const table = document.querySelector("table");
  const arr = {
    bookingWindows: []
  };
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

// backend/api.ts
var api = express();
var app = Router2();
app.use("/trains", trains_default);
api.use("/api", app);
api.listen(3e3);
var handler = serverless(api);
export {
  handler
};
