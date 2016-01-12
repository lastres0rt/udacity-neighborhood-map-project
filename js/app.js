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
	this.name = data.name;
	this.lat = data.lat;
	this.long = data.long;

	this.visible = ko.observable(true);

	this.marker = new google.maps.Marker({
			position: new google.maps.LatLng(data.lat, data.long),
			map: map,
			title: data.name
	});

	this.showMarker = ko.computed(function() {
		if(this.visible() === true) {
			this.marker.setMap(map);
		} else {
			this.marker.setMap(null);
		}
		return true;
	}, this);
};

function AppViewModel() {
	var self = this;

	this.searchTerm = ko.observable("");

	this.locationList = ko.observableArray([]);

	map = new google.maps.Map(document.getElementById('map'), {
			zoom: 12,
			center: {lat: 37.370, lng: -122.002}
	});

	initialLocations.forEach(function(locationItem){
		self.locationList.push( new Location(locationItem));
	})

	this.filteredList = ko.computed( function() {
		var filter = self.searchTerm().toLowerCase();
		if (!filter) {
			return self.locationList();
		} else {
			return ko.utils.arrayFilter(self.locationList(), function(locationItem) {
				var string = locationItem.name().toLowerCase();
       			return string.search(filter) >= 0;
			});
		}
	}, self);

	this.mapElem = document.getElementById('map');
	this.mapElem.style.height = window.innerHeight - 50;
};

function startApp() {
	ko.applyBindings(new AppViewModel());
}