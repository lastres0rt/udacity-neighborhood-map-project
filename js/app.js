function AppViewModel() {
	this.searchTerm = ko.observable("Search...");

}

ko.applyBindings(new AppViewModel());