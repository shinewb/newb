const greeting = document.querySelector(".js-greeting"),
	nameForm = document.querySelector(".js-nameForm"),
	input = nameForm.querySelector("input");
const clock = document.querySelector(".js-clock");

const USERNAME_JS = "NAME";
const SHOWING_CN = "showing";

function setLS (text) {
	localStorage.setItem(USERNAME_JS,text);
}

function showTime() {
	const nowTime = new Date();
	const hours = nowTime.getHours();
	const mins = nowTime.getMinutes();
	clock.innerText = `${hours<10?`0${hours}`:hours}:${mins<10?`0${mins}`:mins}`;
}

function greetingUser(text) {
	clock.classList.add("clock");
	showTime();
	setInterval(showTime,1000);
	greeting.classList.add(SHOWING_CN);
	const time = new Date();
	const hours = time.getHours(); 
	if ( 0<= hours && hours < 12) {
		greeting.innerText = `Good morning, ${text}.`;
	} else if ( 12 <= hours && hours < 18) {
		greeting.innerText = `Good afternoon, ${text}.`;
	} else {
		greeting.innerText = `Good evening, ${text}.`;
	}
}

function showGreeting (event) {
	event.preventDefault();
	nameForm.classList.remove(SHOWING_CN);
	const currentUser = input.value;
	greetingUser(currentUser);
	setLS(currentUser);
}

function init() {
	const savedUser = localStorage.getItem(USERNAME_JS);
	if ( savedUser === null ) {
		nameForm.classList.add(SHOWING_CN);
		nameForm.addEventListener("submit",showGreeting);
	} else {
		greetingUser(savedUser);
	}
}

init();