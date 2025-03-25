const fibNum = document.getElementById("fibNum");
const resultDiv = document.querySelector(".calculator-result");

fibNum.addEventListener("blur", function () {
	resultDiv.innerHTML = fibonacci(parseInt(fibNum.value));
});

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
