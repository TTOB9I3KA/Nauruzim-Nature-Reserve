function scrollLeft() {
	const floraContainer = document.getElementById('flora');
	floraContainer.scrollBy({
			left: -400, // Adjust the scroll distance as needed
			behavior: 'smooth'
	});
}

function scrollRight() {
	const floraContainer = document.getElementById('flora');
	floraContainer.scrollBy({
			left: 400, // Adjust the scroll distance as needed
			behavior: 'smooth'
	});
}
