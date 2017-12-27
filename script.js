var array = [];
let myMap;
let clusterer;
new Promise(resolve => ymaps.ready(resolve))
    .then(() => {
        myMap = new ymaps.Map('map', {
            center: [55.753994, 37.622093],
            zoom: 9
        }, {
            searchControlProvider: 'yandex#search'
        });

        clusterer = new ymaps.Clusterer({
            preset: 'islands#invertedVioletClusterIcons',
            clusterDisableClickZoom: true,
            openBalloonOnClick: true
        });

        myMap.geoObjects.add(clusterer);

        myMap.events.add('click', function(e) {
            var content = document.getElementById('content');
            content.innerHTML = '';
            var coords = e.get('coords');
            myPlacemark = new ymaps.Placemark(coords, {
            preset: 'islands#violetDotIconWithCaption',
            iconColor: '#0095b6',
            }, {
            balloonCloseButton: true,
            hideIconOnBalloonOpen: false
            });
            clusterer.add(myPlacemark);
            container.style.display = 'block';
            let top = e.get('position')[1] + 'px',
                left = e.get('position')[0] + 'px';
            container.style.top = e.get('position')[1] + 'px';
            container.style.left = e.get('position')[0] + 'px';
            getAddress(coords);
        });

        var container = document.getElementById('container');

        container.addEventListener('click', function(e) {
            if (e.target.tagName == 'BUTTON') {
                let obj = {},
                    userName = document.getElementById('name'),
                    userPlace = document.getElementById('place'),
                    userText = document.getElementById('text'),
                    adr = adres.innerHTML;

                obj.userAddress = adres.innerHTML,
                obj.userName = userName.value,
                obj.userPlace = userPlace.value,
                obj.userText = userText.value;

                document.getElementById('name').value = '';
                document.getElementById('place').value = '';
                document.getElementById('text').value = '';

                array.push(obj);
                print(array, adr);
            }
            if (e.target.id == 'close') {
                container.style.display = 'none';
            }
        })



    })

function print(arr, address) {
    let arr2 = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].userAddress == address) {
            arr2.push(arr[i]);
        }
    }
    let template = document.querySelector('#user-template').textContent,
        render = Handlebars.compile(template),
        result = document.getElementById('content');
    result.innerHTML = '';
    html = render({
        arr2: arr2
    });
    result.innerHTML = html;
}


function createPlacemark(coords) {
    return new ymaps.Placemark(coords, {
        preset: 'islands#violetDotIconWithCaption',
        iconColor: '#0095b6',
    }, {
        balloonCloseButton: true,
        hideIconOnBalloonOpen: false
    });

}


function getAddress(coord) {
    var myGeocoder = ymaps.geocode(coord);
    myGeocoder.then(function(res) {
            var nearest = res.geoObjects.get(0);
            var name = nearest.getAddressLine();
            adres.innerHTML = name;
        }
    );
}