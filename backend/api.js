import express, { Router } from "express";
import serverless from "serverless-http";

import trains from "./routes/trains";

const api = express();
const app = Router();
//

app.use("/trains", trains);

//
api.use("/api", app);
api.listen(3000);
export const handler = serverless(api);
