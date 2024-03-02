import React, { useState } from "react";
import { Button, Dialog, TextField } from "@mui/material";

export default function Home() {
	const [open, setOpen] = useState(false);
	const [formId, setFormId] = useState("");
	const [response, setResponse] = useState("");

	function handleClose() {
		setOpen(false);
	}

	async function submit() {
		fetch("/api/form", {
			method: "post",
			body: new FormData(document.getElementById(formId) as HTMLFormElement)
		}).then(async function (res) {
			setResponse(await res.json());
		});
		setOpen(false);
	}

	return (
		<>
			<span>Home</span>
			<br />

			{String(response["first_name"])}

			<form
				id="form1"
				onSubmit={function (e) {
					e.preventDefault();
					setFormId(e.currentTarget.id);
					setOpen(true);
				}}
			>
				<TextField name="first_name" />
				<Button type="submit">Submit</Button>
			</form>

			<Dialog onClose={handleClose} open={open}>
				<Button onClick={submit}>Submit</Button>
				<Button onClick={handleClose}>Close</Button>
			</Dialog>
		</>
	);
}
