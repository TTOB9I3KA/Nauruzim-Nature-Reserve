function setupAnimationReset(element, animationClass) {
	const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
					if (entry.isIntersecting) {
							// Add the animation class when the element is in the viewport
							element.classList.add('animate');
					} else {
							// Remove the animation class when the element leaves the viewport
							element.classList.remove('animate');
							// Trigger reflow to reset animation (forcing reflow)
							void element.offsetWidth;
					}
			});
	});

	observer.observe(element);
}

// Example usage
document.addEventListener('DOMContentLoaded', () => {
	const welcomeText = document.querySelector('.welcome-text-animation');
	const signUpButton = document.querySelector('.welcome-button-animation');

	setupAnimationReset(welcomeText, 'slideInFromTop');
	setupAnimationReset(signUpButton, 'slideInFromBottom');
});

function toggleDropdown() {
	document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
	if (!event.target.matches('.dropbtn')) {
			var dropdowns = document.getElementsByClassName("dropdown-content");
			for (var i = 0; i < dropdowns.length; i++) {
					var openDropdown = dropdowns[i];
					if (openDropdown.classList.contains('show')) {
							openDropdown.classList.remove('show');
					}
			}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

	const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
					if (entry.isIntersecting) {
							if (entry.target.tagName === 'H1') {
									entry.target.classList.add('slide-in-top');
							} else if (entry.target.tagName === 'P') {
									entry.target.classList.add('fade-in');
							} else if (entry.target.tagName === 'IMG') {
									entry.target.classList.add('slide-in-left');
							}
					} else {
							entry.target.classList.remove('slide-in-top', 'fade-in', 'slide-in-left');
							// Reset animation by forcing reflow
							void entry.target.offsetWidth;
					}
			});
	}, { threshold: 0.1 });

	elementsToAnimate.forEach(element => {
			observer.observe(element);
	});
});


document.addEventListener('DOMContentLoaded', () => {
	const elementsToAnimate = document.querySelectorAll('.animate-on-scroll--date');

	const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
					if (entry.isIntersecting) {
							entry.target.classList.add('animate');
					} else {
							entry.target.classList.remove('animate');
							// Reset animation by forcing reflow
							void entry.target.offsetWidth;
					}
			});
	}, { threshold: 0.1 });

	elementsToAnimate.forEach(element => {
			observer.observe(element);
	});
});

document.addEventListener('DOMContentLoaded', () => {
	const elementsToAnimate = document.querySelectorAll('.date--animate-on-scroll');

	const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
					if (entry.isIntersecting) {
							entry.target.classList.add('animate');
					} else {
							entry.target.classList.remove('animate');
							// Reset animation by forcing reflow
							void entry.target.offsetWidth;
					}
			});
	}, { threshold: 0.1 });

	elementsToAnimate.forEach(element => {
			observer.observe(element);
	});
});

