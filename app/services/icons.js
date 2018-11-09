import Service from '@ember/service';
import $ from 'jquery';

export default Service.extend({
  get(icon) {
    console.log('icon ', icon);
    console.log('this.icons ', this.icons);

    return icon;
  },

  initData() {
    return new Promise(function(resolve, reject) {
      $.getJSON("/data/icons.json")
        .then(function(response) {
          console.log('this ', response, this)
          // this.set('icons', response)
          console.log('response ', response)
          resolve();
        }.bind(this))
        .catch(function(err) {
          reject(err);
        })
    })
  }


});
