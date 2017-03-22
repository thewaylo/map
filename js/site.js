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
var isMobile = false; //initiate as false

// device detection
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
	|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) isMobile = true;
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
	gestureHandling: 'greedy',
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
	locations[index].push(index + 1);
	index++;
	console.log('dataarray=' + locations);
}, function (error) {
	console.log("Error: " + error.code);
});
ref.once('value', function (snapshot) {
	initialDataLoaded = true;
	console.log('data ' + locations.length + 'load finished');
	var infowindow = new google.maps.InfoWindow();
	var bounds = new google.maps.LatLngBounds();
	var marker, i;
	if (isMobile)
		var image = {
			url: 'images/marker.png', // image is 512 x 512
			scaledSize: new google.maps.Size(100, 100)
		};
	else
		var image = {
			url: 'images/marker.png', // image is 512 x 512
			scaledSize: new google.maps.Size(50, 50)
		};
	var shape = {
		coord: [1, 1, 1, 20, 18, 20, 18, 1],
		type: 'poly'
	};
	for (i = 0; i < locations.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			map: map,
			zIndex: locations[i][4],
			icon: image,
			optimized: false
		});
		var myLatLng = new google.maps.LatLng(locations[i][1], locations[i][2]);
		bounds.extend(myLatLng);
		google.maps.event.addListener(marker, 'click', (function (marker, i) {

			return function () {
				console.log("marker click: " + i);
				map.setCenter(marker.getPosition())
				//Call to show data on topbar
				$('#title').text(locations[i][3]);                     //Setting title
				$('#desc').text(locations[i][0]); //Setting description text

				infowindow.setContent(locations[i][3]);//Info popup 
				infowindow.open(map, marker);
			}
		})(marker, i));


	}
	map.setCenter(new google.maps.LatLng(locations[i - 1][1], locations[i - 1][2]))
	map.fitBounds(bounds);
	//used to show as default marker
	new google.maps.event.trigger(marker, 'click');//pops the last item in location array

	hidePrelodaer();
});