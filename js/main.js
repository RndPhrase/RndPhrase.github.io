require(
	['rndphrase-original', 'rndphrase', 'domainmanager'],
	function(Legacy, Improved, DomainManager) {
    function ViewModel () {
        var self = this;
        self.seed = ko.observable('');
        self.password = ko.observable('');
        self.uri = ko.observable('');
        self.hash = ko.observable('');
        self.size = ko.observable(32);
        self.version = ko.observable(1);
        self.use_legacy_mode = ko.observable(true)

        self.computeHash = function() {
            var domain = self.uri();
            if(self.use_legacy_mode()) {
                d = new DomainManager();
                if(!d.is_host(domain)) return '';
                domain = d.get_host(domain);
                var r = new Legacy({
                    seed: self.seed(),
                    password: self.password(),
                    uri: domain,
                    version: self.version()
                });

                self.hash(r.generate());
            } else {
                var r = new Improved({
                    seed: self.seed(),
                    uri: domain,
                    numeric: self.numeric(),
                    capital: self.capital(),
                    minuscule: self.minuscule(),
                    special: self.special(),
                    size: self.size(),
                    version: self.version()
                })

                r.generatePassword(self.password(), function(hash) {
                    self.hash(hash);
                })
            }
        }
        self.seed.subscribe(self.computeHash);
        self.password.subscribe(self.computeHash);
        self.uri.subscribe(self.computeHash);
        self.size.subscribe(self.computeHash);
        self.version.subscribe(self.computeHash);
        self.use_legacy_mode.subscribe(self.computeHash);

        self.use_numeric_defaults = ko.observable(true);
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

        self.use_capital_defaults = ko.observable(true);
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

        self.use_minuscule_defaults = ko.observable(true);
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

        self.use_special_defaults = ko.observable(true);
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
    }
    var viewModel = new ViewModel()
    ko.applyBindings(viewModel);

    $('#hash').on('click', function(e) {
        $(this).select();
    });

    $(window).on('blur', function(e) {
        viewModel.password('');
        $('#password').focus();
    });
});
