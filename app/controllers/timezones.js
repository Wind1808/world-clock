import Controller from '@ember/controller';

export default Controller.extend({
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
