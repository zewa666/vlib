/** @jsx VLibCreate */

import {
  VLibCreate,
  VLibRender,
  VLibTag
} from "./src/vlib";

let {table, thead, th, tbody, tr, td, div, h2, p, br} = VLibTag;

let model = {
  "primary": {
    "mountId": "main-content",
    "greetingHeader": "Hello World !!!",
    "styles": {"textDecoration": "underline"},
    "tableData": [ 
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ]
  },
  "jsxComponent": {
    "text": "Jaddaa jaddaa jadaa",
    "clickHandler": () => { 
      model.jsxComponent.text = "foo";
    }
  }
};

const renderTable = (data) => {
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

let jsx = (props) => <div>
  <h2>Some JSX generated content.</h2>
  <p id="differ">{props.text}</p>
  <button onclick={() => alert("test")}>Click here</button>
  <button onclick={props.clickHandler}>Click here 2</button>
</div>

let content = (props) => div({"id": props.primary.mountId},
  h2({"class": ["red", "blue"]}, props.primary.greetingHeader),
  p(null, "Lorem ipsum dolor sit amet"),
  br(),
  p({"style": props.primary.styles}, "Das ist ein Test"),
  renderTable(props.primary.tableData),
  p({}, true),
  p(null, Math.random(0, 1)),
  p(null, null),
  jsx(props.jsxComponent)
);

VLibRender(content, model, "body", model.primary.mountId);