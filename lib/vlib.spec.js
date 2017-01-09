/** @jsx VLibCreate */

import {
  VLibCreate,
  VLibRender
} from "./vlib";

describe("VLib", () => {

  it("should render a simple example", () => {
    const testId = "test-id";
    const content = () => <div id={testId}>Hello</div>;
    const result = VLibRender(content, {}, "body", testId);
      
    expect(result.id).toBe(testId);
    expect(result.tagName).toBe("DIV");
    expect(result.textContent).toBe("Hello");
  });

  it("should throw an error if the provided content is not a function", () => {
    const fixedContent = <div>test</div>;

    expect( () => { VLibRender(fixedContent, {}, "body", "foo-bar") })
      .toThrow("Provided content must be a function accepting a model");
  });
});