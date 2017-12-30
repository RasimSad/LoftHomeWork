var array = [];
let myMap;
let clusterer;
var content = document.getElementById('content');

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
            console.log('клик по карте!');
            container.style.display = 'none';
            let coords = e.get('coords');
            console.log(coords);
            let myGeocoder = ymaps.geocode(coords);
            myGeocoder.then(function(res) {
                let nearest = res.geoObjects.get(0);
                let name = nearest.getAddressLine();
                print(array, name);
                open(e);
                 form = document.getElementById("form");
            form.addEventListener('click', function(event){
                     console.log(event.target);
            })
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
        left = e.get('position')[0] + 'px';
    container.style.top = e.get('position')[1] + 'px';
    container.style.left = e.get('position')[0] + 'px';
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
        return (adr);

    });

}