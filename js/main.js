var module = 'rndphrase'
if(window.location.hash == '#original') {
	module = 'rndphrase-original';
}
require([module], function(RndPhrase) {
	function viewModel () {
		var self = this;
		self.seed = ko.observable('');
		self.password = ko.observable('');
		self.uri = ko.observable('');
		self.size = ko.observable(16);
		self.version = ko.observable(1);
		self.functions = ko.observable(['original','improved']);
		if(module == 'rndphrase'){
			self.selected_function = ko.observable('improved');	
		} else {
			self.selected_function = ko.observable('original');
		}
		

		self.numeric_min = ko.observable(1);
		self.numeric_max = ko.observable(0);
		self.numeric_alphabet = ko.observable('0123456789');
		self.numeric = ko.pureComputed(function() {
			return {
				min: self.numeric_min(),
				max: parseInt(self.numeric_max()),
				alphabet: self.numeric_alphabet()
			};
		});

		self.capital_min = ko.observable(1);
		self.capital_max = ko.observable(0);
		self.capital_alphabet = ko.observable('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
		self.capital = ko.pureComputed(function() {
			return {
				min: self.capital_min(),
				max: parseInt(self.capital_max()),
				alphabet: self.capital_alphabet()
			};
		});

		self.minuscule_min = ko.observable(1);
		self.minuscule_max = ko.observable(0);
		self.minuscule_alphabet = ko.observable('abcdefghijklmnopqrstuvwxyz');
		self.minuscule = ko.pureComputed(function() {
			return {
				min: self.minuscule_min(),
				max: parseInt(self.minuscule_max()),
				alphabet: self.minuscule_alphabet()
			};
		});

		self.special_min = ko.observable(1);
		self.special_max = ko.observable(0);
		self.special_alphabet = ko.observable(' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~');
		self.special = ko.pureComputed(function() {
			return {
				min: self.special_min(),
				max: parseInt(self.special_max()),
				alphabet: self.special_alphabet()
			};
		});

		self.hash = ko.pureComputed(function() {
			if(self.seed() && self.password() && self.uri()) {
				var r = new RndPhrase({
					seed: self.seed(),
					password: self.password(),
					uri: self.uri(),
					numeric: self.numeric(),
					capital: self.capital(),
					minuscule: self.minuscule(),
					special: self.special(),
					size: self.size(),
					version: self.version()
				});

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