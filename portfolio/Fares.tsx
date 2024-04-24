import React, { useState } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip
} from "chart.js";
import { Line } from "react-chartjs-2";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NativeSelect from "@mui/material/NativeSelect";

import { Launch } from "@mui/icons-material";

import { stations } from "./stations";

export default function Fares() {
	const [chartData, setChartData] = useState<
		Array<{ date: string; fare: string; link: string }>
	>([]);
	const [loading, setLoading] = useState(false);

	ChartJS.register(
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		Tooltip
	);

	const options = {
		responsive: true
	};

	const labels = chartData.map((fare) => fare.date);

	const data = {
		labels,
		datasets: [
			{
				data: chartData.map((fare) => fare.fare),
				borderColor: "black",
				backgroundColor: "black"
			}
		]
	};

	let hours: Array<string> = [];
	for (let i = 1; i < 24; i++) {
		hours.push(String(i).padStart(2, "0"));
	}

	return (
		<Grid container>
			<Grid item xs={4}>
				<Card>
					<CardContent>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								setLoading(true);
								fetch("/api/trains/fares", {
									method: "post",
									body: new FormData(e.currentTarget)
								})
									.then(async (res) => {
										setChartData(await res.json());
										setLoading(false);
									})
									.catch((err) => {
										console.error(err);
										setLoading(false);
									});
							}}
						>
							<InputLabel>Hour</InputLabel>
							<NativeSelect name="hour">
								{hours.map((hour, index) => (
									<option key={index}>{hour}</option>
								))}
							</NativeSelect>
							<br />
							<FormControlLabel
								name="railcard"
								control={<Checkbox />}
								label="16-25 Railcard"
							/>
							<InputLabel>From</InputLabel>
							<NativeSelect name="from">
								{stations.map(({ stationName, crsCode }, index) => (
									<option value={crsCode} key={index}>
										{stationName}
									</option>
								))}
							</NativeSelect>
							<InputLabel>To</InputLabel>
							<NativeSelect name="to">
								{stations.map(({ stationName, crsCode }, index) => (
									<option value={crsCode} key={index}>
										{stationName}
									</option>
								))}
							</NativeSelect>
							<br />
							<Button type="submit" disabled={loading}>
								{loading ? "Loading..." : "Submit"}
							</Button>
						</form>
					</CardContent>
				</Card>
				<br />
				<Card>
					<CardContent>
						<details>
							<summary>Sources</summary>
							<ul>
								<li>
									<a href="https://raw.githubusercontent.com/davwheat/uk-railway-stations/main/stations.json">
										Station codes
									</a>
								</li>
								<li>
									<a href="https://filmsbytom.com/api/trains">
										Advance train tickets booking window
									</a>
								</li>
								<li>
									<a href="https://traintimes.org.uk">Fares</a>
								</li>
							</ul>
						</details>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={4}>
				{chartData.length > 1 && <Line options={options} data={data} />}
			</Grid>
			<Grid item xs={4}>
				<List>
					{chartData.map((fare, index) => (
						<ListItem disablePadding>
							<ListItemButton component="a" href={fare.link} target="_blank">
								<ListItemIcon>
									<Launch />
								</ListItemIcon>
								<ListItemText primary={`${fare.date} - £${fare.fare}`} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Grid>
		</Grid>
	);
}
