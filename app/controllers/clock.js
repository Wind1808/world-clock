import Controller from '@ember/controller';
import { later } from '@ember/runloop';

export default Controller.extend({
    init() {
        this._super(...arguments);
        // Update the time.
        this.updateTime();
    },
 
    updateTime() {
        var _this = this;
 
        // Update the time every second.
        later(function() {
            _this.set('localTime', moment().format('h:mm:ss a'));

            _this.get('model').forEach(function(model) {
                model.set('time',
                          moment.tz(model.get('name')).format('h:mm:ss a'));
            });

            _this.updateTime();
        }, 1000);
    },
 
    localTime: moment().format('h:mm:ss a')
});
