const fibNum = document.getElementById("fibNum");
const resultDiv = document.querySelector(".calculator-result");
const loadingElement = document.querySelector(".loading");

fibNum.addEventListener("blur", showResult);

async function showResult() {
	const fiboResult = await getFibonacci(parseInt(fibNum.value));
	resultDiv.classList.remove("hidden");
	resultDiv.textContent = `${fiboResult.result}`;
}

function showLoading(isShow) {
	loadingElement.classList.toggle("hidden", !isShow);
}

function hideResult() {
	resultDiv.classList.add("hidden");
}

async function getFibonacci(number) {
	try {
		hideResult();
		showLoading(true);
		const fetchNumber = await fetch(
			`http://localhost:3000/calculate/${number}`
		);
		if (!fetchNumber.ok) {
			throw new Error("not a number");
		}
		const jsonNumber = await fetchNumber.json();
		console.log(jsonNumber);
		return jsonNumber;
	} catch (err) {
		console.log("error", err);
	} finally {
		showLoading(false);
	}
}
