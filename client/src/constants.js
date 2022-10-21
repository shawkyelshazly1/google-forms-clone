// setting questions options
export const questionTypes = [
	{ value: "short-input", label: "Short Input" },
	{ value: "paragraph", label: "Paragraph" },
	{ value: "checkboxes", label: "Checkboxes" },
	{ value: "multiple-choice", label: "Multiple Choice" },
];

export const questionsMap = {
	"short-input": { value: "short-input", label: "Short Input" },
	paragraph: { value: "paragraph", label: "Paragraph" },
	checkboxes: { value: "checkboxes", label: "Checkboxes" },
	"multiple-choice": { value: "multiple-choice", label: "Multiple Choice" },
};

export const defaultForm = {
	formData: {
		"form-title": "untitled Form",
		questions: [],
	},
};
