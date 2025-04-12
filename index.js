const fibNum = document.getElementById("fibNum");
const resultDiv = document.querySelector(".calculator-result");
const loadingElement = document.querySelector(".loading");
const errorElement = document.querySelector(".error");
document.querySelector(".reset-btn").addEventListener("click", () => {
	location.reload();
});

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
	} catch (err) {
		showError(err.message);
	} finally{
		showLoading(false);
	}
}
