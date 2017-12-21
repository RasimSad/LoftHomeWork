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

function PrintFriends(friend, list) {
	let friendsList = document.getElementById('friendsList'),
		result = document.getElementById('result'),
		template = document.querySelector('#user-template').textContent,
		template2 = document.querySelector('#user-template2').textContent,
		render = Handlebars.compile(template),
		render2 = Handlebars.compile(template2),
		html = render(friend),
		html2 = render2(list);
	result.innerHTML = html;
	friendsList.innerHTML = html2;
	for (let b = 0; b < friend.items.length; b++) {
		let filter = document.getElementById(friend.items[b].id);
		filter.style.display = 'block';
		if (!isMatching(friend.items[b].first_name, nameFrends.value)) {
			filter.style.display = 'none';
		}
	}
	for (let b = 0; b < list.items.length; b++) {
		let filter = document.getElementById(list.items[b].id);
		filter.style.display = 'block';
		if (!isMatching(list.items[b].first_name, nameList.value)) {
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
		var friend = document.getElementById("myfriends");
		var myList = document.getElementById("list");
		var main = document.getElementById("main");
		var list = [];
		var list2 = [];
		results.innerHTML = html;
		result.addEventListener('click', function(e) {
			if (e.target.className == 'plus') {
				for (var i = 0; i < friends.items.length; i++) {
					if (friends.items[i].id == e.target.name) {
						list.push(friends.items[i]);
						friends.items.splice(i, 1);
					}
				}
				list2['items'] = list;
				PrintFriends(friends, list2);
			}

		})
		friendsList.addEventListener('click', function(e) {
			if (e.target.className == 'remove') {
				for (var a = 0; a < list2.items.length; a++) {
					if (list2.items[a].id == e.target.name) {
						friends.items.push(list2.items[a]);
						list2.items.splice(a, 1);
						PrintFriends(friends, list2);
					}
				}
			}

		})
		nameFrends.addEventListener('keyup', function() {
			PrintFriends(friends, list2);

		})

		nameList.addEventListener('keyup', function() {
			PrintFriends(friends, list2);
		})

		friend.addEventListener('mousedown', function(e) {
            //console.log(e.target.tagName);
			if (!e.target.tagName == 'INPUT'){
				console.log('INPUT');
			
			if (e.target.tagName == 'DIV'){
				console.log('DIV');
			}}

			if (e.target.tagName == 'DIV') {
				var block = e.target;
			} else {
				var block = e.target.parentNode;
			}
			function move(e) {
				block.style.left = e.pageX - block.offsetWidth / 2 + 'px';
				block.style.top = e.pageY - block.offsetHeight / 2 + 'px';
			}
			block.style.position = 'absolute';
			block.style.zIndex = 1000;
			move(e);
			document.onmousemove = function(e) {
				move(e);
			}
			block.onmouseup = function(e) {
				let BlockCoord = block.getBoundingClientRect();
				let ListCoord = myList.getBoundingClientRect();
				if ((BlockCoord.top > ListCoord.top-10) && (BlockCoord.bottom < ListCoord.bottom+10) && (BlockCoord.left > ListCoord.left-10) && (BlockCoord.right < ListCoord.right+10)){
					console.log(block.id);
						for (var i = 0; i < friends.items.length; i++) {
					if (friends.items[i].id == block.id) {
						list.push(friends.items[i]);
						list2['items'] = list;
						friends.items.splice(i, 1);
					}
				}
				PrintFriends(friends, list2);
				}
				else {
                    block.style.position = ''; 
				}
				
			}


//}
		})

	} catch (e) {
		console.error(e);
	}
})();