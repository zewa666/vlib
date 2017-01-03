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

let jsx = <div>
  <h2>Some JSX generated content.</h2>
</div>

let content = () => div({"id": "main-content"},
  h2({"class": ["red", "blue"]}, "Hello World"),
  p(null, "Lorem ipsum dolor sit amet"),
  br(),
  p({"style": {"textDecoration": "underline"}}, "Das ist ein Test"),
  renderTable( [ 
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]),
  p({}, true),
  p(null, Math.random(0, 1)),
  p(null, null),
  jsx
);

VLibRender(content(), "body");