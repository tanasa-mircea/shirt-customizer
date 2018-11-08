import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default Component.extend({
  sanitizedIcon: computed('icon', function() {
    return new htmlSafe(this.icon);
  })
});
