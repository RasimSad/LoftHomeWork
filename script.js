var array = [];
let myMap;
let clusterer;
var coordinate;
var content = document.getElementById('content');

new Promise(resolve => ymaps.ready(resolve))
    .then(() => {
        myMap = new ymaps.Map('map', {
            center: [55.753994, 37.622093],
            zoom: 16
        }, {
            searchControlProvider: 'yandex#search'
        });
         MyBalloonLayout = ymaps.templateLayoutFactory.createClass('<h2 class=ballon_header>{{properties.balloonContentHeader|raw }}</h2>' +
    '<div class=ballon_address><a href="#" id="link">{{properties.balloonContentAddress|raw }}</a></div>' +
    '<div class=ballon_text>{{properties.balloonContentText|raw }}</div>' +
    '<div class=ballon_footer>{{properties.balloonContentFooter|raw }}</div>', {
        build: function () {
            MyBalloonLayout.superclass.build.call(this);
            let test =document.getElementById('link');
            test.addEventListener('click', (e) => {
                console.log(e.target.innerHTML);
                print(array, e.target.innerHTML);
                open2(e);
                myMap.balloon.close();
            })
        }
    });

        clusterer = new ymaps.Clusterer({
            preset: 'islands#invertedVioletClusterIcons',
            clusterDisableClickZoom: true,
            openBalloonOnClick: true,
            clusterBalloonContentLayout: 'cluster#balloonCarousel',
            clusterBalloonItemContentLayout: MyBalloonLayout
        });

        myMap.geoObjects.add(clusterer);
        addButon = document.getElementById('add');
        closeButon = document.getElementById('close');
        addButon.addEventListener('click', function() {
            let obj = {},
                userName = document.getElementById('name'),
                userPlace = document.getElementById('place'),
                userText = document.getElementById('text'),
                adr = adres.innerHTML;
            if ((!userName.value == '') && (!userPlace.value == '') && (!userText.value == '')) {
                myPlacemark = new ymaps.Placemark(coordinate, {
                    preset: 'islands#violetDotIconWithCaption',
                    iconColor: '#0095b6',
                }, {
                    balloonCloseButton: true,
                    openBalloonOnClick: false,
                    hideIconOnBalloonOpen: false,
                });
                clusterer.add(myPlacemark);


                myPlacemark.events.add('click', function(events) {
                    coordinate = events.get('coords');
                    var myGeocoder2 = new ymaps.geocode(coordinate);
                    myGeocoder2.then(function(result) {
                            var nearest2 = result.geoObjects.get(0);
                            var name2 = nearest2.getAddressLine();
                            console.log(array, name2);
                            print(array, name2);
                            open(events);
                        },
                        error => {
                            console.log("Ошибка: " + error);
                        }
                    )

                });
                var l = new Date();
                obj.time = l.toLocaleString();
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

        })
      
        closeButon.addEventListener('click', function() {
            container.style.display = 'none';
        })
        myMap.events.add('click', function(e) {
            let container = document.getElementById('container');
            container.style.display = 'none';
            var coords = e.get('coords');
            coordinate = coords;
            console.log(coords);


            let myGeocoder = ymaps.geocode(coords);
            myGeocoder.then(function(res) {
                let nearest = res.geoObjects.get(0);
                let name = nearest.getAddressLine();
                console.log(array, name)
                print(array, name);
                open(e);



            });
        });

    })

function remove(arr, address) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].userAddress == address) {
            return true;
        }
    }
}

function open(e) {
    container.style.display = 'block';
    let top = e.get('position')[1] + 'px',
        left = e.get('position')[0] + 'px',
        form = document.getElementById("form");
    container.style.top = e.get('position')[1] + 'px';
    container.style.left = e.get('position')[0] + 'px';
}

function open2(e) {
    container.style.display = 'block';
    container.style.top = event.clientY + 'px';
    container.style.left = event.clientX + 'px';
}


function print(arr, address) {
    var adress = document.getElementById('adres');
    adress.innerHTML = address;
    var result = document.getElementById('content');
    let arr2 = [];
    if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].userAddress == address) {
                arr2.push(arr[i]);
            }
            let str = '<a href="#">' + arr[i].userAddress + '</a><br><span class="userText"' + arr[i].userText + '</span>' +'';
             myPlacemark.properties
                .set({
                    balloonContentHeader: arr[i].userPlace,
                    balloonContentAddress: arr[i].userAddress,
                    balloonContentText: arr[i].userText,
                    balloonContentFooter: arr[i].time
               });

        }
        if (arr2.length == 0) {
            result.innerHTML = '<div id="content">Пока нет ни одного отзыва</div>';
        } else {
            let template = document.querySelector('#user-template').textContent,
                render = Handlebars.compile(template);

            result.innerHTML = '';
            html = render({
                arr2: arr2
            });
            result.innerHTML = html;

        }
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
        return (adr);

    });

}