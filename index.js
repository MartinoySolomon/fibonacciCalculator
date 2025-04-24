const fibNum = document.getElementById("fibNum");
const resultDiv = document.querySelector(".calculator-result");
const loadingElement = document.querySelector(".loading");
const errorElement = document.querySelector(".error");
const save = document.getElementById("save");
const ascRadio = document.getElementById("asc");
const descRadio = document.getElementById("desc");

const previousResultElement = document.querySelector(
	".prevoius-results-content"
);

document.querySelector(".reset-btn").addEventListener("click", () => {
	location.reload();
});

showPreviousCalc();

fibNum.addEventListener("blur", getFibonacci);
ascRadio.addEventListener("change", () => {
	resetUI();
	showPreviousCalc();
});
descRadio.addEventListener("change", () => {
	resetUI();
	showPreviousCalc();
});

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

function forFibonacci(n) {
	if (n == 1 || n == 2) return 1;
	let a = 0,
		b = 1,
		temp;
	for (let i = 2; i <= n; i++) {
		temp = a + b;
		a = b;
		b = temp;
	}
	return b;
}

async function getFibonacci() {
	try {
		resetUI();
		showLoading(true);
		const number = parseInt(fibNum.value);
		if (number > 20 && number !== 123)
			throw new Error(`Number must be lower than 20`);
		if (save.checked == true) {
			const response = await fetch(`http://localhost:3000/calculate/${number}`);
			if (!response.ok) {
				const errMsg = await response.text();
				throw new Error(`${response.status} - ${errMsg}`);
			}
			const data = await response.json();
			showResult(data.result);
			showPreviousCalc();
		} else {
			if (!number) throw new Error(`Please enter a number to calculate`);
			else if (number <= 0) throw new Error(`Number must be bigger than 0`);
			else if (number==123) throw new Error(`Number must be lower than 20`);
			else showResult(forFibonacci(number));
		}
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
		if (descRadio.checked == true) previousCalc.reverse();
		previousResultElement.innerHTML = "";
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
