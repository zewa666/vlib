/* global VLibRender, table, thead, th, tbody, tr, td, div, h2, p, br */
/** @jsx VLibCreate */

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
  <p>{props.text}</p>
</div>

let content = (props) => div({"id": props.mountId},
  h2({"class": ["red", "blue"]}, props.greetingHeader),
  p(null, "Lorem ipsum dolor sit amet"),
  br(),
  p({"style": props.styles}, "Das ist ein Test"),
  renderTable(props.tableData),
  p({}, true),
  p(null, Math.random(0, 1)),
  p(null, null),
  jsx({
    "text": "Jaddaa jaddaa jadaa"
  })
);

VLibRender(content({
  "mountId": "main-content",
  "greetingHeader": "Hello World !!!",
  "styles": {"textDecoration": "underline"},
  "tableData": [ 
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]
}), "body");