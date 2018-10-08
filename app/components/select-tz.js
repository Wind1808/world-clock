import Component from '@ember/component';

export default Component.extend({
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
