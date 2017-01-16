/* global describe, it, expect */
/** @jsx VLibCreate */

import {
  VLibCreate, // eslint-disable-line
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

    expect( () => { 
      VLibRender(fixedContent, {}, "body", "foo-bar");
    }).toThrow("Provided content must be a function accepting a model");
  });

  it("should throw an error if no selector is provided", () => {
    const content = () => <div>test</div>;

    expect( () => { 
      VLibRender(content, {}, null, "foo-bar");
    }).toThrow("Selector missing for mount point");
  });

  it("should throw an error if no mountId is provided", () => {
    const content = () => <div>test</div>;

    expect( () => { 
      VLibRender(content, {}, "foo", null);
    }).toThrow("Id of root missing");
  });

  it("should throw an error if no tagName is provided", () => {
    const content = () => VLibCreate({}, {}, null, null);

    expect( () => { 
      content();
    }).toThrow("No valid tagName provided");
  });

  it("should throw an error if an unknown tagName is provided", () => {
    const content = () => VLibCreate("foo", {}, null, null);

    expect( () => { 
      content();
    }).toThrow("Unknown tagName provided");
  });

  it("should properly handle spaces in nested childs", () => {
    const content = () => <div id="test">
      <span>This</span> is containing <span>some</span> <b>spaces</b>
    </div>

    const result = VLibRender(content, {}, "body", "test");
    
    expect(result.textContent).toBe("This is containing some spaces");
  });

  it("should delete the prerendered child in a server side rendering scenario on subsequent calls", () => {   
    const testId = "test-id";
    const content = (props) => <div id={testId}>{ props.text }</div>;
    const firstState = {
      isPrerendered: false,
      text: "foo"
    };
    const secondState = {
      isPrerendered: false,
      text: "bar"
    };
    const lastState = {
      isPrerendered: true,
      text: "foo"
    };
    let result = VLibRender(content, firstState, "body", testId);

    expect(result.attributes.foo).toBe(undefined);
    result.attributes.foo = "bar";
    expect(result.attributes.foo).toBe("bar");

    result = VLibRender(content, secondState, "body", testId);
    expect(result.attributes.foo).toBe("bar");

    result = VLibRender(content, lastState, "body", testId);
    expect(result.attributes.foo).toBe(undefined);
  });
});
