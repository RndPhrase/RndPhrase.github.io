require(['rndphrase'], function(RndPhrase) {
	function viewModel () {
		var self = this;
		self.seed = ko.observable('');
		self.password = ko.observable('');
		self.uri = ko.observable('');
		self.hash = ko.pureComputed(function() {
			if(self.seed() && self.password() && self.uri()) {
				var r = new RndPhrase({
					seed: self.seed(),
					password: self.password(),
					uri: self.uri()});

				return r.generate();	
			}
		}, this);
	}
	ko.applyBindings(new viewModel());
});