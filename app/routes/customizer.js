import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Route.extend({
  iconsService: service('icons'),
  model() {
    return Promise.all([
      $.getJSON("/data/shirts.json"),
      $.getJSON("/data/config.json"),
      this.iconsService.initData()
    ])
  }
});