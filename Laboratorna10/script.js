const thumbBar = document.querySelector('.thumb-bar');
const displayedImg = document.querySelector('.full-img img');
const btn = document.querySelector('.darken-button');
const overlay = document.querySelector('.overlay');

for (let i = 1; i <= 5; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `images/image${i}.jpg`);
    thumbBar.appendChild(newImage);

    newImage.onclick = function (e) {
        const imgSrc = e.target.getAttribute('src');
        displayedImg.setAttribute('src', imgSrc);
    };
}

btn.onclick = function () {
    const currentClass = btn.getAttribute('class');
    if (currentClass === 'dark') {
        btn.setAttribute('class', 'light');
        btn.textContent = 'Світліше';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    } else {
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Темніше';
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
};
