# VLib - A simple VanillaJS View Library

A simple view library, meant to show how to build the markup purely with JavaScript
and native DOM Operations.

Features:

* It leverages babel-transform-jsx to make use of the JSX syntax if preferred.
* It uses [diffhtml](https://www.npmjs.com/package/diffhtml) for performant HTML updates.
* Redux is used to have a single-state propagation and dev-controllable rerenders
* Redux DevTools for nice state monitoring
* Server rendering with initial state propagation

## How to run the example

In your terminal run:

```bash
// install dependencies
npm install

// run babel/webpack + http-server
npm start
```

If you want to see the example using server side initial rendering use:

```bash
npm run server
```

This will serve the app from the node application server.

## Notes on server side prerendering

When the server renders the markup it will send it as part of the initial request. As such the user
can immediatelly see the rendered UI. One problem though is that all event listeners aren't attached
as they'd need client side processing.
As such the frontend needs to rebuild the page immediatelly to attach all those handlers. In order to distinguish
the intial prerender the sent initial state will contain a prop `isPrerendered` set to `true`.
After setting up the store and performing the first render, the app should dispatch a new action `prerenderingDone`
exported by the VLib library and toggle `isPrerendered` to `false`.

This way, inspecting the state history, one now can clearly differentiate the `@@INIT` and `prerendering done` state updates.
