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

export const colorPallete = {
	red: { main: "#DB4437", bg: "#FAE3E1" },
	purple: { main: "#673AB7", bg: "#F0EBF8" },
	indigo: { main: "#3F51B5", bg: "#ECEEF8" },
	blue: { main: "#4285F4", bg: "#E3EDFD" },
	"light-blue": { main: "#03A9F4", bg: "#D9F2FD" },
	cyan: { main: "#00BCD4", bg: "#D9F5F9" },
	"red-orange": { main: "#FF5722", bg: "#FFE6DE" },
	orange: { main: "#FF9800", bg: "#FFF0D9" },
};

export const COLORS = [
	"red-orange",
	"orange",
	"red",
	"purple",
	"indigo",
	"blue",
	"light-blue",
	"cyan",
];
