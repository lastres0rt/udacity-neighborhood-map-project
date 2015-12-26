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
	},
	{
		name: 'Red Rock Coffee',
		lat: 37.393,
		long:-122.081
	},
	{
		name: 'Com Tam Thanh (Broken Rice)',
		lat: 37.309,
		long: -121.934
	},
	{
		name: 'House of Falafel',
		lat: 37.322,
		long: -122.018
	},
	{
		name: 'The Prolific Oven',
		lat: 37.394,
		long: -121.948
	},
	{
		name: 'Pho Mai #1 Noodle House',
		lat: 37.415,
		long: -121.878
	},
	{
		name: 'Alviso Marina County Park',
		lat: 37.429,
		long: -121.984
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