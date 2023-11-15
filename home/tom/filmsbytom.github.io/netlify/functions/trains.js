import express from "express";
import serverless from "serverless-http";

const app = express();

app.get("/trains", (req, res) => {
	res.send("trains");
});

export const handler = serverless(app);
