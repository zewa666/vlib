import { element as diffhtmlElement } from "diffhtml";

export const ACTION_PRERENDER_DONE = "prerendering done";
export const prerenderingDone = {
  "type": ACTION_PRERENDER_DONE,
  "value": { "isPrerendered": false }
};

function checkForTypeError(exp, msg) {
  if(exp) {
    throw msg;    
  }
}

export function VLibRender(content, model, selector, id) {
  if (model.isPrerendered) {
    document.querySelector(selector).removeChild(document.getElementById(id));
  }
  
  checkForTypeError(typeof content !== "function", "Provided content must be a function accepting a model");

  if (document.getElementById(id)) {
    diffhtmlElement(document.getElementById(id), content(model));
    return document.getElementById(id);
  }

  if (!selector) {
    throw "Selector missing for mount point";
  }

  if (!id) {
    throw "Id of root missing";
  }

  return document.querySelector(selector).appendChild(content(model));       
}

function addText(elem, content) {
  const textElem = document.createTextNode(content);

  elem.appendChild(textElem);      
}

function processAttributes(elem, attrs) {
  if (attrs) {
    for (let [key, value] of Object.entries(attrs)) {
      if (["class", "classname", "classlist"].indexOf(key.toLowerCase()) > -1) {
        elem.className = value instanceof Array 
          ? value.join(" ")
          : value;
      } else if (key === "style") {
        checkForTypeError(!(value instanceof Object), "Style bindings must use an object")

        for (let [styleEntry, styleVal] of Object.entries(value)) {
          elem.style[styleEntry] = styleVal;
        }
      } else if (key.indexOf("on") === 0 && typeof value === "function") {       
        elem.addEventListener(key.replace("on", ""), value, false);
      } else {
        elem.setAttribute(key, value);
      }
    }
  }
}

function matchContent(elem, content) {
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
        checkForTypeError(typeof Node !== "undefined" &&
                          !(content instanceof Node), "Child needs to be of type Node");
        elem.appendChild(content);
    }
  }
}

export function VLibCreate(tagName, attrs, content, ...children) {
  checkForTypeError(typeof tagName !== "string", "No valid tagName provided");
  checkForTypeError(typeof HTMLUnknownElement !== "undefined" &&
                    document.createElement(tagName) instanceof HTMLUnknownElement, "Unknown tagName provided");

  let elem = document.createElement(tagName.toUpperCase());
  
  matchContent(elem, content);

  processAttributes(elem, attrs);

  if (children && children.length > 0) {    
    children.forEach( (child) => {      
      matchContent(elem, child);
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
