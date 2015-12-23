//  Source for the bindingHandler code:

function initMap() {

	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 8,
		center: {lat: -34.397, lng: 150.644}
	});

	mapElem = document.getElementById('map');
	mapElem.style.height = window.innerHeight - 50;

};

function AppViewModel() {
	var self = this;

	self.searchTerm = ko.observable("Search...");

	self.displayLocMarker = function(){
		self.geocoder.geocode({'address': self.address()}, function(results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
			 	self.marker = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location
				});
			} else {
				alert('Geocode was not successful for the following reason: ' + status);
			};
		});
	};

}

function startApp() {
	initMap();
	ko.applyBindings(new AppViewModel());
}