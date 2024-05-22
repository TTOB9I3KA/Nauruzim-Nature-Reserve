// const images = ['./image/заповедник.jpg', './image/зап.svg', './image/kozel1.svg', './image/горы.svg'];
// let currentIndex = 0;
// const image = document.querySelector('.img');


// image.addEventListener('click', () => {
// 	console.log('sda')
//     currentIndex = (currentIndex + 1) % images.length;
//     image.src = images[currentIndex];
// });

document.addEventListener("DOMContentLoaded", function(event) {
	var textElement = document.querySelector(".welcome-text-animation");
	var buttonElement = document.querySelector(".welcome-button-animation");

	var options = {
		threshold: 0.5
	};

	var textObserver = new IntersectionObserver(function(entries, observer) {
		entries.forEach(function(entry) {
			if (entry.isIntersecting) {
				entry.target.classList.add("slideInFromTop");
			} else {
				entry.target.classList.remove("slideInFromTop");
			}
		});
	}, options);

	textObserver.observe(textElement);

	var buttonObserver = new IntersectionObserver(function(entries, observer) {
		entries.forEach(function(entry) {
			if (entry.isIntersecting) {
				entry.target.classList.add("slideInFromBottom");
			} else {
				entry.target.classList.remove("slideInFromBottom");
			}
		});
	}, options);

	buttonObserver.observe(buttonElement);
});