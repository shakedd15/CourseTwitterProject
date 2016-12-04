window.onload = function () {
    test_group('first test group', function() {
        assert(countingLogoImage(), "simple successful test");
    });
};

function assert(value, name) {
    var placeHolder = document.getElementById("testPlace");
    var div = document.createElement("div");
    var li = document.createElement("li");
    li.style.border = "1px";
    li.style.borderColor = "black";
    li.style.borderStyle = "groove";
    li.innerHTML = name;

    if(value == true){
        div.style.backgroundColor = "#8bd497";
    }
    else {
        div.style.backgroundColor = "#d4100c";
    }

    div.appendChild(li);
    placeHolder.appendChild(div);
}

function test_group(name, test_group_function){
    var placeHolder = document.getElementById("testPlace");
    var div = document.createElement("div");
    var ul = document.createElement("ul");
    var h = document.createElement("h4");
    h.innerHTML = name;
    placeHolder.appendChild(div);
    div.appendChild(h);
    div.appendChild(ul);
    test_group_function();
}

function countingLogoImage() {
    return document.querySelectorAll("#logo").length == 1;
}