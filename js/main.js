require(['rndphrase'], function(RndPhrase) {
	function viewModel () {
		var self = this;
		self.seed = ko.observable('');
		self.password = ko.observable('');
		self.uri = ko.observable('');
		self.size = ko.observable(16);
		self.version = ko.observable(1);

		self.numeric_min = ko.observable(1);
		self.numeric_max = ko.observable(-1);
		self.numeric_alphabet = ko.observable('0123456789');

		self.capital_min = ko.observable(1);
		self.capital_max = ko.observable(-1);
		self.capital_alphabet = ko.observable('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

		self.minuscule_min = ko.observable(1);
		self.minuscule_max = ko.observable(-1);
		self.minuscule_alphabet = ko.observable('abcdefghijklmnopqrstuvwxyz');

		self.special_min = ko.observable(1);
		self.special_max = ko.observable(-1);
		self.special_alphabet = ko.observable(' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~');

		self.hash = ko.pureComputed(function() {
			if(self.seed() && self.password() && self.uri()) {
				var r = new RndPhrase({
					seed: self.seed(),
					password: self.password(),
					uri: self.uri()});

				return r.generate();	
			}
			return '';
		}, this);
	}
	ko.applyBindings(new viewModel());

	$('#hash').on('click', function(e) {
		$(this).select();
	});
});