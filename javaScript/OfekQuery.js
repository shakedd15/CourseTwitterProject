let OfekQuery = function (elemnts) {
    this.elements = elemnts;
};

function runTypeOfSelector(selector, elements) {
    if (selector[0] == "#") {
        return getIdFromDocument(selector, elements);
    } else if (selector[0] == ".") {
        return getClassFromDocument(selector, elements);
    } else {
        return getTagFromDocument(selector, elements);
    }
}

function getTagFromDocument(selector, elements){
    return elements.filter(function (element) {
        return element.tagName === selector.toUpperCase();
    });
}

function getIdFromDocument(selector, elements){
    return elements.filter(function (elem) {
        return elem.id === selector.substring(1) ;
    });
}

function getClassFromDocument(selector, elements){
    return elements.filter(function (elem) {
        return elem.classList.contains(selector.substring(1));
    });
}

function addAllTheChildrenElements(elements) {
    let elementsList = [];
    elements.forEach(function (currentElement) {
        if(currentElement.children.length){
            Array.from(currentElement.getElementsByTagName("*")).forEach(function (childElement) {
                elementsList.push(childElement);
            })
        }else {
            elementsList.push(currentElement);
        }
    });
    return elementsList;
}

function $(selector) {

    let elements = Array.from(document.getElementsByTagName("*"));

    let selectors = selector.split(" ");

    selectors.forEach(function(currentSelector){
        elements = runTypeOfSelector(currentSelector, elements);
        if(selectors.indexOf(currentSelector) != selectors.length-1){
            elements = Array.from(new Set(addAllTheChildrenElements(elements)));
        }
    });

    OfekQuery.prototype.addClass = function (className) {
        elements.forEach(function (element) {
            element.classList.add(className);
        })
    };

    OfekQuery.prototype.removeClass = function (className) {
        elements.forEach(function (element) {
            element.classList.remove(className);
        })
    };

    OfekQuery.prototype.each = function (fn) {
        elements.forEach(function (element) {
            fn(element);
        })
    };

    OfekQuery.prototype.map = function (fn) {
        let newArray = [];
        elements.forEach(function (element) {
            let currentNode = element.cloneNode(true);
            fn(currentNode);
            newArray.push(currentNode)
        });
        return newArray;
    };

    OfekQuery.prototype.any = function (fn) {
        let functions =Array.from(arguments);
        for (let element of elements){
            for(let fn of functions){
                if(fn(element) && functions(fn) == functions.length-1){
                    return true;
                }
            }
        }
        return false;
    };

    OfekQuery.prototype.all = function () {
        let functions =Array.from(arguments);
        for (let element of elements){
            for(let fn of functions){
                if(!fn(element)){
                    return false;
                }
            }
        }
        return true;
    };

    OfekQuery.prototype.filter = function (fn) {
        let functions =Array.from(arguments);
        let ofekQuery = [];
        for (let element of elements){
            for(let fn of functions){
                if(fn(element) && functions(fn) == functions.length-1){
                    ofekQuery.push(element);
                }
            }
        }
        return new OfekQuery(ofekQuery);
    };

    OfekQuery.prototype.css = function (property, value) {
        elements.forEach(function (element) {
            element.style[property] = value;
        })
    };

    OfekQuery.prototype.count = function () {
        return elements.length;
    };

    OfekQuery.prototype.get = function (index) {
        return elements[index];
    };

    OfekQuery.prototype.setAttribute = function(attributeName, attributeValue) {
        elements.forEach(function (element) {
            element[attributeName] = attributeValue;
        });
    };

    OfekQuery.prototype.getAttribute = function(attributeName) {
        let atributeArray = [];
        elements.forEach(function (element) {
            if(element[attributeName]){
                atributeArray.push(element);
            }
        });
        return atributeArray;
    };

    OfekQuery.prototype.appendChild = function (childElement) {
        elements.push(childElement);
    };

    return new OfekQuery(elements);
}

