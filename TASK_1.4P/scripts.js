function changeText() {
    var textsArray = ["Welcome to SIT 725!", "Week 1 is here!", "Explore software engineering!", "Stay curious and keep learning!", "Let's build something great!"];
    var number = Math.floor(Math.random() * textsArray.length);
    document.getElementById("heading").innerText = textsArray[number];
}
