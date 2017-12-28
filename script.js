var array = [];
let myMap;
let clusterer;
new Promise(resolve => ymaps.ready(resolve))
    .then(() => {
        myMap = new ymaps.Map('map', {
            center: [55.753994, 37.622093],
            zoom: 16
        }, {
            searchControlProvider: 'yandex#search'
        });

        clusterer = new ymaps.Clusterer({
            preset: 'islands#invertedVioletClusterIcons',
            clusterDisableClickZoom: true,
            openBalloonOnClick: true,
            clusterBalloonContentLayout: 'cluster#balloonCarousel'
        });

        myMap.geoObjects.add(clusterer);

        myMap.events.add('click', function(e) {
            var content = document.getElementById('content');
            content.innerHTML = '';
            let coords = e.get('coords');
            myPlacemark = new ymaps.Placemark(coords, {
                preset: 'islands#violetDotIconWithCaption',
                iconColor: '#0095b6',
            }, {
                balloonCloseButton: true,
                openBalloonOnClick: false,
                hideIconOnBalloonOpen: false
            });
            clusterer.add(myPlacemark);
            open(e);
            getAddress(coords);
            let adr = adres.innerHTML;
            print(array, adr);

            myPlacemark.events.add('click', function(e) {
                open(e);
                let coords2 = e.get('coords'),
                    adr = adres.innerHTML;
                getAddress(coords2);
                print(array, adr);
            });
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
                let adr = adres.innerHTML;
                if (!remove(array, adr)){
                    clusterer.remove(myPlacemark);
                }

            }
        })
    })
function remove (arr, address){
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].userAddress == address){
            return true;
        }
    }
}
function open(e) {
    container.style.display = 'block';
    let top = e.get('position')[1] + 'px',
        left = e.get('position')[0] + 'px';
    container.style.top = e.get('position')[1] + 'px';
    container.style.left = e.get('position')[0] + 'px';
}

function print(arr, address) {
var result = document.getElementById('content');
 let arr2 = [];
    if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].userAddress == address) {
                arr2.push(arr[i]);
            }
            ///  myPlacemark.properties
            //    .set({
            //        balloonContentHeader: arr[i].userAddress,
            //   });
        }
        let template = document.querySelector('#user-template').textContent,
            render = Handlebars.compile(template);

        result.innerHTML = '';
        html = render({
            arr2: arr2
        });
        result.innerHTML = html;
        // myPlacemark.properties
        //   .set({
        //       balloonContent: html,
        ///   });
    } else {
        result.innerHTML = 'Пока нет ни одного отзыва';
    }
  
}

function getAddress(coord) {
    var myGeocoder = ymaps.geocode(coord);
    var adr;
    myGeocoder.then(function(res) {
        var nearest = res.geoObjects.get(0);
        var name = nearest.getAddressLine();
        adres.innerHTML = name;
        adr = name;
        myPlacemark.properties
            .set({
                balloonContent: name
            });
    return(adr);

    });
    
}