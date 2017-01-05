# VLib - A simple VanillaJS View Library

A simple view library, meant to show how to build the markup purely with JavaScript
and native DOM Operations.

Features:

* It leverages babel-transform-jsx to make use of the JSX syntax if preferred.
* It uses [diffhtml](https://www.npmjs.com/package/diffhtml) for performant HTML updates.
* Redux is used to have a single-state propagation and dev-controllable rerenders
* Redux DevTools for nice state monitoring

## How to run the example

In your terminal run:

```bash
// install dependencies
npm install

// run babel/webpack + http-server
npm start
```