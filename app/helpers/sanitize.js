import {
  helper
} from "@ember/component/helper";
import {
  htmlSafe as HtmlSafe
} from "@ember/template";

export function sanitize(params) {
  return new HtmlSafe(params.get(0));
}

export default helper(sanitize);