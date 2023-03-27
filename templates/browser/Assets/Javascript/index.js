const counterDownButton = document.getElementById('minusButton');
const counterUpButton = document.getElementById('plusButton');
const counterValue = document.getElementById('counterValue');

let count = 0;

// Increment the count value 1 by 1 and display on the page
counterDownButton.addEventListener('click', () => {
	count--;
	counterValue.textContent = count;
});

// Decrement the count value 1 by 1 and display on the page
counterUpButton.addEventListener('click', () => {
	count++;
	counterValue.textContent = count;
});
