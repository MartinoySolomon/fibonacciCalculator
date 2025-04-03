const fibNum = document.getElementById("fibNum");
const resultDiv = document.querySelector(".calculator-result");
const loadingElement=document.querySelector(".loading");

fibNum.addEventListener("blur", showResult);

function showResult() {
	resultDiv.classList.remove("hidden");
	resultDiv.innerHTML = fibonacci(parseInt(fibNum.value));
};

function fibonacci(n) {
	if (n <= 0 || isNaN(n)) hideResult();
	else if (n == 1 || n == 2) return 1;
	else {
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
}

function showLoading(isShow) {
	loadingElement.classList.toggle("hidden", !isShow);
}


function hideResult() {
	resultDiv.classList.add("hidden");
}