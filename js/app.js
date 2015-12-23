var initialLocations = [
	{
		name: 'Bracher Park',
		lat: 37.370,
		long: -122.002
	},
	{
		name: 'Hacker Dojo',
		lat: 37.402,
		long: -122.052
	}

]

var map = {
	init: function() {
		this.map = new google.maps.Map(document.getElementById('map'), {
			zoom: 12,
			center: {lat: 37.370, lng: -122.002}
		});

		var mapElem = document.getElementById('map');
		mapElem.style.height = window.innerHeight - 50;
	}
}

var Location = function(data) {
	this.name = ko.observable(data.name);
	this.lat = ko.observable(data.lat);
	this.long = ko.observable(data.long);

	// Marker code grabbed from http://jsfiddle.net/t9wcC/
	var marker = new google.maps.Marker({
        position: new google.maps.LatLng(data.lat, data.long),
        title: data.name,
        map: map,
        draggable: true
    });

    google.maps.event.addListener(marker, 'drag', function() {
        var pos = marker.getPosition();
        this.lat(pos.lat());
        this.long(pos.lng());
    }.bind(this));

    google.maps.event.addListener(marker, 'dragend', function() {
        var pos = marker.getPosition();
        this.lat(pos.lat());
        this.long(pos.lng());
    }.bind(this));
}

function AppViewModel() {
	var self = this;

	this.searchTerm = ko.observable("Search...");

	this.locationList = ko.observableArray([]);

	initialLocations.forEach(function(locationItem){
		self.locationList.push( new Location(locationItem) );
	});
}

function startApp() {
	map.init();
	ko.applyBindings(new AppViewModel());
}