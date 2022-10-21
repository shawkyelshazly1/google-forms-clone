import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// app context
export const AppContext = createContext();

// app context provider to wrap the app
export const AppProvider = ({ children }) => {
	const [questions, setQuestions] = useState([]);
	const [form, setForm] = useState({ "form-title": "", questions });

	useEffect(() => {
		setForm({ ...form, questions });
	}, [questions]);

	/*
	form format:-
		{
		form-title:"",
		questions:[]
		}
	*/

	/*
    question format:- 
        {
			id:""
            question-type:"",
            question-title:"",
            options:[]    / only if checkboxes or radio buttons or a list
        }
    */

	/*
	option format:-
		{
			questionId="",
			id="",
			title=""
			placeholder=""
		}
	*/

	// default question structure
	const defaultQuestion = {
		_id: uuidv4(),
		"question-type": "short-input",
		"question-title": "",
		options: [],
	};

	// update form title
	const updateFormTitle = (title) => {
		setForm({ ...form, title });
	};

	// update question title
	const updateQuestionType = (questionId, type) => {
		const updatedQuestions = questions.map((question) =>
			question._id !== questionId
				? question
				: { ...question, "question-type": type, options: [] }
		);
		setQuestions(updatedQuestions);
	};

	// update question type
	const updateQuestionTitle = (questionId, title) => {
		const updatedQuestions = questions.map((question) =>
			question._id !== questionId
				? question
				: { ...question, "question-title": title }
		);
		setQuestions(updatedQuestions);
	};

	// add options to question
	const addOption = (questionId, option) => {
		const updatedQuestions = questions.map((question) =>
			question._id !== questionId
				? question
				: { ...question, options: [...question.options, option] }
		);
		setQuestions(updatedQuestions);
	};

	// update Option
	const updateOption = (questionId, updatedOption) => {
		console.log(questionId, updatedOption);
		const updatedQuestions = questions.map((question) =>
			question._id !== questionId
				? question
				: {
						...question,
						options: question.options.map((option) =>
							option.id !== updatedOption.id ? option : updatedOption
						),
				  }
		);
		setQuestions(updatedQuestions);
	};

	// remove option from question
	const removeOption = (questionId, optionId) => {
		const updatedQuestions = questions.map((question) =>
			question._id !== questionId
				? question
				: {
						...question,
						options: question.options.filter(
							(option) => option.id !== optionId
						),
				  }
		);
		setQuestions(updateOptionsPlaceholders(updatedQuestions, questionId));
	};

	// update options placeholders
	const updateOptionsPlaceholders = (questions, questionId) => {
		const updatedQuestion = questions.map((question) =>
			question._id !== questionId
				? question
				: {
						...question,
						options: question.options.map((option, index) => {
							const updatedOption = Object.assign({}, option);
							updatedOption["placeholder"] = `Option ${index + 1}`;
							return updatedOption;
						}),
				  }
		);
		return updatedQuestion;
	};

	// remove question
	const removeQuestion = (questionId) => {
		const updatedQuestions = questions.filter(
			(question) => question._id !== questionId
		);
		setQuestions(updatedQuestions);
	};

	// add question
	const addQuestion = () => {
		setQuestions([...questions, defaultQuestion]);
	};

	// context state values and functions
	const stateValues = {
		questions,
		setQuestions,
		addOption,
		removeOption,
		removeQuestion,
		addQuestion,
		updateOption,
		updateQuestionTitle,
		updateQuestionType,
		form,
		updateFormTitle,
		setForm,
	};

	// return children wrapped in the context provider
	return (
		<AppContext.Provider value={stateValues}>{children}</AppContext.Provider>
	);
};
