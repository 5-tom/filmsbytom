import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const projects = [
	{
		alt: "green iguana",
		image: "/contemplative-reptile.jpg",
		title: "Lizard",
		body: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
		btn1: "Share",
		btn2: "Learn More"
	},
	{
		alt: "green iguana",
		image: "/contemplative-reptile.jpg",
		title: "Lizard",
		body: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
		btn1: "Share",
		btn2: "Learn More"
	},
	{
		alt: "green iguana",
		image: "/contemplative-reptile.jpg",
		title: "Lizard",
		body: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
		btn1: "Share",
		btn2: "Learn More"
	}
];

export default function App() {
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "1fr 1fr 1fr",
				gap: "10px",
				padding: "0px 100px"
			}}
		>
			{projects.map(({ alt, image, title, body, btn1, btn2 }, index) => {
				let col = index + 1;
				let style;
				if (col % 3 === 0) {
					style = { placeSelf: "start" };
				} else if (col % 2 === 0) {
					style = { justifySelf: "center" };
				} else {
					style = { placeSelf: "end" };
				}
				return (
					<Card sx={{ maxWidth: 345 }} key={title} style={style}>
						<CardMedia component="img" alt={alt} height="140" image={image} />
						<CardContent>
							<Typography gutterBottom variant="h5" component="div">
								{title}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								{body}
							</Typography>
						</CardContent>
						<CardActions>
							<Button size="small">{btn1}</Button>
							<Button size="small">{btn2}</Button>
						</CardActions>
					</Card>
				);
			})}
		</div>
	);
}
