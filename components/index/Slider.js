import { useState, useEffect } from "react";
import { useSubscription } from "mqtt-react-hooks";

const SLIDER = ["Slide 0", "Slide 1", "Slide 2", "Slide 3", "Slide 4"];
const COLORS = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5"];

const Slider = () => {
	const [motion, setMotion] = useState("");
	const [index, setIndex] = useState(0);

	const { message } = useSubscription(["InnovantagrorobotId"]);

	// useEffect(() => {
	// 	const client = mqtt.connect("mqtt://test.mosquitto.org:8080");

	// 	client.subscribe("InnovantagrorobotId");

	// 	client.on("message", (topic, message) => {
	// 		const payload = { topic, message: message.toString() };
	// 		console.log(payload);
	// 		setMotion(payload.message);

	// 		if (payload.message === "right" && index < SLIDER.length - 1) {
	// 			setIndex(index + 1);
	// 		} else if (payload.message === "left" && index > 0) {
	// 			setIndex(index - 1);
	// 		}
	// 	});
	// }, [index]);

	return (
		<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
			<h1>Slider</h1>
			<h3>Motion: {motion || "-"}</h3>
			{message && <span>{`topic:${message.topic} - message: ${message.message}`}</span>}

			<div
				style={{
					width: 600,
					height: 600,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: COLORS[index],
				}}>
				<h1>{SLIDER[index]}</h1>
			</div>
		</div>
	);
};

export default Slider;
