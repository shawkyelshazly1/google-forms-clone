import Checkboxes from "./components/formComponents/Checkboxes";
import LongInput from "./components/formComponents/LongInput";
import MultipleChoice from "./components/formComponents/MultipleChoice";
import ShortInput from "./components/formComponents/ShortInput";
import LongInputView from "./formViewComponents/LongInputView";
import MultipleChoiceView from "./formViewComponents/MultipleChoiceView";
import ShortInputView from "./formViewComponents/ShortInputView";
import CheckboxesView from "./formViewComponents/CheckboxesView";

// switch between questions selectiosn
export const selectQuestion = (question, questionType) => {
	switch (questionType) {
		case "short-input":
			return <ShortInput question={question} />;
		case "paragraph":
			return <LongInput question={question} />;
		case "multiple-choice":
			return <MultipleChoice question={question} />;
		case "checkboxes":
			return <Checkboxes question={question} />;
		// default selection
		default:
			return <ShortInput question={question} />;
	}
};

// switch between questions selectiosn "View Form"

export const selectViewQuestion = (question, questionType) => {
	switch (questionType) {
		case "short-input":
			return <ShortInputView question={question} />;
		case "paragraph":
			return <LongInputView question={question} />;
		case "multiple-choice":
			return <MultipleChoiceView question={question} />;
		case "checkboxes":
			return <CheckboxesView question={question} />;
		// default selection
		default:
			return <ShortInputView question={question} />;
	}
};

// set Access Token
export const setAccessToken = (token) => {
	localStorage.setItem("accessToken", token);
};
