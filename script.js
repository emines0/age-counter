const inputs = document.querySelectorAll("input");
const btn = document.getElementById("btn");
const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");
const formGroupYear = document.querySelector(".form-group.year");
const formGroupMonth = document.querySelector(".form-group.month");
const formGroupDay = document.querySelector(".form-group.day");
const monthsLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const currentDate = new Date();
const emptyFieldText = "This field is required";
const pastYearText = "Must be in the past";
const validMonthText = "Must be a valid month";
const validDayText = "Must be a valid day";

const btnStartPosition = () => {
	btn.style.left = "50%";
};

const btnEndPosition = () => {
	btn.style.left = "94%";
};

const calculateAge = () => {
	const birthDay = day.value;
	const birthMonth = month.value;
	const birthYear = year.value;
	const newDays = document.getElementsByClassName("days");
	const newMonths = document.getElementsByClassName("months");
	const newYears = document.getElementsByClassName("years");
	let currerntDay = currentDate.getDate();
	let currerntMonth = currentDate.getMonth() + 1;
	let currerntYear = currentDate.getFullYear();

	let calculatedDays = 0;
	let calculatedMonths = 0;
	let calculatedYears = 0;

	let monthDays = monthsLength;

	if (birthDay > currerntDay) {
		currerntDay = currerntDay + monthDays[birthMonth - 1];
		currerntMonth = currerntMonth - 1;
	}

	if (birthMonth > currerntMonth) {
		currerntYear = currerntYear - 1;
		currerntMonth = currerntMonth + 12;
	}

	calculatedDays = currerntDay - birthDay;
	calculatedMonths = currerntMonth - birthMonth;
	calculatedYears = currerntYear - birthYear;

	newDays[0].textContent = calculatedDays.toString();
	newMonths[0].textContent = calculatedMonths.toString();
	newYears[0].textContent = calculatedYears.toString();

	btnEndPosition();
};

const btnPosition = () => {
	const position = btn.style.left.toString();
	return position;
};

const createErrorElement = (text, formGroup) => {
	let smallEl = document.createElement("small");
	smallEl.textContent = text;
	smallEl.classList.add("error");
	formGroup.appendChild(smallEl);

	let labelEl = document.querySelector(
		"." + formGroup.className.replace(" ", ".") + " label"
	);
	labelEl.classList.add("error");

	let inputEl = document.querySelector(
		"." + formGroup.className.replace(" ", ".") + " input"
	);
	inputEl.classList.add("error");
};

const removeErrorElement = (formGroup) => {
	let smallEl = document.querySelector(
		"." + formGroup.className.replace(" ", ".") + " small"
	);

	smallEl.remove();

	let labelEl = document.querySelector(
		"." + formGroup.className.replace(" ", ".") + " label"
	);
	labelEl.classList.remove("error");

	let inputEl = document.querySelector(
		"." + formGroup.className.replace(" ", ".") + " input"
	);
	inputEl.classList.remove("error");
};

const setEmptyResults = () => {
	const resYears = document.querySelector(".years");
	const resMonths = document.querySelector(".months");
	const resDays = document.querySelector(".days");

	resYears.innerHTML = "--";
	resMonths.innerHTML = "--";
	resDays.innerHTML = "--";
};

const yearIsEmpty = () => {
	const formGroup = formGroupYear;
	const formGroupSmall = document.querySelector(
		"." + formGroup.className.replace(" ", ".") + " small"
	);

	if (year.value === "" && !formGroupSmall) {
		btnEndPosition();
		createErrorElement(emptyFieldText, formGroup);
		setEmptyResults();
		setTimeout(() => {
			btnStartPosition();
		}, 650);
	} else if (year.value === "" && formGroupSmall) {
		btnEndPosition();
		setEmptyResults();
		setTimeout(() => {
			btnStartPosition();
		}, 650);
	} else if (year.value !== "" && !formGroupSmall) {
		btnEndPosition();
		if (!validateYear(year)) {
			createErrorElement(pastYearText, formGroup);
			setEmptyResults();
			setTimeout(() => {
				btnStartPosition();
			}, 650);
		}
	} else if (year.value !== "" && formGroupSmall) {
		removeErrorElement(formGroup);
		btnEndPosition();
		if (!validateYear(year)) {
			createErrorElement(pastYearText, formGroup);
			setEmptyResults();
			setTimeout(() => {
				btnStartPosition();
			}, 650);
		}
	}
};

const monthIsEmpty = () => {
	const formGroup = formGroupMonth;
	const formGroupSmall = document.querySelector(
		"." + formGroup.className.replace(" ", ".") + " small"
	);

	if (month.value === "" && !formGroupSmall) {
		btnEndPosition();
		createErrorElement(emptyFieldText, formGroup);
		setEmptyResults();
		setTimeout(() => {
			btnStartPosition();
		}, 650);
	} else if (month.value === "" && formGroupSmall) {
		btnEndPosition();
		setEmptyResults();
		setTimeout(() => {
			btnStartPosition();
		}, 650);
	} else if (month.value !== "" && !formGroupSmall) {
		btnEndPosition();
		if (!validateMonth(month)) {
			createErrorElement(validMonthText, formGroup);
			setEmptyResults();
			setTimeout(() => {
				btnStartPosition();
			}, 650);
		}
	} else if (month.value !== "" && formGroupSmall) {
		removeErrorElement(formGroup);
		btnEndPosition();
		if (!validateMonth(month)) {
			createErrorElement(validMonthText, formGroup);
			setEmptyResults();
			setTimeout(() => {
				btnStartPosition();
			}, 650);
		}
	}
};

const dayIsEmpty = () => {
	const formGroup = formGroupDay;
	const formGroupSmall = document.querySelector(
		"." + formGroup.className.replace(" ", ".") + " small"
	);

	if (day.value === "" && !formGroupSmall) {
		btnEndPosition();
		createErrorElement(emptyFieldText, formGroup);
		setEmptyResults();
		setTimeout(() => {
			btnStartPosition();
		}, 650);
	} else if (day.value === "" && formGroupSmall) {
		btnEndPosition();
		setEmptyResults();
		setTimeout(() => {
			btnStartPosition();
		}, 650);
	} else if (day.value !== "" && !formGroupSmall) {
		btnEndPosition();
		if (!validateDay(day)) {
			createErrorElement(validDayText, formGroup);
			setEmptyResults();
			setTimeout(() => {
				btnStartPosition();
			}, 650);
		}
	} else if (day.value !== "" && formGroupSmall) {
		removeErrorElement(formGroup);
		if (!validateDay(day)) {
			createErrorElement(validDayText, formGroup);
			setEmptyResults();
			setTimeout(() => {
				btnStartPosition();
			}, 650);
		}
	}
};

const validateYear = (inputYear) => {
	const currentYear = parseInt(currentDate.getFullYear());
	const numYear = parseInt(inputYear.value);

	if (numYear > currentYear || numYear < 0) {
		return false;
	} else {
		return true;
	}
};

const validateMonth = (inputMonth) => {
	const numMonth = parseInt(inputMonth.value);

	if (numMonth > 12 || numMonth < 0) {
		return false;
	} else {
		return true;
	}
};

const validateDay = (inputDay) => {
	const numDay = parseInt(inputDay.value);
	const inputMonth = parseInt(month.value) - 1;
	const inputMonthDaysLength = monthsLength[inputMonth];

	console.log(
		"inputDayF: " + numDay + " | Input month lengthF: " + inputMonthDaysLength
	);

	if (numDay > inputMonthDaysLength || numDay < 0) {
		return false;
	} else {
		return true;
	}
};

//Event Listeners
btn.addEventListener("click", () => {
	yearIsEmpty();
	monthIsEmpty();
	dayIsEmpty();

	if (
		year.value !== "" &&
		month.value !== "" &&
		day.value !== "" &&
		validateYear(year) &&
		validateMonth(month) &&
		validateDay(day)
	) {
		calculateAge();
	}
});

inputs.forEach((input) => {
	input.addEventListener("click", () => {
		btnStartPosition();
	});

	// run click event on btn while pressing enter
	input.addEventListener("keypress", (e) => {
		if (e.key === "Enter") {
			e.preventDefault();

			// When button progress is 100%
			if (btn.style.left.toString() !== "50%") {
				btnStartPosition();
				setTimeout(() => {
					btn.click();
				}, 650);
			} else {
				// When button progress is in the middle
				btn.click();
			}
		}
	});
});

// Global Scope
