import express, { Router } from "express";
import multer from "multer";
import serverless from "serverless-http";

import trains from "./routes/trains";

const api = express();
const app = Router();
//

app.use("/trains", trains);
app.post("/form", multer().none(), function (req, res) {
	return res.send(req.body);
});

//
api.use("/api", app);
api.listen(3000);
export const handler = serverless(api);
