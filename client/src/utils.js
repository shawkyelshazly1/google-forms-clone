import Checkboxes from "./components/formComponents/Checkboxes";
import LongInput from "./components/formComponents/LongInput";
import MultipleChoice from "./components/formComponents/MultipleChoice";
import ShortInput from "./components/formComponents/ShortInput";

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

// set Access Token
export const setAccessToken = (token) => {
	localStorage.setItem("accessToken", token);
};
