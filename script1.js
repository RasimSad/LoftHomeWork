// 1) регистрация приложения -> получение api id
// 2) авторизоваться на сайте
//   - открыть окно с запросом прав
//   - разрешить выполнять действия от нашего имени
var nameFrends = document.querySelector('#name');
var nameList = document.querySelector('#name2');
var friends = [];
VK.init({
	apiId: 6301007
});

function auth() {
	return new Promise((resolve, reject) => {
		VK.Auth.login(data => {
			if (data.session) {
				resolve();
			} else {
				reject(new Error('Не удалось авторизоваться'));
			}
		}, 2);
	});
}

function callAPI(method, params) {
	params.v = '5.69';

	return new Promise((resolve, reject) => {
		VK.api(method, params, (data) => {
			if (data.error) {
				reject(data.error);
			} else {
				resolve(data.response);
			}
		});
	})
}

function addList(list, type) {
	if (type == 'add'){
		let friendsList = document.getElementById('friendsList');
		let template = document.querySelector('#user-template2').textContent;
		let render = Handlebars.compile(template);
		let html = render(list);
		friendsList.innerHTML = html;
			}
		for (var b = 0; b < list.items.length; b++) {
		var nameFrends = document.querySelector('#name');
		console.log(nameFrends.value);
		let filter = document.getElementById(list.items[b].id);
		filter.style.display = 'block';
		if (!isMatching(list.items[b].first_name, nameFrends.value)) {
			filter.style.display = 'none';
			console.log('совпадений нет');
		}
		}
	}
	function removeList(list, type) {
		if (type == 'remove'){
		let template = document.querySelector('#user-template').textContent;
		let render = Handlebars.compile(template);
		let html = render(list);
		let results = document.querySelector('#result');
		while (results.firstChild) {
			results.removeChild(results.firstChild);
		}
		results.innerHTML = html;
	}
	for (var c = 0; c < list.items.length; c++) {
		var nameList = document.querySelector('#name2');
		console.log(nameList.value);
		let filter = document.getElementById(list.items[c].id);
		console.log(filter)
		filter.style.display = 'block';
		if (!isMatching(list.items[c].first_name, nameList.value)) {
			filter.style.display = 'none';
		}
		}
}

function isMatching(full, chunk) {
	if ((full.toLowerCase().indexOf(chunk.toLowerCase())) !== -1) {
		return true;
	} else {
		return false;
	}
}


(async () => {
	try {
		await auth();
		
		friends = await callAPI('friends.get', {
			fields: 'city,country, photo_100'
		});
		const template = document.querySelector('#user-template').textContent;
		const render = Handlebars.compile(template);
		const html = render(friends);
		const results = document.querySelector('#result');
		const friendsList = document.querySelector('#friendsList');
		var list = [];
		var list2 = [];
		results.innerHTML = html;
		result.addEventListener('click', function(e) {
			if (e.target.className == 'plus') {
				for (var i = 0; i < friends.items.length; i++) {
					if (friends.items[i].id == e.target.name) {
						list.push(friends.items[i]);
						friends.items.splice(i, 1);
						e.target.parentNode.parentNode.removeChild(e.target.parentNode);
					}
				}
				list2['items'] = list;
				addList(list2, 'add');
			}

		})
		friendsList.addEventListener('click', function(e) {
			if (e.target.className == 'remove') {
				for (var a = 0; a < list2.items.length; a++) {
					if (list2.items[a].id == e.target.name) {
						friends.items.push(list2.items[a]);
						addList(friends, 'remove');
						e.target.parentNode.parentNode.removeChild(e.target.parentNode);
						list2.items.splice(a, 1);;
						removeList(list2, 'add');
					}
				}
			}

		})
		nameFrends.addEventListener('keyup', function() {
			addList(friends);
			
		})

		nameList.addEventListener('keyup', function() {
            removeList(list2);
		})

	} catch (e) {
		console.error(e);
	}
})();