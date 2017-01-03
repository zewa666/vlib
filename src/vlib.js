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
      } else {
        elem.setAttribute(key, value);
      }
    }
  }
}

function VLibCreate(tagName, attrs, content, ...children) {
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

["h1", "h2", "h3", "div", "p", "br",
 "table", "thead", "tbody", "th", "tr", "td"].map( (tagName) => {
  window[tagName] = function(attrs, content, ...children) {
    if (children && children.length > 0) {
      return VLibCreate(tagName, attrs, content, ...children);
    } else {
      return VLibCreate(tagName, attrs, content);
    }
  }
});

var mountedContent = null;

/* eslint-disable no-unused-vars */
function VLibRender(content, selector) {
  
  /* eslint-enable no-unused-vars */
  if (!selector) {
    throw "Selector missing for mount point";
  }

  if (mountedContent) {
    mountedContent.parentNode.replaceChild(content, mountedContent);
    mountedContent = content;
  } else {
    mountedContent = document.querySelector(selector).appendChild(content);    
  } 
}
