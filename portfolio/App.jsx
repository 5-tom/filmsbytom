import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Terminal } from "@mui/icons-material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
	typography: {
		fontFamily: ["sans-serif"].join(",")
	}
});

const projects = [
	{
		alt: "ytfzf logo",
		image: "/ytfzf.png",
		title: "y (wrapper for ytfzf and yt-dlp)",
		body: "Download audio or video, and browse channels and search using command line options. Uses ytfzf, yt-dlp, and mpv.",
		btn1: {
			name: "Read bash version",
			link: "https://github.com/5-tom/scripts-backup/blob/main/usr-local-bin/y"
		},
		btn2: {
			name: "Read JavaScript version",
			link: "https://github.com/5-tom/scripts-backup/blob/main/usr-local-bin/node/y.mjs"
		}
	},
	{
		alt: "kodi file structure",
		image: "/kodi.png",
		title: "(OLD) Organise movies to the Kodi recommendation",
		body: "Kodi recommends that movie libraries be organised like: 'Dredd (2012)' > 'Dredd (2012).mkv'. This script batch renames and batch moves your movies to conform to Kodi's recommendation",
		btn1: {
			name: "Read bash version",
			link: "https://github.com/5-tom/old-scripts/blob/main/kodi"
		},
		btn2: {
			name: "Read JavaScript version",
			link: "https://github.com/5-tom/scripts-backup/blob/main/usr-local-bin/node/kodi.mjs"
		},
		btn3: {
			name: "Read recommendation",
			link: "https://kodi.wiki/view/Naming_video_files/Movies"
		}
	},
	{
		alt: "mpv and filmon logos",
		image: "/filmon.png",
		title: "(OLD) TV using mpv, IPC, socat, and filmon",
		body: "After about 60 seconds of free TV, filmon returns a 403 status code. This script circumvents this restriction by fetching a new stream and directing it to the same mpv window",
		btn1: {
			name: "Read bash version",
			link: "https://github.com/5-tom/old-scripts/blob/main/filmon.sh"
		},
		btn2: {
			name: "Read JavaScript version",
			link: "https://github.com/5-tom/scripts-backup/blob/main/usr-local-bin/node/filmon.mjs"
		},
		btn3: {
			name: "View YouTube video",
			link: "https://www.youtube.com/watch?v=V8MN4QFs9fE"
		}
	},
	{
		alt: "GitHub Copilot for VSCodium logos",
		image: "/copilot.png",
		title: "(OLD) Install GitHub Copilot for VSCodium (snap)",
		body: "The Copilot extension can't be installed for VSCodium without a little bit of hacking!",
		btn1: {
			name: "Read code",
			link: "https://github.com/5-tom/old-scripts/blob/main/copilot.sh"
		}
	}
];

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 1fr 1fr",
					gap: "10px",
					padding: "0px 100px"
				}}
			>
				<div style={{ fontFamily: "sans-serif", gridColumn: "1 / span 3" }}>
					<h3>Write-ups for my TypeScript and webdev projects coming soon!</h3>
				</div>
				{projects.map(
					({ alt, image, title, body, btn1, btn2, btn3 }, index) => {
						let col = index % 3;
						let style;
						if (col === 0) {
							style = { justifySelf: "end" };
						} else if (col === 1) {
							style = { justifySelf: "center" };
						} else {
							style = { justifySelf: "start" };
						}
						return (
							<Card sx={{ maxWidth: 345 }} key={title} style={style}>
								<CardMedia
									component="img"
									alt={alt}
									height="140"
									image={image}
								/>
								<CardContent>
									<Typography gutterBottom variant="h5" component="div">
										<Terminal /> {title}
									</Typography>
									<Typography variant="body2" color="text.secondary">
										{body}
									</Typography>
								</CardContent>
								<CardActions>
									<a href={btn1.link}>
										<Button size="small">{btn1.name}</Button>
									</a>
									{btn2 && (
										<a href={btn2.link}>
											<Button size="small">{btn2.name}</Button>
										</a>
									)}
									{btn3 && (
										<a href={btn3.link}>
											<Button size="small">{btn3.name}</Button>
										</a>
									)}
								</CardActions>
							</Card>
						);
					}
				)}
			</div>
		</ThemeProvider>
	);
}
