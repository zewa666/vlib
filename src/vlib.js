import { element as diffhtmlElement } from "diffhtml";

var mountedContent = null;
var mainContent = null;
var mainModel = null;
var mainSelector = null;
var mainId = null;
var renderedComp = null;


export function VLibRender(content, model, selector, id) {
  if (mountedContent) {
    diffhtmlElement(document.getElementById(mainId), mainContent(mainModel));
    return;
  }

  if (!selector) {
    throw "Selector missing for mount point";
  }

  if (!id) {
    throw "Id of root missing";
  }

  mainContent = content;
  renderedComp = content(model);
  mainModel = model;
  mainId = id;
  mainSelector = selector;
  mountedContent = document.querySelector(mainSelector).appendChild(renderedComp);       
}

function typeError(exp, msg) {
  if(exp) {
    throw msg;    
  }
}

function addText(elem, content) {
  const textElem = document.createTextNode(content);

  elem.appendChild(textElem);      
}

function processAttributes(elem, attrs) {
  if (attrs) {
    for (let [key, value] of Object.entries(attrs)) {
      if (["class", "classname", "classlist"].indexOf(key.toLowerCase()) > -1) {
        typeError(!(value instanceof Array), "Class bindings must use an array");

        elem.className = value.join(" ");
      } else if (key === "style") {
        typeError(!(value instanceof Object), "Style bindings must use an object")

        for (let [styleEntry, styleVal] of Object.entries(value)) {
          elem.style[styleEntry] = styleVal;
        }
      } else if (key.indexOf("on") === 0 && typeof value === "function") {       
        elem.addEventListener(key.replace("on", ""), () => {
          value();
          VLibRender();
        }, false);
      } else {
        elem.setAttribute(key, value);
      }
    }
  }
}

export function VLibCreate(tagName, attrs, content, ...children) {
  typeError(!tagName, "No valid tagName provided");

  let elem = document.createElement(tagName.toUpperCase());
  
  if (content) {
    switch (typeof content) {
      case "string":
        addText(elem, content);
        break;
      case "number":
        addText(elem, content);
        break;
      case "boolean":
        addText(elem, content ? "true" : "false")
        break;
      case "object":
        elem.appendChild(content);
        break;
    }
  }

  processAttributes(elem, attrs);

  if (children && children.length > 0) {    
    children.forEach( (child) => {      
      elem.appendChild(child);
    });
  }
  
  return elem;
}

export let VLibTag = {};

["h1", "h2", "h3", "div", "p", "br",
 "table", "thead", "tbody", "th", "tr", "td"].map( (tagName) => {
  VLibTag[tagName] = function(attrs, content, ...children) {
    if (children && children.length > 0) {
      return VLibCreate(tagName, attrs, content, ...children);
    } else {
      return VLibCreate(tagName, attrs, content);
    }
  }
});
