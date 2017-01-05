/** @jsx VLibCreate */

import {
  VLibCreate,
  VLibTag
} from "../lib/vlib";

let {table, thead, th, tbody, tr, td, div, h2, p, br} = VLibTag;

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
  <h2>Some JSX generated content.</h2>
  <p id="differ">{props.text}</p>
  <button onclick={() => alert("test")}>Click here</button>
  <button onclick={props.clickHandler}>Click here 2</button>
  <br />
  <br />
  <input type="text" onchange={(e) => props.sayHelloTo = e.target.value} />
  <button onclick={() => alert(props.sayHelloTo)}>Say hello</button>
</div>

export const content = (props) => div({"id": props.primary.mountId},
  h2({"class": ["red", "blue"]}, props.primary.greetingHeader),
  p(null, "Lorem ipsum dolor sit amet"),
  br(),
  p({"style": props.primary.styles}, "Das ist ein Test"),
  renderTable(props.primary.tableData),
  p({}, true),
  p(null, props.primary.random),
  p(null, null),
  jsx(props.jsxComponent)
);