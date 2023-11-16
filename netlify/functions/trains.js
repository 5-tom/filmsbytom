import express from "express";
import axios from "axios";
import serverless from "serverless-http";

const app = express();

app.get("/trains", async (req, res) => {
	try {
		const ticketAlert = await axios.get(
			"https://www.thetrainline.com/ticketalert"
		);
		const bookingWindowRegex = /{"bookingWindows":.*}/;
		const bookingWindow = ticketAlert.data.match(bookingWindowRegex);
		return res.json(JSON.parse(match[0]));
	} catch (err) {
		console.log(err);
		return res.send("Failed to get data.");
	}
});

app.listen("3000");
export const handler = serverless(app);
