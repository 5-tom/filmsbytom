import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Fares from "./Fares";

const router = createBrowserRouter([
	{
		path: "portfolio",
		element: <App />
	},
	{
		path: "portfolio/fares",
		element: <Fares />
	}
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
