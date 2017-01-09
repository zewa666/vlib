/** @jsx VLibCreate */

import {
  VLibCreate,
  VLibTag
} from "../lib/vlib";

let {table, thead, th, tbody, tr, td, div, h2, p} = VLibTag;

export const renderTable = (data) => {
  return table( {"id": "my-table"},
    thead(null,
      th(null, "Col A"),
      th(null, "Col B"),
      th(null, "Col C")
    ),
    tbody(null,
      ...data.map( (row) => tr(null, ...row.map( (col) => td(null, col) )))
    )
  );
};

export const jsx = (props) => <div>
  <h2 class="red">Some JSX generated content.</h2>
  <p id="differ">{props.text}</p>
  <button onclick={() => alert("test")}>Click here</button>
  <button onclick={props.clickHandler}>Click here 2</button>
  <br />
  <br />
  <input type="text" onchange={props.sayHelloToHandler} />
  <button onclick={() => alert(props.sayHelloTo)}>Say hello</button>
  <br />
  <span>You said hello to: <b>{props.sayHelloTo}</b></span>
</div>

export const content = (props) => div({"id": props.primary.mountId},
  h2({"class": ["red", "blue"]}, props.primary.greetingHeader),
  p({"style": props.primary.styles}, "Das ist ein Test"),
  renderTable(props.primary.tableData),
  p({}, true),
  p(null, props.primary.random),
  p(null, null),
  jsx(props.jsxComponent)
);