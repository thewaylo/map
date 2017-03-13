function getAllUrlParams(url) {

    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        var arr = queryString.split('&');

        for (var i = 0; i < arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');

            // in case params look like: list[]=thing1&list[]=thing2
            var paramNum = undefined;
            var paramName = a[0].replace(/\[\d*\]/, function (v) {
                paramNum = v.slice(1, -1);
                return '';
            });

            // set parameter value (use 'true' if empty)
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

            // (optional) keep case consistent
            paramName = paramName.toLowerCase();
            paramValue = paramValue.toLowerCase();

            // if parameter name already exists
            if (obj[paramName]) {
                // convert value to array (if still string)
                if (typeof obj[paramName] === 'string') {
                    obj[paramName] = [obj[paramName]];
                }
                // if no array index number specified...
                if (typeof paramNum === 'undefined') {
                    // put the value on the end of the array
                    obj[paramName].push(paramValue);
                }
                // if array index number specified...
                else {
                    // put the value at that index number
                    obj[paramName][paramNum] = paramValue;
                }
            }
            // if param name doesn't exist yet, set it
            else {
                obj[paramName] = paramValue;
            }
        }
    }

    return obj;
}

$(document).ready(function () {

    console.log(window.location.href);
    console.log(getAllUrlParams().uid);
    $('#fixed').on('mousewheel touchmove', function (e) {
        e.preventDefault();
    });

});

var locations = [[]];


console.log("location array=" + locations);
var map = new google.maps.Map(document.getElementById('map'), {

    zoom: 15,   //Define the zoom level on map

    center: new google.maps.LatLng(0, 0),
    mapTypeId: google.maps.MapTypeId.ROADMAP
});

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
    apiKey: "AIzaSyCMgfeAgj68WuGexSr0GKzWy3C-x2fsICY",
    authDomain: "botest-1697a.firebaseapp.com",
    databaseURL: "https://botest-1697a.firebaseio.com",
    storageBucket: "botest-1697a.appspot.com",

};
firebase.initializeApp(config);
var uid = getAllUrlParams().uid;
var ref = firebase.database().ref('/users/' + uid + '/hotelMapParam');
console.log('uid=' + uid);
var initialDataLoaded = false;
var index = 0;
ref.on("child_added", function (snapshot) {
    //console.log(snapshot.val());
    locations[index] = [];
    var child_data = snapshot.val();
    var desc = child_data['description'];
    var lat = child_data['lat']
    var lon = child_data['long']
    var name = child_data['name']
    locations[index].push(desc);
    locations[index].push(lat);
    locations[index].push(lon);
    locations[index].push(name);
    index++;
    console.log('dataarray=' + locations);
}, function (error) {
    console.log("Error: " + error.code);
});
ref.once('value', function (snapshot) {
    initialDataLoaded = true;
    console.log('data ' + locations.length + 'load finished');
    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {

            return function () {
                console.log("marker click: " + i);
                map.panTo(marker.getPosition())
                //Call to show data on topbar
                $('#title').text(locations[i][3]);                     //Setting title
                $('#desc').text(locations[i][0]); //Setting description text

                infowindow.setContent(locations[i][3]);//Info popup 
                infowindow.open(map, marker);
            }
        })(marker, i));


    }
    map.setCenter(new google.maps.LatLng(locations[i - 1][1], locations[i - 1][2]))
    //used to show as default marker
    new google.maps.event.trigger(marker, 'click');//pops the last item in location array
    hidePrelodaer();
});