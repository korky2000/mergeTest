const tertiaryColors = {
    red: 'purple',
    blue: 'orange',
    green: 'pink',
    yellow: 'teal'
};

function moveText() {
    var text1 = document.getElementById("box").value;
    var text2 = document.getElementById("box2").value;

    var selectedColor = document.getElementById("colors").value;

    var tertiaryColor = tertiaryColors[selectedColor];

    var targetDiv1 = document.getElementById(selectedColor + "Div");
    var targetDiv2 = document.getElementById(tertiaryColor + "Div");

    // If the targetDiv1 or targetDiv2 does not exist, create it
    if (!targetDiv1) {
        targetDiv1 = document.createElement("div");
        targetDiv1.id = selectedColor + "Div";
        document.body.appendChild(targetDiv1);
    }
    if (!targetDiv2) {
        targetDiv2 = document.createElement("div");
        targetDiv2.id = tertiaryColor + "Div";
        document.body.appendChild(targetDiv2);
    }

    // Remove existing paragraphs
    while (targetDiv1.firstChild) {
        targetDiv1.removeChild(targetDiv1.firstChild);
    }
    while (targetDiv2.firstChild) {
        targetDiv2.removeChild(targetDiv2.firstChild);
    }

    var paragraph1 = document.createElement("p");
    var paragraph2 = document.createElement("p");

    paragraph1.textContent = text1;
    paragraph2.textContent = text2;

    targetDiv1.appendChild(paragraph1);
    targetDiv2.appendChild(paragraph2);

    targetDiv1.style.display = "block";
    targetDiv2.style.display = "block";
}

function changeDivColor() {
    var selectedColor = document.getElementById("colors").value;
    var tertiaryColor = tertiaryColors[selectedColor];

    // Check if tertiary color exists, if not, use a default color or handle the situation
    if (!tertiaryColor) {
        // Provide a default tertiary color or handle the situation
        tertiaryColor = 'gray'; // For example, if no tertiary color is specified, use gray
    }

    var coloredDivs = document.getElementsByClassName("coloredDiv");
    for (var i = 0; i < coloredDivs.length; i++) {
        coloredDivs[i].style.display = "none";
    }

    document.getElementById(selectedColor + "Div").style.display = "block";
    document.getElementById(tertiaryColor + "Div").style.display = "block";
}

//"clear" the divs
function clearContent() {
    var coloredDivs = document.querySelectorAll(".coloredDiv");
    coloredDivs.forEach(function(div) {
        div.style.display = "none"; 
    });

    document.getElementById("box").value = "";
    document.getElementById("box2").value = "";
}

function generateRandomWord() {
    // List of random words
    const words = ["apple", "banana", "cherry", "orange", "grape", "kiwi", "lemon", "melon"];

    // Generate a random index
    const randomIndex = Math.floor(Math.random() * words.length);

    // Return the random word
    return words[randomIndex];
}

function generateRandomWord2() {
    // List of random words
    const words = ["ice cream", "fudge", "muffin", "chocolate", "marshmallow", "popsicle", "gummy bear", "beer"];

    // Generate a random index
    const randomIndex = Math.floor(Math.random() * words.length);

    // Return the random word
    return words[randomIndex];
}

function populateWords() {
    moveText();
    changeDivColor();
    // Loop through each primary color
    Object.keys(tertiaryColors).forEach(function(primaryColor) {
        // Get the tertiary color for the primary color
        var tertiaryColor = tertiaryColors[primaryColor];

        // Generate a random word
        var randomWord = generateRandomWord();
        var randomWord2 = generateRandomWord2();


        // Get the corresponding colored divs
        var primaryDiv = document.getElementById(primaryColor + "Div");
        var tertiaryDiv = document.getElementById(tertiaryColor + "Div");

        // Create paragraph elements for the words
        var primaryParagraph = document.createElement("p");
        var tertiaryParagraph = document.createElement("p");

        // Set the text content of the paragraph elements
        primaryParagraph.textContent = randomWord;
        tertiaryParagraph.textContent =randomWord2;

        // Append the paragraph elements to the corresponding divs
        primaryDiv.appendChild(primaryParagraph);
        tertiaryDiv.appendChild(tertiaryParagraph);
    });
}

function buttonJob(){
    generateRandomWord();
    populateWords();
}


document.getElementById('fileInput').addEventListener('change', function() {
    const file = this.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const contents = event.target.result;
        const { ticketNumber } = extractTicketAndWords(contents);
        
        // Populate the redDiv with the extracted ticket number
        populateRed(ticketNumber);
    };

    reader.readAsText(file);
});

function populateRed(ticketNumber) {
    // Populate the redDiv with the ticket number
    document.getElementById('redDiv').textContent = ticketNumber;
}

document.getElementById('fileInput').addEventListener('change', function() {
    const file = this.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const contents = event.target.result;
        const ticketNumber = extractTicketAndWords(contents);
        
        // Populate the redDiv with the ticket number
        populateRed(ticketNumber);
    };

    reader.readAsText(file);
});

function extractTicketAndWords(contents) {
    // Extract text between "Ticket Number:" and the closing curly brace
    const match = contents.match(/Ticket Number:\s*(\d+)/);
    if (match && match[1]) {
        return match[1];
    } else {
        console.error("Ticket Number not found in the file.");
        return ''; // Return an empty string if ticket number is not found
    }
}

function buttonPop() {
    // Retrieve the file input element
    const fileInput = document.getElementById('fileInput');

    // Check if a file is selected
    if (fileInput.files.length > 0) {
        // Read the selected file
        const file = fileInput.files[0];
        const reader = new FileReader();

        // Read file contents when loaded
        reader.onload = function(event) {
            // Extract the ticket number from the file contents
            const contents = event.target.result;
            const ticketNumber = extractTicketAndWords(contents);

            // Populate the redDiv with the extracted ticket number
            populateRed(ticketNumber);
        };

        // Read the file as text
        reader.readAsText(file);
    } else {
        // If no file is selected, display an error message or handle it as needed
        console.error("No file selected.");
    }
}
