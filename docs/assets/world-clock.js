'use strict';



;define('world-clock/adapters/application', ['exports', 'ember-localforage-adapter/adapters/localforage'], function (exports, _localforage) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _localforage.default.extend({
        namespace: 'WorldTimeZones'
    });
});
;define('world-clock/app', ['exports', 'world-clock/resolver', 'ember-load-initializers', 'world-clock/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
;define('world-clock/components/select-tz', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    timezones: null,
    selectedTimezone: null,

    didInitAttrs(attrs) {
      this._super(...arguments);
    },

    actions: {
      change() {
        const changeAction = this.get('action');
        const selectedEl = this.$('select')[0];
        var selectedIndex = selectedEl.selectedIndex;
        const timezones = this.get('timezones');
        const selectedTimezone = timezones[selectedIndex];
        this.set('selectedTimezone', selectedTimezone);
        changeAction(selectedTimezone);
      }
    }
  });
});
;define('world-clock/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
;define('world-clock/controllers/clock', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        init() {
            this._super(...arguments);
            // Update the time.
            this.updateTime();
        },

        updateTime() {
            var _this = this;

            // Update the time every second.
            Ember.run.later(function () {
                _this.set('localTime', moment().format('h:mm:ss a'));

                _this.get('model').forEach(function (model) {
                    model.set('time', moment.tz(model.get('name')).format('h:mm:ss a'));
                });

                _this.updateTime();
            }, 1000);
        },

        localTime: moment().format('h:mm:ss a')
    });
});
;define('world-clock/controllers/timezones', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    /* create array of timezones with name & offset */
    init() {
      this._super(...arguments);
      var timezones = [];
      for (var i in moment.tz._zones) {
        var zone = moment.tz.zone(i);
        timezones.push({
          name: zone.name,
          offset: zone.offsets[0]
        });
      }
      this.set('timezones', timezones);
      this.set('selectedTimezone', timezones[0]);
    },
    actions: {
      /* save a timezone record to our offline datastore */
      add() {
        const selectedTimezone = this.get('selectedTimezone');
        var timezone = this.store.createRecord('timezones', {
          name: selectedTimezone.name,
          offset: selectedTimezone.offset
        });
        timezone.save();
      },
      /* delete a timezone record from our offline datastore */
      remove(timezone) {
        timezone.destroyRecord();
      }
    }
  });
});
;define('world-clock/helpers/app-version', ['exports', 'world-clock/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;

    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
;define('world-clock/helpers/is-equal', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isEqual = isEqual;
  function isEqual([leftSide, rightSide] /*, hash*/) {
    return leftSide === rightSide;
  }

  exports.default = Ember.Helper.helper(isEqual);
});
;define('world-clock/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
;define('world-clock/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
;define('world-clock/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'world-clock/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
;define('world-clock/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
;define('world-clock/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
;define('world-clock/initializers/export-application-global', ['exports', 'world-clock/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
;define('world-clock/instance-initializers/ember-data', ['exports', 'ember-data/initialize-store-service'], function (exports, _initializeStoreService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _initializeStoreService.default
  };
});
;define('world-clock/models/timezones', ['exports', 'ember-data'], function (exports, _emberData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _emberData.default.Model.extend({
        name: _emberData.default.attr('string'),
        offset: _emberData.default.attr('number')
    });
});
;define('world-clock/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
;define('world-clock/router', ['exports', 'world-clock/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('clock');
    this.route('timezones');
  });

  exports.default = Router;
});
;define('world-clock/routes/application', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        redirect: function () {
            this.transitionTo('clock');
        }
    });
});
;define('world-clock/routes/clock', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        model() {
            return this.store.findAll('timezones');
        }
    });
});
;define('world-clock/routes/timezones', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        model() {
            return this.store.findAll('timezones');
        }
    });
});
;define('world-clock/serializers/localforage', ['exports', 'ember-localforage-adapter/serializers/localforage'], function (exports, _localforage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _localforage.default;
});
;define('world-clock/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
;define("world-clock/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "rdAdi3av", "block": "{\"symbols\":[],\"statements\":[[7,\"h1\"],[11,\"id\",\"title\"],[9],[0,\"It's 5'o'clock somewhere\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n  \"],[7,\"li\"],[9],[4,\"link-to\",[\"clock\"],null,{\"statements\":[[0,\"Clock\"]],\"parameters\":[]},null],[10],[0,\"\\n  \"],[7,\"li\"],[9],[4,\"link-to\",[\"timezones\"],null,{\"statements\":[[0,\"Manage Timezones\"]],\"parameters\":[]},null],[10],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[1,[21,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "world-clock/templates/application.hbs" } });
});
;define("world-clock/templates/clock", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "NfaBei8T", "block": "{\"symbols\":[\"timezone\"],\"statements\":[[7,\"h2\"],[9],[0,\"Local Time: \"],[7,\"strong\"],[9],[1,[21,\"localTime\"],false],[10],[10],[0,\"\\n \\n\"],[7,\"ul\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"model\"]]],null,{\"statements\":[[0,\"    \"],[7,\"li\"],[9],[1,[22,1,[\"name\"]],false],[0,\": \"],[7,\"strong\"],[9],[1,[22,1,[\"time\"]],false],[10],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[10]],\"hasEval\":false}", "meta": { "moduleName": "world-clock/templates/clock.hbs" } });
});
;define("world-clock/templates/components/select-tz", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "uGgXdTEX", "block": "{\"symbols\":[\"tz\"],\"statements\":[[7,\"select\"],[3,\"action\",[[22,0,[]],\"change\"],[[\"on\"],[\"change\"]]],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"timezones\"]]],null,{\"statements\":[[0,\"    \"],[7,\"option\"],[12,\"value\",[22,1,[\"offset\"]]],[12,\"selected\",[27,\"is-equal\",[[22,1,[\"name\"]],[23,[\"selectedTimezone\",\"name\"]]],null]],[9],[0,\"\\n      \"],[1,[22,1,[\"name\"]],false],[0,\"\\n    \"],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[10]],\"hasEval\":false}", "meta": { "moduleName": "world-clock/templates/components/select-tz.hbs" } });
});
;define("world-clock/templates/timezones", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "eADCa5jI", "block": "{\"symbols\":[\"timezone\"],\"statements\":[[7,\"h2\"],[9],[0,\"Add Timezone\"],[10],[0,\"\\n\\n\"],[7,\"div\"],[9],[0,\"\\n  \"],[1,[27,\"select-tz\",null,[[\"timezones\",\"selectedTimezone\",\"action\"],[[23,[\"timezones\"]],[23,[\"selectedTimezone\"]],[27,\"action\",[[22,0,[]],[27,\"mut\",[[23,[\"selectedTimezone\"]]],null]],null]]]],false],[0,\"\\n\"],[10],[0,\"\\n\\n\"],[7,\"button\"],[3,\"action\",[[22,0,[]],\"add\"]],[9],[0,\"Add Timezone\"],[10],[0,\"\\n\\n\"],[7,\"h2\"],[9],[0,\"My Timezones\"],[10],[0,\"\\n\\n\"],[7,\"ul\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"model\"]]],null,{\"statements\":[[0,\"    \"],[7,\"li\"],[9],[0,\"\\n      \"],[1,[22,1,[\"name\"]],false],[0,\" \"],[7,\"button\"],[3,\"action\",[[22,0,[]],\"remove\",[22,1,[]]]],[9],[0,\"Delete\"],[10],[0,\"\\n    \"],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[10]],\"hasEval\":false}", "meta": { "moduleName": "world-clock/templates/timezones.hbs" } });
});
;

;define('world-clock/config/environment', [], function() {
  var prefix = 'world-clock';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("world-clock/app")["default"].create({"name":"world-clock","version":"0.0.0+917accad"});
          }
        
//# sourceMappingURL=world-clock.map
