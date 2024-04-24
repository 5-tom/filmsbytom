import { JSDOM } from "jsdom";
import type { Request, Response } from "express";

export async function fares(req: Request, res: Response) {
	try {
		const { from, to, hour, railcard } = req.body;

		if (from.length > 3 || to.length > 3) return res.sendStatus(500);
		if (isNaN(parseInt(hour)) || parseInt(hour) < 1 || parseInt(hour) > 23)
			return res.sendStatus(500);
		if (railcard !== "on" && railcard !== undefined) return res.sendStatus(500);

		async function getSWRDate() {
			return await fetch("https://filmsbytom.com/api/trains")
				.then(async (res) => {
					const { date } = (await res.json()).bookingWindows.find(
						({ toc }) => toc === "South Western Railway"
					);
					if (!date) throw new Error();
					return date;
				})
				.catch(() => res.sendStatus(500));
		}

		async function getDatesArray() {
			const datesArray: Array<string> = [];
			const SWRDate = await getSWRDate();
			let startDate = new Date();
			const endDate = new Date(SWRDate.replace(/(\d+)(st|nd|rd|th)/, "$1"));
			while (startDate <= endDate) {
				datesArray.push(startDate.toISOString().split("T")[0]);
				startDate.setDate(startDate.getDate() + 3);
			}
			return datesArray;
		}

		const fetchFare = async (date: string) => {
			const res = await fetch(
				`https://traintimes.org.uk/${from}/${to}/${hour}:00/${date}${
					railcard === "on" ? "?railcard=YNG" : ""
				}`
			);
			const DOM = new JSDOM(await res.text());
			const smalls: Array<HTMLElement> = Array.from(
				DOM.window.document.querySelectorAll("small")
			);
			let fares: Array<number> = smalls
				.map((small) => {
					const words = small.innerHTML.split(" ");
					return words.find((word) => word.startsWith("£"));
				})
				.filter((fare) => fare !== undefined)
				.map((fare) => parseFloat(fare!.split("£")[1]));
			return Math.min(...fares);
		};

		async function fetchAllFares() {
			const datesArray = await getDatesArray();
			return Promise.all(
				datesArray.map(async (date) => {
					const fare = await fetchFare(date);
					const link = `https://traintimes.org.uk/${from}/${to}/${hour}:00/${date}${
						railcard === "on" ? "?railcard=YNG" : ""
					}`;
					return { date, fare, link };
				})
			);
		}

		const fares = await fetchAllFares();
		return res.send(fares);
	} catch {
		return res.sendStatus(500);
	}
}
