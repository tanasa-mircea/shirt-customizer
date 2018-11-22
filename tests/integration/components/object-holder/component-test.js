import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | object-holder", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function(assert) {
    // Set any properties with this.set("myProperty", "value");
    // Handle any actions with this.set("myAction", function(val) { ... });

    await render(hbs`{{object-holder}}`);

    assert.equal(this.element.textContent.trim(), "");

    // Template block usage:
    await render(hbs`
      {{#object-holder}}
        template block text
      {{/object-holder}}
    `);

    assert.equal(this.element.textContent.trim(), "template block text");
  });
});
