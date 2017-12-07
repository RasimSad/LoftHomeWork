/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {

	function getRandomInt(min, max) {
		return Math.floor( Math.random() * ( max - min + 1 )) + min;
	}

	let div = document.createElement('div'),
	    displayWidth = window.innerWidth,
		displayHeight = window.innerHeight,
		width = getRandomInt(0, displayWidth),
		height = getRandomInt(0, displayHeight),
		color = getRandomInt(0, 999999),
		left = displayWidth - div.offsetWidth,
		top = displayHeight - div.offsetHeight;

	div.style.width = width + 'px';
	div.style.height = height + 'px';
	div.style.left = getRandomInt(0, left) + 'px';
	div.style.top = getRandomInt(0, top) + 'px';
	div.style.backgroundColor = '#' + color;
	div.style.position = 'absolute';
	div.classList.add('draggable-div');

	return div;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {
	let parent = target.parentNode;
	parent.onmousedown = function(e) {
        let block = event.target;

		function move(e) {
			block.style.left = e.pageX - block.offsetWidth / 2 + 'px';
			block.style.top = e.pageY - block.offsetHeight / 2 + 'px';
		}

		block.style.zIndex = 1000;
		move(e);
		document.onmousemove = function(e) {
			move(e);
		}
		block.onmouseup = function(e) {
			document.onmousemove = null;
			block.onmousedown = null;
			block.style.zIndex = 100;
		}
	}
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
