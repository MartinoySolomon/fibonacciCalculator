const fibNum = document.getElementById("fibNum");
const resultDiv = document.querySelector(".calculator-result");
fibNum.addEventListener("keyup", function () {
	resultDiv.innerHTML = fibonacci(parseInt(fibNum.value));
});

function fibonacci(n) {
	if (isNaN(n)) return 0;
	else
		return Math.floor(
			(Math.pow(1 + Math.sqrt(5), n) - Math.pow(1 - Math.sqrt(5), n)) /
				(Math.pow(2, n) * Math.sqrt(5))
		);
}
console.log('just checking');