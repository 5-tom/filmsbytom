import React, { useState } from "react";
import { Button, Dialog, TextField } from "@mui/material";

export default function Home() {
	const [open, setOpen] = useState(false);
	const [request, setRequest] = useState({
		body: new FormData(),
		route: ""
	});
	const [response, setResponse] = useState("");

	function handleClose() {
		setOpen(false);
	}

	async function submit() {
		fetch(request.route, {
			method: "post",
			body: request.body
		}).then(async function (res) {
			setResponse(await res.json());
		});
		setOpen(false);
	}

	return (
		<>
			<span>Home</span>
			<form
				onSubmit={function (e) {
					e.preventDefault();
					setRequest({
						body: new FormData(e.currentTarget),
						route: "/api/form"
					});
					setOpen(true);
				}}
			>
				<TextField name="fname" required />
				<Button type="submit">Submit</Button>
			</form>
			<span>Response:</span>
			<br />
			{String(response["fname"])}
			<Dialog onClose={handleClose} open={open}>
				<Button onClick={submit}>Submit</Button>
				<Button onClick={handleClose}>Close</Button>
			</Dialog>
		</>
	);
}
