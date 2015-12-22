//  Source for the bindingHandler code:
// http://stackoverflow.com/questions/12722925/google-maps-and-knockoutjs

ko.bindingHandlers.map = {

    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var mapObj = ko.utils.unwrapObservable(valueAccessor());
        var latLng = new google.maps.LatLng(
            ko.utils.unwrapObservable(mapObj.lat),
            ko.utils.unwrapObservable(mapObj.lng));
        var mapOptions = { center: latLng,
                          zoom: 5,
                          mapTypeId: google.maps.MapTypeId.ROADMAP};

        mapObj.googleMap = new google.maps.Map(element, mapOptions);
    }
};

function AppViewModel() {
	var self = this;

	self.searchTerm = ko.observable("Search...");

	self.locations = [
		{ name: "Place 1", lat: 0, lng: 0 },
		{ name: "Place 2", lat: 0, lng: 0 },
		{ name: "Place 3", lat: 0, lng: 0 }
	];

	self.myMap = ko.observable({
        lat: ko.observable(55),
        lng: ko.observable(11)
	});

}

ko.applyBindings(new AppViewModel());