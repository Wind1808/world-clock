"use strict"
define("world-clock/adapters/-json-api",["exports","@ember-data/adapter/json-api"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("world-clock/adapters/application",["exports","ember-localforage-adapter/adapters/localforage"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=t.default.extend({namespace:"WorldTimeZones"})
e.default=r})),define("world-clock/app",["exports","world-clock/resolver","ember-load-initializers","world-clock/config/environment"],(function(e,t,r,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var o=Ember.Application.extend({modulePrefix:n.default.modulePrefix,podModulePrefix:n.default.podModulePrefix,Resolver:t.default});(0,r.default)(o,n.default.modulePrefix)
var l=o
e.default=l})),define("world-clock/component-managers/glimmer",["exports","@glimmer/component/-private/ember-component-manager"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("world-clock/components/select-tz",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Component.extend({timezones:null,selectedTimezone:null,didInitAttrs:function(e){this._super.apply(this,arguments)},actions:{change:function(){var e=this.get("action"),t=this.$("select")[0].selectedIndex,r=this.get("timezones")[t]
this.set("selectedTimezone",r),e(r)}}})
e.default=t})),define("world-clock/controllers/clock",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Controller.extend({init:function(){this._super.apply(this,arguments),this.updateTime()},updateTime:function(){var e=this
Ember.run.later((function(){e.set("localTime",moment().format("h:mm:ss a")),e.get("model").forEach((function(e){e.set("time",moment.tz(e.get("name")).format("h:mm:ss a"))})),e.updateTime()}),1e3)},localTime:moment().format("h:mm:ss a")})
e.default=t})),define("world-clock/controllers/timezones",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Controller.extend({init:function(){this._super.apply(this,arguments)
var e=[]
for(var t in moment.tz._zones){var r=moment.tz.zone(t)
e.push({name:r.name,offset:r.offsets[0]})}this.set("timezones",e),this.set("selectedTimezone",e[0])},actions:{add:function(){var e=this.get("selectedTimezone")
this.store.createRecord("timezones",{name:e.name,offset:e.offset}).save()},remove:function(e){e.destroyRecord()}}})
e.default=t})),define("world-clock/data-adapter",["exports","@ember-data/debug"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("world-clock/helpers/app-version",["exports","world-clock/config/environment","ember-cli-app-version/utils/regexp"],(function(e,t,r){function n(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=t.default.APP.version,l=n.versionOnly||n.hideSha,a=n.shaOnly||n.hideVersion,i=null
return l&&(n.showExtended&&(i=o.match(r.versionExtendedRegExp)),i||(i=o.match(r.versionRegExp))),a&&(i=o.match(r.shaRegExp)),i?i[0]:o}Object.defineProperty(e,"__esModule",{value:!0}),e.appVersion=n,e.default=void 0
var o=Ember.Helper.helper(n)
e.default=o})),define("world-clock/helpers/is-equal",["exports"],(function(e){function t(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return
var r=[],n=!0,o=!1,l=void 0
try{for(var a,i=e[Symbol.iterator]();!(n=(a=i.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(d){o=!0,l=d}finally{try{n||null==i.return||i.return()}finally{if(o)throw l}}return r}(e,t)||function(e,t){if(!e)return
if("string"==typeof e)return r(e,t)
var n=Object.prototype.toString.call(e).slice(8,-1)
"Object"===n&&e.constructor&&(n=e.constructor.name)
if("Map"===n||"Set"===n)return Array.from(e)
if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e,t){(null==t||t>e.length)&&(t=e.length)
for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r]
return n}function n(e){var r=t(e,2)
return r[0]===r[1]}Object.defineProperty(e,"__esModule",{value:!0}),e.isEqual=n,e.default=void 0
var o=Ember.Helper.helper(n)
e.default=o})),define("world-clock/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=t.default
e.default=r})),define("world-clock/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=t.default
e.default=r})),define("world-clock/index",["exports","ember-uuid"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"v4",{enumerable:!0,get:function(){return t.v4}}),Object.defineProperty(e,"v1",{enumerable:!0,get:function(){return t.v1}}),Object.defineProperty(e,"parse",{enumerable:!0,get:function(){return t.parse}}),Object.defineProperty(e,"unparse",{enumerable:!0,get:function(){return t.unparse}})})),define("world-clock/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","world-clock/config/environment"],(function(e,t,r){var n,o
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,r.default.APP&&(n=r.default.APP.name,o=r.default.APP.version)
var l={name:"App Version",initialize:(0,t.default)(n,o)}
e.default=l})),define("world-clock/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}
e.default=r})),define("world-clock/initializers/ember-data-data-adapter",["exports","@ember-data/debug/setup"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("world-clock/initializers/ember-data",["exports","ember-data","ember-data/setup-container"],(function(e,t,r){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n={name:"ember-data",initialize:r.default}
e.default=n})),define("world-clock/initializers/export-application-global",["exports","world-clock/config/environment"],(function(e,t){function r(){var e=arguments[1]||arguments[0]
if(!1!==t.default.exportApplicationGlobal){var r
if("undefined"!=typeof window)r=window
else if("undefined"!=typeof global)r=global
else{if("undefined"==typeof self)return
r=self}var n,o=t.default.exportApplicationGlobal
n="string"==typeof o?o:Ember.String.classify(t.default.modulePrefix),r[n]||(r[n]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete r[n]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=r,e.default=void 0
var n={name:"export-application-global",initialize:r}
e.default=n})),define("world-clock/instance-initializers/ember-data",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
e.default={name:"ember-data",initialize:function(){}}})),define("world-clock/models/timezones",["exports","ember-data"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=t.default.Model.extend({name:t.default.attr("string"),offset:t.default.attr("number")})
e.default=r})),define("world-clock/resolver",["exports","ember-resolver"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=t.default
e.default=r})),define("world-clock/router",["exports","world-clock/config/environment"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=Ember.Router.extend({location:t.default.locationType,rootURL:t.default.rootURL})
r.map((function(){this.route("clock"),this.route("timezones")}))
var n=r
e.default=n})),define("world-clock/routes/application",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({redirect:function(){this.transitionTo("clock")}})
e.default=t})),define("world-clock/routes/clock",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({model:function(){return this.store.findAll("timezones")}})
e.default=t})),define("world-clock/routes/timezones",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Route.extend({model:function(){return this.store.findAll("timezones")}})
e.default=t})),define("world-clock/serializers/-default",["exports","@ember-data/serializer/json"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("world-clock/serializers/-json-api",["exports","@ember-data/serializer/json-api"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("world-clock/serializers/-rest",["exports","@ember-data/serializer/rest"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})})),define("world-clock/serializers/localforage",["exports","ember-localforage-adapter/serializers/localforage"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var r=t.default
e.default=r})),define("world-clock/services/store",["exports","ember-data/store"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}))
define("world-clock/templates/application",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"4iSv8qU4",block:'{"symbols":[],"statements":[[10,"div"],[14,0,"ember-view"],[12],[2,"\\n  "],[10,"h1"],[14,1,"title"],[12],[2,"It\'s 5\'o\'clock somewhere"],[13],[2,"\\n  \\n  "],[10,"ul"],[12],[2,"\\n    "],[10,"li"],[12],[6,[37,0],null,[["route"],["clock"]],[["default"],[{"statements":[[2,"Clock"]],"parameters":[]}]]],[13],[2,"\\n    "],[10,"li"],[12],[6,[37,0],null,[["route"],["timezones"]],[["default"],[{"statements":[[2,"Manage Timezones"]],"parameters":[]}]]],[13],[2,"\\n  "],[13],[2,"\\n  \\n  "],[1,[30,[36,2],[[30,[36,1],null,null]],null]],[2,"\\n"],[13]],"hasEval":false,"upvars":["link-to","-outlet","component"]}',meta:{moduleName:"world-clock/templates/application.hbs"}})
e.default=t})),define("world-clock/templates/clock",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"3ZBweNVF",block:'{"symbols":["timezone"],"statements":[[10,"h2"],[12],[2,"Local Time: "],[10,"strong"],[12],[1,[34,0]],[13],[13],[2,"\\n \\n"],[10,"ul"],[12],[2,"\\n"],[6,[37,3],[[30,[36,2],[[30,[36,2],[[35,1]],null]],null]],null,[["default"],[{"statements":[[2,"    "],[10,"li"],[12],[1,[32,1,["name"]]],[2,": "],[10,"strong"],[12],[1,[32,1,["time"]]],[13],[13],[2,"\\n"]],"parameters":[1]}]]],[13]],"hasEval":false,"upvars":["localTime","model","-track-array","each"]}',meta:{moduleName:"world-clock/templates/clock.hbs"}})
e.default=t})),define("world-clock/templates/components/select-tz",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"SkziRZ4r",block:'{"symbols":["tz"],"statements":[[11,"select"],[4,[38,2],[[32,0],"change"],[["on"],["change"]]],[12],[2,"\\n"],[6,[37,5],[[30,[36,4],[[30,[36,4],[[35,3]],null]],null]],null,[["default"],[{"statements":[[2,"    "],[10,"option"],[15,2,[32,1,["offset"]]],[15,"selected",[30,[36,1],[[32,1,["name"]],[35,0,["name"]]],null]],[12],[2,"\\n      "],[1,[32,1,["name"]]],[2,"\\n    "],[13],[2,"\\n"]],"parameters":[1]}]]],[13]],"hasEval":false,"upvars":["selectedTimezone","is-equal","action","timezones","-track-array","each"]}',meta:{moduleName:"world-clock/templates/components/select-tz.hbs"}})
e.default=t})),define("world-clock/templates/timezones",["exports"],(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"YbJfM7zc",block:'{"symbols":["timezone"],"statements":[[10,"h2"],[12],[2,"Add Timezone"],[13],[2,"\\n\\n"],[10,"div"],[12],[2,"\\n  "],[1,[30,[36,4],null,[["timezones","selectedTimezone","action"],[[35,3],[35,1],[30,[36,0],[[32,0],[30,[36,2],[[35,1]],null]],null]]]]],[2,"\\n"],[13],[2,"\\n\\n"],[11,"button"],[4,[38,0],[[32,0],"add"],null],[12],[2,"Add Timezone"],[13],[2,"\\n\\n"],[10,"h2"],[12],[2,"My Timezones"],[13],[2,"\\n\\n"],[10,"ul"],[12],[2,"\\n"],[6,[37,7],[[30,[36,6],[[30,[36,6],[[35,5]],null]],null]],null,[["default"],[{"statements":[[2,"    "],[10,"li"],[12],[2,"\\n      "],[1,[32,1,["name"]]],[2," "],[11,"button"],[4,[38,0],[[32,0],"remove",[32,1]],null],[12],[2,"Delete"],[13],[2,"\\n    "],[13],[2,"\\n"]],"parameters":[1]}]]],[13]],"hasEval":false,"upvars":["action","selectedTimezone","mut","timezones","select-tz","model","-track-array","each"]}',meta:{moduleName:"world-clock/templates/timezones.hbs"}})
e.default=t})),define("world-clock/transforms/boolean",["exports","@ember-data/serializer/-private"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.BooleanTransform}})})),define("world-clock/transforms/date",["exports","@ember-data/serializer/-private"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.DateTransform}})})),define("world-clock/transforms/number",["exports","@ember-data/serializer/-private"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.NumberTransform}})})),define("world-clock/transforms/string",["exports","@ember-data/serializer/-private"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.StringTransform}})})),define("world-clock/utils/uuid-generator",["exports","ember-uuid/utils/uuid-generator"],(function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"v4",{enumerable:!0,get:function(){return t.v4}}),Object.defineProperty(e,"v1",{enumerable:!0,get:function(){return t.v1}}),Object.defineProperty(e,"parse",{enumerable:!0,get:function(){return t.parse}}),Object.defineProperty(e,"unparse",{enumerable:!0,get:function(){return t.unparse}})})),define("world-clock/config/environment",[],(function(){try{var e="world-clock/config/environment",t=document.querySelector('meta[name="'+e+'"]').getAttribute("content"),r={default:JSON.parse(decodeURIComponent(t))}
return Object.defineProperty(r,"__esModule",{value:!0}),r}catch(n){throw new Error('Could not read config from meta tag with name "'+e+'".')}})),runningTests||require("world-clock/app").default.create({name:"world-clock",version:"0.0.0+ca105e1c"})
