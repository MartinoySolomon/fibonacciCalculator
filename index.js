const fibNum = document.getElementById("fibNum");
const resultDiv = document.querySelector(".calculator-result");
const loadingElement = document.querySelector(".loading");
const errorElement = document.querySelector(".error");

fibNum.addEventListener("blur", showResult);

async function showResult() {
	const fiboResult = await getFibonacci(parseInt(fibNum.value));
	console.log(fiboResult);
	// resultDiv.textContent = `${fiboResult.result}`;
}

function showLoading(isShow) {
	loadingElement.classList.toggle("hidden", !isShow);
}

function showError(err) {
	errorElement.classList.remove("hidden");
	errorElement.textContent = err;
	fibNum.classList.add("warning");
}

function hideResult() {
	resultDiv.classList.add("hidden");
}

function hideError() {
	errorElement.classList.add("hidden");
	fibNum.classList.remove("warning");

}
function resetUI() {
	hideError();
	hideResult();
}

async function getFibonacci(number) {
	try {
		resetUI();
		showLoading(true);
		const fetchNumber = await fetch(
			`http://localhost:3000/calculate/${number}`
		);
		if (!fetchNumber.ok) {
			throw new Error("not a number");
		}
		const jsonNumber = await fetchNumber.json();
		resultDiv.classList.remove("hidden");
		resultDiv.textContent = `${jsonNumber.result}`;
		return jsonNumber;
	} catch (err) {
		showError(err);
	} finally {
		showLoading(false);
	}
}



function fibonacci(n){
	if (n==1 || n==2) return 1
	let a=0, b=1 ,temp;
	for (let i=2; i<=n;i++){
		temp=a+b
		a=b
		b=temp
	}
	return b
}

function recursiveFibonacci(n){
	if (n==1 || n==2) return 1
	else
	return recursiveFibonacci(n-1)+recursiveFibonacci(n-2)
}

function binnetFibonacci(n) {
	if (isNaN(n)) return 0;
	else
		return Math.floor(
			(Math.pow(1 + Math.sqrt(5), n) - Math.pow(1 - Math.sqrt(5), n)) /
				(Math.pow(2, n) * Math.sqrt(5))
		);
}
