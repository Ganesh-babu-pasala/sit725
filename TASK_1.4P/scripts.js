function changeText() {
    var textsArray = ["Hello, SIT725!", "Welcome to JavaScript!", "Git is amazing!", "Enjoy coding!", "Keep Learning!"];
    var number = Math.floor(Math.random() * textsArray.length);
    document.getElementById("heading").innerText = textsArray[number];
}

