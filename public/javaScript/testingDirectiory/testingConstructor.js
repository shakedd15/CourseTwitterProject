let ul, isSeccess;

function assert(value, name) {
    isSeccess = value;
    ul = document.createElement("ul");
    let placeHolder = document.getElementById("testPlace");
    let testItem = document.createElement("testIfAllSuccess");
    testItem.style.border = "1px";
    testItem.style.borderColor = "black";
    testItem.style.borderStyle = "groove";
    testItem.innerHTML = name;

    testItem.style.backgroundColor = value ? "#8bd497" : "#d4100c";

    ul.appendChild(testItem);
    placeHolder.appendChild(ul);
}

function test_group(name, test_group_function) {
    let placeHolder = document.getElementById("testPlace");
    let divTestGroup = document.createElement("div");
    let testTitle = document.createElement("h4");
    testTitle.innerHTML = name;
    divTestGroup.appendChild(testTitle);
    placeHolder.appendChild(divTestGroup);
    test_group_function();
    if (isSeccess) {
        divTestGroup.style.backgroundColor = "#8bd497";
    } else {
        divTestGroup.style.backgroundColor = "#d4100c";
    }

    divTestGroup.appendChild(ul);

}