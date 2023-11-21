import express, { Router } from "express";
import axios from "axios";
import serverless from "serverless-http";
import { JSDOM } from "jsdom";

const api = express();
const app = Router();
//

function tableToJSON(html) {
	const DOM = new JSDOM(html);
	const document = DOM.window.document;
	const table = doc.querySelector("table");
	const result = { bookingWindows: [] };
	table.querySelectorAll("tr").forEach((row) => {
		const cells = row.querySelectorAll("td");
		result.bookingWindows.push({
			toc: cells[0].textContent,
			date: cells[1].textContent
		});
	});
	return result;
}

app.get("/trains", async (req, res) => {
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

//
api.use("/api", app);
api.listen(3000);
export const handler = serverless(api);
