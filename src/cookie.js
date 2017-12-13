/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');
function createCookie(name, value) {
	document.cookie = '' + name + ' =' + value + '';
}

function isMatching(full, chunk) {
	if ((full.toLowerCase().indexOf(chunk.toLowerCase())) !== -1) {
		return true;
	} else {
		return false;
	}
}

function deleteCookie(name) {
	var date = new Date(0);
	document.cookie = `${name}=;path=/;expires=${date.toUTCString()}`;
}

function print(array) {
	while (listTable.firstChild) {
		listTable.removeChild(listTable.firstChild);
	}
	for (var a = 0; a < array.length; a++) {
		let array2 = array[a].split('=');
		if (isMatching(array2[0], filterNameInput.value)) {
			if ((array2[0].length > 0) || (!array2[1] === undefined)) {
				let tr = document.createElement('tr');
				tr.innerHTML = "<td>" + array2[0] + "</td><td>" + array2[1] + "</td><td><button class='del' value='" + array2[0] + "''>Удалить</button></td>";
				listTable.appendChild(tr);
			}
		}
	}
}

function CookieArr() {

	let array = [],
	    arr = document.cookie.split('; ');

	for (var i = 0; i < arr.length; i++) {
		array.push(arr[i]);
	}

	return array;
}

print(CookieArr());


filterNameInput.addEventListener('keyup', function() {
	print(CookieArr());
})

listTable.addEventListener('click', (event) => {
	if (event.target.tagName === 'BUTTON') {
		deleteCookie(event.target.value);
		print(CookieArr());
	}
})
addButton.addEventListener('click', function() {
	createCookie(addNameInput.value, addValueInput.value);
	print(CookieArr());
})
