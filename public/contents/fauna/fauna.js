const leftButton = document.querySelector('.scroll-btn-left');
const rightButton = document.querySelector('.scroll-btn-right');

leftButton.addEventListener('click', function() {
    const floraContainer = document.querySelector('.fauna');
    floraContainer.scrollBy({
        left: -500,
        behavior: 'smooth'
    });
});

rightButton.addEventListener('click', function() {
    const floraContainer = document.querySelector('.fauna');
    floraContainer.scrollBy({
        left: 500,
        behavior: 'smooth'
    });
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





















// function scrollLeft() {
// 	console.log('GGG')
//     const floraContainer = document.getElementById('flora');
//     floraContainer.scrollLeft({
//         left: -500, // Adjust the scroll distance as needed
//         behavior: 'smooth'
//     });
// }

// function scrollRight() {
// 	console.log('JJJ')
//     const floraContainer = document.getElementById('flora');
//     floraContainer.scrollBy({
//         left: 500, // Adjust the scroll distance as needed
//         behavior: 'smooth'
//     });
// }
