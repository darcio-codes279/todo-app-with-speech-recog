import React, { useEffect, useState } from "react";
import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";

export const TodoForm = ({ addTodo }) => {
	const [value, setValue] = useState("");

	// React Speech Recognition
	const {
		finalTranscript,
		transcript,
		listening,
		resetTranscript,
		browserSupportsSpeechRecognition,
	} = useSpeechRecognition();

	useEffect(() => {
		if (finalTranscript !== "") {
			console.log("Final result: " + finalTranscript);
		}
	}, [finalTranscript]);

	if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesn't support speech recognition.</span>;
	}

	const handleSubmit = (e) => {
		// prevent default action
		e.preventDefault();
		if (value === "" && finalTranscript !== "") {
			addTodo(finalTranscript);
			resetTranscript();
		}

		if (finalTranscript == "" && value !== "") {
			addTodo(value);
			setValue("");
		}
	};
	return (
		<form onSubmit={handleSubmit} className="TodoForm">
			<input
				type="text"
				value={value || finalTranscript}
				onChange={(e) => setValue(e.target.value)}
				className="todo-input"
				placeholder="What is the task today?"
			/>
			<button type="submit" className="todo-btn">
				Add Task
			</button>

			<div>
				<p>Microphone: {listening ? "ON" : "OFF"}</p>
				<button onClick={SpeechRecognition.startListening}>Start</button>
				<button onClick={SpeechRecognition.stopListening}>Stop</button>
				<button onClick={resetTranscript}>Reset</button>
				<p>{transcript}</p>
			</div>
		</form>
	);
};

// Remove onChange because it only works for typing - I think
// update value in state with finalTranscript
