import express, { Router } from "express";
import axios from "axios";
import serverless from "serverless-http";
const api = express();
const app = Router();
//

app.get("/trains", async (req, res) => {
	try {
		const ticketAlert = await axios.get(
			"https://www.thetrainline.com/ticketalert"
		);
		const bookingWindowRegex = /{"bookingWindows":.*}/;
		const bookingWindow = ticketAlert.data.match(bookingWindowRegex);
		return res.json(JSON.parse(bookingWindow[0]));
	} catch (err) {
		console.log(err);
		return res.send("Failed to get data.");
	}
});

//
api.use("/api", app);
api.listen(3000);
export const handler = serverless(api);
