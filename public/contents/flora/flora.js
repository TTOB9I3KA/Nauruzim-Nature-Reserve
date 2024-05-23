const leftButton = document.querySelector('.scroll-btn-left');
const rightButton = document.querySelector('.scroll-btn-right');

leftButton.addEventListener('click', function() {
    const floraContainer = document.querySelector('.flora');
    floraContainer.scrollBy({
        left: -500,
        behavior: 'smooth'
    });
});

rightButton.addEventListener('click', function() {
    const floraContainer = document.querySelector('.flora');
    floraContainer.scrollBy({
        left: 500,
        behavior: 'smooth'
    });
});






















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
