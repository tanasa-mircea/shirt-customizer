import Application from "@ember/application";
import EmberObject from "@ember/object";
import { initialize } from "shirt-customizer/instance-initializers/pre-data";
import { module, test } from "qunit";
import { run } from "@ember/runloop";

const expected = {
  bigDipper: "<path class='cls-1' d='M59.05,38.69c-.72-3.37-3.34-3.16-4-3.06a11.27,11.27,0,0,0-1.5.34S35.8,28.72,35.71,28.6A3.35,3.35,0,0,0,34,25a3,3,0,0,0-3.78.75L24,22a3.62,3.62,0,0,0,0-3.16,2.91,2.91,0,0,0-2.87-1.37,3.73,3.73,0,0,0-.78.22l-1.22-3.94s1.31-2.19.09-3.75-3.44-.78-3.84-.37a6.6,6.6,0,0,0-.87,1.66l-4.16-.06A2.4,2.4,0,0,0,7.9,9.44,3.06,3.06,0,0,0,5,13.38c.69,1.91,3.78,2.31,4.72,1.09a3,3,0,0,0,.84-2s3.72,0,3.69.09a1.84,1.84,0,0,0,1,1.72,3,3,0,0,0,2.13.16l1.78,4.09a2.79,2.79,0,0,0,.06,3.22A3.77,3.77,0,0,0,22.62,23l6.56,4.59a1.65,1.65,0,0,0,.25,1.53,2.5,2.5,0,0,0,1.16,1L30,38.6s-2.87.69-1.91,3.28a2.61,2.61,0,0,0,3.19,1.91s12.5,8.5,12.53,8.59a2.88,2.88,0,0,0,2.56,2.44,2.67,2.67,0,0,0,3.28-2.09,12.28,12.28,0,0,0-.28-1.56l6.41-8.81S59.77,42.07,59.05,38.69ZM7,13.57A1.62,1.62,0,0,1,6.8,11a1.66,1.66,0,0,1,2.63,1.34C9.55,13.91,8.12,14.38,7,13.57Zm9.09-.5a1.62,1.62,0,0,1-.16-2.59,1.66,1.66,0,0,1,2.63,1.34C18.65,13.41,17.21,13.88,16.05,13.07Zm4.66,8.47a1.62,1.62,0,0,1-.16-2.59,1.66,1.66,0,0,1,2.63,1.34C23.3,21.88,21.87,22.35,20.71,21.54ZM31.3,26.35a2,2,0,0,1,3.19,1.5c.13,1.59-2,2.19-3.19,1.38A1.84,1.84,0,0,1,31.3,26.35ZM29.84,42.51a1.6,1.6,0,0,1,0-2.5,1.76,1.76,0,0,1,2.77,1.3C32.72,42.7,30.85,43.21,29.84,42.51ZM45.69,53.57a1.6,1.6,0,0,1,0-2.5,1.76,1.76,0,0,1,2.77,1.3C48.56,53.76,46.69,54.27,45.69,53.57Zm2.68-3.44a2.29,2.29,0,0,0-1.91-.41,9.44,9.44,0,0,0-1.37.63L33.15,43.22s1.5-1.53.56-3a3.41,3.41,0,0,0-2-1.66s.19-7.62.25-7.62a2.63,2.63,0,0,0,1.84-.19C34.9,30.29,35,30,35,30s8.59,4.16,12,5.53,5.91,2.31,5.91,2.31a2.25,2.25,0,0,0,.34,2.06,5.13,5.13,0,0,0,1.41,1.63Zm8.7-9.68c-1.27,1-2.94-.51-2.89-1.92A1.84,1.84,0,0,1,56.59,37,2,2,0,0,1,57.07,40.45Z'/>"
};

const iconsMock = EmberObject.extend({
  updateIcons: function(icons) {
    this.set("icons", icons);
  }
});

module("Unit | Instance Initializer | pre-data", function(hooks) {
  hooks.beforeEach(function() {
    run(function() {
      this.application = Application.create();

      this.appInstance = this.application.buildInstance();
      this.appInstance.set("application.preloadedIcons", expected);
      this.appInstance.register("service:icons", iconsMock, { instantiate: true });
    }.bind(this));
  });

  // Replace this with your real tests.
  test("it works", async function(assert) {
    assert.expect(1);

    initialize(this.appInstance);
    const iconsService = this.appInstance.lookup("service:icons");
    const serviceIcons = iconsService.icons;

    assert.deepEqual(serviceIcons, expected, "Icons set on application are the same with the ones saved");
  });
});
