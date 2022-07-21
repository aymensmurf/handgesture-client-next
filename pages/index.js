import { useState, useEffect } from "react";
import io from "socket.io-client";

const SLIDER = ["Slide 0", "Slide 1", "Slide 2", "Slide 3", "Slide 4"];
const COLORS = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5"];

export default function Home() {
	const [motion, setMotion] = useState("");
	const [motionCount, setMotionCount] = useState(0);
	const [index, setIndex] = useState(0);
	const [position, setPosition] = useState("-");

	useEffect(() => {
		const socketIo = io("http://localhost:8080/", {
			query: {
				clientType: "frontend",
			},
		});

		socketIo.on("motion", (message) => {
			console.log("motion", message);
			setMotion(message);
			setMotionCount((motionCount) => motionCount + 1);
		});

		socketIo.on("position", (message) => {
			console.log("position", message);
			setPosition(message);
		});

		return () => {
			socketIo.disconnect();
		};
	}, []);

	useEffect(() => {
		if (motion === "right") {
			if (index === SLIDER.length - 1) {
				setIndex(0);
			} else {
				setIndex(index + 1);
			}
		} else if (motion === "left") {
			if (index > 0) {
				setIndex(index - 1);
			} else {
				setIndex(SLIDER.length - 1);
			}
		}
	}, [motionCount, motion]);

	return (
		<>
			<div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100vw", height: "100vh" }}>
				<h1>Slider</h1>
				<h3>Motion: {motion || "-"}</h3>
				<h3>Hand Position</h3>
				<h3>
					x: {position.x} - y: {position.y}
				</h3>
				<div
					style={{
						width: 600,
						height: 600,
						marginTop: 40,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: COLORS[index],
					}}>
					<h1>{SLIDER[index]}</h1>
				</div>

				<div>
					<img src='/hand.png' alt='' />
				</div>
			</div>

			<style jsx>{`
				h3 {
					margin-top: 10px;
					margin-bottom: 10px;
				}

				img {
					width: 60px;
					height: 60px;
					object-fit: contain;
					position: absolute;
					transition: all 0.1s ease-in-out;
					top: ${position.y}px;
					left: ${position.x}px;
				}
			`}</style>
		</>
	);
}
