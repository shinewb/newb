const body = document.querySelector("body");

const IMG_NUMBER = 5;

function paintImg(imgNumber) {
	const image = new Image();
	image.src = `images/${imgNumber}.jpg`;
	body.appendChild(image);
	image.classList.add("bgImg");
}

function getNum() {
	const getRandomNum = Math.floor(Math.random()*IMG_NUMBER);
	return getRandomNum;
}

function init() {
	const randomNum = getNum();
	paintImg(randomNum);
}

init();
