const askToDo = document.querySelector(".js-askToDo"),
	inputToDo = askToDo.querySelector("input"),
	toDoList = document.querySelector(".js-toDoList"),
	secondCard = document.querySelector(".secondCard"),
	toDoBtn = document.querySelector(".toDoBtn");

const showing_CN = "showing";
const showSecondCard = "show";
const TODO_LS = "toDo";
let listArray = [];

function saveLS () {
	localStorage.setItem(TODO_LS,JSON.stringify(listArray));
}

function delList(event){
	const selectedBtn = event.target;
	const selectedLi = selectedBtn.parentNode;
	const newArray = listArray.filter(function(potato){
		return potato.id !== parseInt(selectedLi.id);
	});
	listArray = newArray;
	toDoList.removeChild(selectedLi);
	saveLS();
}

function showMeList (toDo, id) {
	toDoList.classList.add(showing_CN);
	const span = document.createElement("span");
	const delBtn = document.createElement("button");
	const li = document.createElement("li");
	span.innerText = toDo;
	delBtn.innerText = "❌";
	toDoList.appendChild(li);
	li.appendChild(span);
	li.appendChild(delBtn);
	li.id = id;
	const listObj = {
		text: toDo,
		id: id,
		}
	listArray.push(listObj);
	saveLS();
	inputToDo.value = "";
	delBtn.addEventListener("click",delList);
}

function handleSubmit (event){
	event.preventDefault();
	const currentToDo = inputToDo.value;
	const newId = Math.floor(Math.random()*10000000000);
	showMeList(currentToDo, newId);
}

function startToDo() {
	askToDo.classList.add(showing_CN);
	const list_LS= localStorage.getItem(TODO_LS);
	const parsed_LS = JSON.parse(list_LS);
	askToDo.addEventListener("submit",handleSubmit);
	if ( parsed_LS !== null && listArray.length === 0) {
			parsed_LS.forEach(function(potato){
			const savedToDo = potato.text;
			const savedId = potato.id;
			showMeList(savedToDo, savedId);
		});
	}
}

function init() {
	const showingStatus = document.querySelector(".show");
	if (showingStatus===null) {
		secondCard.classList.add(showSecondCard);
		startToDo();
	} else {
		secondCard.classList.remove(showSecondCard);
	}
}

toDoBtn.addEventListener("click",init);