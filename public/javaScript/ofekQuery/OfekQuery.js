function $(selector) {
    var OfekQuery = function (elemnts) {
        this.elements = elemnts;
    };

    function addAllTheChildrenElements(elements) {
        var elementsList = [];
        elements.forEach(function (currentElement) {
            if (currentElement.children.length) {
                Array.from(currentElement.getElementsByTagName("*")).forEach(function (childElement) {
                    elementsList.push(childElement);
                })
            } else {
                elementsList.push(currentElement);
            }
        });
        return elementsList;
    }

    var elements = Array.from(document.getElementsByTagName("*"));

    var selectors = selector.split(" ");

    selectors.forEach(function (currentSelector) {
        elements = runTypeOfSelector(currentSelector, elements);
        if (selectors.indexOf(currentSelector) != selectors.length - 1) {
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
        var tempElements = [];
        elements.forEach(function (elem) {
            var tempNode = elem.cloneNode(true);
            var shaked = fn(tempNode);
            tempElements.push(shaked)
        });
        return tempElements;
    };

    OfekQuery.prototype.any = function () {
        var functions = Array.from(arguments);
        for (var element of elements) {
            for (var fn of functions) {
                if (fn(element) && functions(fn) == functions.length - 1) {
                    return true;
                }
            }
        }
        return false;
    };

    OfekQuery.prototype.all = function () {
        var functions = Array.from(arguments);
        for (var element of elements) {
            for (var fn of functions) {
                if (!fn(element)) {
                    return false;
                }
            }
        }
        return true;
    };

    OfekQuery.prototype.filter = function (fn) {
        var functions = Array.from(arguments);
        var ofekQuery = [];
        for (var element of elements) {
            for (var fn of functions) {
                if (fn(element) && functions(fn) == functions.length - 1) {
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

    OfekQuery.prototype.setAttribute = function (attributeName, attributeValue) {
        elements.forEach(function (element) {
            element[attributeName] = attributeValue;
        });
    };

    OfekQuery.prototype.getAttribute = function (attributeName) {
        var atributeArray = [];
        elements.forEach(function (element) {
            if (element[attributeName]) {
                atributeArray.push(element);
            }
        });
        return atributeArray;
    };

    OfekQuery.prototype.appendChild = function (childElement) {
        var docFrag = document.createDocumentFragment();
        docFrag.appendChild(childElement);

        elements.forEach(function (elem) {
            elem.appendChild(docFrag.cloneNode(true));
        });
    };

    return new OfekQuery(elements);
}

function runTypeOfSelector(selector, elements) {
    if (selector[0] == "#") {
        return getIdFromDocument(selector, elements);
    } else if (selector[0] == ".") {
        return getClassFromDocument(selector, elements);
    } else {
        return getTagFromDocument(selector, elements);
    }
}

function getTagFromDocument(selector, elements) {
    return elements.filter(function (element) {
        return element.tagName === selector.toUpperCase();
    });
}

function getIdFromDocument(selector, elements) {
    return elements.filter(function (elem) {
        return elem.id === selector.substring(1);
    });
}

function getClassFromDocument(selector, elements) {
    return elements.filter(function (elem) {
        return elem.classList.contains(selector.substring(1));
    });
}