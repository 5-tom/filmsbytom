import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import Alert from "@mui/material/Alert";

import { Html, Javascript, Terminal } from "@mui/icons-material";

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
		},
		metadata: {
			maintained: true,
			icons: ["terminal", "javascript"]
		}
	},
	{
		alt: "kodi file structure",
		image: "/kodi.png",
		title: "Organise movies to the Kodi recommendation",
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
		},
		metadata: {
			maintained: false,
			icons: ["terminal", "javascript"]
		}
	},
	{
		alt: "mpv and filmon logos",
		image: "/filmon.png",
		title: "TV using mpv, IPC, socat, and filmon",
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
		},
		metadata: {
			maintained: false,
			icons: ["terminal", "javascript"]
		}
	},
	{
		alt: "GitHub Copilot for VSCodium logos",
		image: "/copilot.png",
		title: "Install GitHub Copilot for VSCodium (snap)",
		body: "The Copilot extension can't be installed for VSCodium without a little bit of hacking!",
		btn1: {
			name: "Read code",
			link: "https://github.com/5-tom/old-scripts/blob/main/copilot.sh"
		},
		metadata: {
			maintained: false,
			icons: ["terminal", "javascript"]
		}
	},
	{
		alt: "Screenshot of fares tracker",
		image: "/fares_tracker.png",
		title: "Advance Train Tickets Fare Tracking",
		body: "See changes in train ticket fares between now and the end of the booking window.",
		metadata: {
			maintained: true,
			icons: ["html", "javascript"]
		},
		btn1: {
			name: "Visit",
			link: "/portfolio/fares"
		},
		btn2: {
			name: "Read frontend code",
			link: "https://github.com/5-tom/filmsbytom/blob/main/portfolio/Fares.tsx"
		},
		btn3: {
			name: "Read backend code",
			link: "https://github.com/5-tom/filmsbytom/blob/main/backend/routes/fares.ts"
		}
	},
	{
		alt: "Wood Job! movie poster in windowboxd",
		image: "/woodjob.png",
		title: "windowboxd",
		body: "Alternative frontend for letterboxd. Requires no JavaScript. Inspired by invidious and nitter.",
		metadata: {
			maintained: true,
			icons: ["html", "javascript"]
		},
		btn1: {
			name: "Go to repository",
			link: "https://github.com/5-tom/windowboxd"
		}
	},
	{
		alt: "GJS logo",
		image: "/jsgnome.png",
		title: "Unnamed GJS Project",
		body: "GJS is a language binding for JavaScript and GTK. It lets you write native Linux desktop apps with JavaScript.",
		metadata: {
			maintained: true,
			comingSoon: true,
			icons: ["javascript"]
		},
		btn1: {
			name: "Watch talk",
			link: "https://www.youtube.com/watch?v=YqmmK16rIm4&t=10"
		},
		btn2: {
			name: "Read README",
			link: "https://gitlab.gnome.org/GNOME/gjs/-/blob/master/doc/README.md"
		},
		btn3: {
			name: "GTK4 + GJS Book",
			link: "https://rmnvgr.gitlab.io/gtk4-gjs-book/"
		}
	},
	{
		alt: "pipes",
		image: "/dataducts.jpg",
		title: "LittlePipelines",
		body: "Learn to code through pull request reviews.",
		metadata: {
			maintained: true,
			comingSoon: true,
			icons: ["html", "javascript"]
		}
	},
	{
		alt: "pipes",
		image: "/dataducts.jpg",
		title: "DataDucts",
		body: "Webmaster for a digital transformation company.",
		metadata: {
			maintained: true,
			comingSoon: true,
			icons: ["html", "javascript"]
		}
	}
];

export default function App() {
	const matches = useMediaQuery(theme.breakpoints.up("md"));
	return (
		<ThemeProvider theme={theme}>
			<Grid container rowSpacing={1}>
				<Grid item xs={12} sx={{ fontFamily: "sans-serif" }}>
					<Button href="/" variant="contained">
						Go back to Home
					</Button>
					<h3>Write-ups for my TypeScript and webdev projects coming soon!</h3>
				</Grid>
				{projects.map(
					({ alt, image, title, body, btn1, btn2, btn3, metadata }, index) => {
						const col = index % 3;
						let style = {
							display: "flex",
							justifyContent: "center"
						};
						if (matches) {
							if (col === 0) {
								style.justifyContent = "end";
							} else if (col === 1) {
								style.justifyContent = "center";
							} else {
								style.justifyContent = "start";
							}
						} else {
							style.justifyContent = "center";
						}
						return (
							<Grid item xs={12} sm={6} md={4} sx={style} key={title}>
								<Card sx={{ maxWidth: 345 }}>
									<CardMedia
										component="img"
										alt={alt}
										height="140"
										image={image}
									/>
									<CardContent>
										{!metadata.maintained && (
											<Alert severity="warning">
												This project isn't being maintained.
											</Alert>
										)}
										{metadata.comingSoon && (
											<Alert severity="info">Launch coming soon.</Alert>
										)}
										<Typography gutterBottom variant="h5" component="div">
											{metadata.icons.includes("terminal") && <Terminal />}
											{metadata.icons.includes("html") && <Html />}
											{metadata.icons.includes("javascript") && <Javascript />}
											{title}
										</Typography>
										<Typography variant="body2" color="text.secondary">
											{body}
										</Typography>
									</CardContent>
									<CardActions>
										{btn1 && (
											<a href={btn1.link}>
												<Button size="small">{btn1.name}</Button>
											</a>
										)}
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
							</Grid>
						);
					}
				)}
			</Grid>
		</ThemeProvider>
	);
}
