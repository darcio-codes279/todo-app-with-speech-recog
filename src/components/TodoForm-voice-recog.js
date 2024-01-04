import React, { useEffect, useState } from "react";
import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

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

		if (finalTranscript === "" && value !== "") {
			addTodo(value);
			setValue("");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="TodoForm">
			<button
				className={`voice-btn-start ${listening ? "recording" : "noRecording"}`}
				id="start"
				onClick={
					listening
						? SpeechRecognition.stopListening
						: SpeechRecognition.startListening
				}
			>
				<FontAwesomeIcon className="voice-icon" icon={faMicrophone} />
			</button>
			<input
				type="text"
				value={value || transcript}
				onChange={(e) => setValue(e.target.value)}
				className="todo-input"
				placeholder="What do you need to get done today?"
			/>
			<button type="submit" className="todo-btn">
				Add Task
			</button>
		</form>
	);
};

// Remove onChange because it only works for typing - I think
// update value in state with finalTranscript
