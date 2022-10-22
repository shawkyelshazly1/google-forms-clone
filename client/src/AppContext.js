import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContext, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import api from "./api";

// app context
export const AppContext = createContext();

// app context provider to wrap the app
export const AppProvider = ({ children }) => {
	// Access the client
	const queryClient = useQueryClient();

	const [form, setForm] = useState({
		"form-title": "",
		questions: [],
		"form-color": "purple",
		"form-description": "",
		"form-secondary-title": "",
	});

	const [formResponse, setformResponse] = useState({ formId: "", answers: [] });

	// set form response Id
	const setformResponseId = (formId) => {
		setformResponse({ ...formResponse, formId });
	};

	// add form answer to state
	const addFormResponseAnswer = (answer, questionType) => {
		if (questionType !== "checkboxes") {
			const existingAnswer = formResponse.answers.find(
				(answerBody) => answerBody.questionId === answer.questionId
			);
			if (existingAnswer) {
				const updatedAnswers = formResponse.answers.map((answerBody) =>
					answerBody.questionId !== answer.questionId ? answerBody : answer
				);
				setformResponse({
					...formResponse,
					answers: updatedAnswers,
				});
				return;
			}
		}
		setformResponse({
			...formResponse,
			answers: [...formResponse.answers, answer],
		});
	};
	// remove form answer to state
	const removeFormResponseAnswer = (answerData) => {
		const updatedAnswers = formResponse.answers.filter(
			(answerBody) => answerBody.answer !== answerData.answer
		);
		setformResponse({
			...formResponse,
			answers: updatedAnswers,
		});
	};

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

	// update form secondary title

	const updateFormSecondaryTitle = (secondaryTitle) => {
		const updatedForm = { ...form, "form-secondary-title": secondaryTitle };
		pushFormUpdate(updatedForm);
	};

	// update form description
	const updateFormDescription = (description) => {
		const updatedForm = { ...form, "form-description": description };
		pushFormUpdate(updatedForm);
	};

	// update form title
	const updateFormTitle = (title) => {
		const updatedForm = { ...form, "form-title": title };
		pushFormUpdate(updatedForm);
	};

	// update question title
	const updateQuestionType = (questionId, type) => {
		const updatedQuestions = form.questions.map((question) =>
			question._id !== questionId
				? question
				: { ...question, "question-type": type, options: [] }
		);

		const updatedForm = { ...form, questions: updatedQuestions };
		pushFormUpdate(updatedForm);
	};

	// update question type
	const updateQuestionTitle = (questionId, title) => {
		const updatedQuestions = form.questions.map((question) =>
			(question._id || question._id) !== questionId
				? question
				: { ...question, "question-title": title }
		);

		const updatedForm = { ...form, questions: updatedQuestions };
		pushFormUpdate(updatedForm);
	};

	// add options to question
	const addOption = (questionId, option) => {
		const updatedQuestions = form.questions.map((question) =>
			question._id !== questionId
				? question
				: { ...question, options: [...question.options, option] }
		);
		const updatedForm = { ...form, questions: updatedQuestions };
		pushFormUpdate(updatedForm);
	};

	// update Option
	const updateOption = (questionId, updatedOption) => {
		const updatedQuestions = form.questions.map((question) =>
			question._id !== questionId
				? question
				: {
						...question,
						options: question.options.map((option) =>
							(option._id || option._id) !== updatedOption._id
								? option
								: updatedOption
						),
				  }
		);
		const updatedForm = { ...form, questions: updatedQuestions };
		pushFormUpdate(updatedForm);
	};

	// remove option from question
	const removeOption = (questionId, optionId) => {
		const updatedQuestions = form.questions.map((question) =>
			question._id !== questionId
				? question
				: {
						...question,
						options: question.options.filter(
							(option) => (option._id || option._id) !== optionId
						),
				  }
		);

		const updatedForm = {
			...form,
			questions: updateOptionsPlaceholders(updatedQuestions, questionId),
		};

		pushFormUpdate(updatedForm);
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
		const updatedQuestions = form.questions.filter(
			(question) => question._id !== questionId
		);
		const updatedForm = { ...form, questions: updatedQuestions };

		pushFormUpdate(updatedForm);
	};

	// add question
	const addQuestion = () => {
		const updatedForm = {
			...form,
			questions: [...form.questions, defaultQuestion],
		};
		pushFormUpdate(updatedForm);
	};

	// change form colors
	const updateFormColors = (color) => {
		const updatedForm = { ...form, "form-color": color };
		pushFormUpdate(updatedForm);
	};

	// update & publish
	const pushFormUpdate = (updatedForm) => {
		setForm(updatedForm);
		// updateForm.mutate({ formData: updatedForm });
		toast.promise(
			updateForm.mutateAsync({ formData: updatedForm }),
			{
				loading: "Saving...",
				success: <b>Form saved!</b>,
				error: <b>Could not save.</b>,
			},
			{ success: { duration: 500 }, position: "bottom-right" }
		);
	};

	// update form and save on changes
	const updateForm = useMutation(
		({ formData }) => {
			return api.put(`/form/${form._id}`, { formData }).then((res) => {
				return res.data;
			});
		},
		{
			onSuccess: (data) => {
				if (data) {
					queryClient.setQueryData(["edit-form"], data);
					queryClient.setQueryData(["forms"], (forms) => {
						if (forms) {
							const updatedForms = forms.map((form) =>
								form._id !== data._id ? form : data
							);
							return [...updatedForms];
						}
					});
				}
			},
			onError: (error) => {
				console.log(error);
				if (error) {
					console.error(error);
				}
			},
		}
	);

	// context state values and functions
	const stateValues = {
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
		updateFormColors,
		updateFormDescription,
		updateFormSecondaryTitle,
		addFormResponseAnswer,
		removeFormResponseAnswer,
		setformResponseId,
		setformResponse,
		formResponse,
	};

	// return children wrapped in the context provider
	return (
		<AppContext.Provider value={stateValues}>{children}</AppContext.Provider>
	);
};
