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

var Location = function(data) {
	this.name = ko.observable(data.name);
	this.lat = ko.observable(data.lat);
	this.long = ko.observable(data.long);
}

function AppViewModel() {
	var self = this;

	this.searchTerm = ko.observable("Search...");

	this.locationList = ko.observableArray([]);

	this.map = new google.maps.Map(document.getElementById('map'), {
			zoom: 12,
			center: {lat: 37.370, lng: -122.002}
		});

	this.mapElem = document.getElementById('map');
	this.mapElem.style.height = window.innerHeight - 50;

	initialLocations.forEach(function(locationItem){
		self.locationList.push( new Location(locationItem) );
		var latLng = {lat: locationItem.lat, lng: locationItem.long};
		var marker = new google.maps.Marker({
			position: latLng,
			map: self.map,
			title: locationItem.name
		});

	});
}

function startApp() {
	ko.applyBindings(new AppViewModel());
}