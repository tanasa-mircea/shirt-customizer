import Service from '@ember/service';
import $ from 'jquery';

export default Service.extend({

  get(icon) {
    return this.icons[icon];
  },

  initData() {
    return new Promise(function(resolve, reject) {
      $.getJSON("/data/icons.json")
        .then(function(response) {
          this.set('icons', response)
          resolve();
        }.bind(this))
        .catch(function(err) {
          reject(err);
        })
    }.bind(this))
  }


});
