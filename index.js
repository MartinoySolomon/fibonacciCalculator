const fibNum = document.getElementById("fibNum");
const resultDiv = document.querySelector(".calculator-result");
const loadingElement = document.querySelector(".loading");
const errorElement = document.querySelector(".error");
const previousResultElement = document.querySelector(
	".prevoius-results-content"
);

document.querySelector(".reset-btn").addEventListener("click", () => {
	location.reload();
});

showPreviousCalc();

fibNum.addEventListener("blur", getFibonacci);

function showResult(number) {
	resultDiv.classList.remove("hidden");
	resultDiv.textContent = `${number}`;
}

function hideResult() {
	resultDiv.classList.add("hidden");
}

function showLoading(isShow) {
	loadingElement.classList.toggle("hidden", !isShow);
}

function showError(err) {
	errorElement.classList.remove("hidden");
	errorElement.textContent = err;
	fibNum.classList.add("warning");
}

function hideError() {
	errorElement.classList.add("hidden");
	fibNum.classList.remove("warning");
}

function resetUI() {
	hideError();
	hideResult();
}

async function getFibonacci() {
	try {
		resetUI();
		showLoading(true);
		const number = parseInt(fibNum.value);
		if (number > 20 && number !== 123)
			throw new Error(`Number must be lower than 20`);
		const response = await fetch(`http://localhost:3000/calculate/${number}`);
		if (!response.ok) {
			const errMsg = await response.text();
			throw new Error(`${response.status} - ${errMsg}`);
		}
		const data = await response.json();
		showResult(data.result);
		showPreviousCalc();
	} catch (err) {
		showError(err.message);
	} finally {
		showLoading(false);
	}
}

async function getPreviousCalc() {
	try {
		showLoading(true);
		const response = await fetch("http://localhost:3000/results");
		if (!response.ok) {
			const errMsg = await response.text();
			throw new Error(`${response.status} - ${errMsg}`);
		}
		const data = await response.json();
		return data.results;
	} catch (err) {
		showError(err);
	} finally {
		showLoading(false);
	}
}

async function showPreviousCalc() {
	try {
		showLoading(true);
		const previousCalc = await getPreviousCalc();
		if (previousCalc == undefined) {
			const errMsg = await previousCalc.text();
			throw new Error(`${previousCalc.status} - ${errMsg}`);
		}
		previousCalc.forEach((element) => {
			const resultLine = document.createElement("div");
			resultLine.classList.add("prevoius-results-line");

			const createdDate = new Date(element.createdDate);
			let minutes = createdDate.getMinutes();
			let month = createdDate.getMonth() + 1;
			if (minutes < 10) minutes = `0${minutes}`;
			const newDateString = `${createdDate.getDate()}/${month}/${createdDate.getFullYear()}  ${createdDate.getHours()}:${minutes}`;

			const prevoiusResult = document.createElement("div");
			prevoiusResult.classList.add("result");
			prevoiusResult.innerHTML = `The Fibonacci of <span>${element.number}</span> is <span>${element.result}</span>`;
			const resultDate = document.createElement("div");
			resultDate.classList.add("result-time");
			resultDate.innerHTML = `${newDateString}`;
			resultLine.appendChild(prevoiusResult);
			resultLine.appendChild(resultDate);
			previousResultElement.appendChild(resultLine);
		});
	} catch (err) {
		showError(err);
	} finally {
		showLoading(false);
	}
}
