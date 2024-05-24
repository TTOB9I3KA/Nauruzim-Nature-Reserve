const leftButton = document.querySelector('.scroll-btn-left');
const rightButton = document.querySelector('.scroll-btn-right');
const floraContainer = document.querySelector('.fauna');

leftButton.addEventListener('click', function() {
    floraContainer.scrollBy({
        left: -500,
        behavior: 'smooth'
    });
});

rightButton.addEventListener('click', function() {
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

// Проверяем видимость кнопок прокрутки при загрузке страницы
window.onload = function() {
    checkScrollButtonsVisibility();
};

// Проверяем видимость кнопок прокрутки при прокрутке контейнера
floraContainer.addEventListener('scroll', checkScrollButtonsVisibility);

function checkScrollButtonsVisibility() {
    const maxScrollLeft = floraContainer.scrollWidth - floraContainer.clientWidth;

    if (floraContainer.scrollLeft <= 0) {
        leftButton.disabled = true;
    } else {
        leftButton.disabled = false;
    }

    if (floraContainer.scrollLeft >= maxScrollLeft) {
        rightButton.disabled = true;
    } else {
        rightButton.disabled = false;
    }
}
