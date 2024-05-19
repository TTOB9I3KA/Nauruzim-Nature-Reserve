const images = ['./image/заповедник.jpg', './image/зап.svg', './image/kozel1.svg', './image/горы.svg'];
let currentIndex = 0;
const image = document.querySelector('.img');


image.addEventListener('click', () => {
	console.log('sda')
    currentIndex = (currentIndex + 1) % images.length;
    image.src = images[currentIndex];
});

   