
// Variables used to create HTML
const students = [
    {last: 'Andrus', first: 'Aaron'},
    {last: 'Masa', first:'Manny'},
    {last: 'Tanda', first: 'Tamanda'}
];

const page = document.body;

// No direction was given as to what was wanted for the 'one two three' bullet points, adding it to the HTML here
page.innerHTML += "<ul><li>one</li><li>two</li><li>three</li></ul>"

function printNames(item){
    page.innerHTML += `<p style="text-align:center">${item["first"]} ${item["last"]}</p><hr>`;
}

students.forEach(printNames);

// No idea why the ponder wanted us to add these - it was never specified 
const words = ['watermelon', 'peach', 'apple', 'tomato', 'grape'];
function convert(grade) {
    switch (grade){
        case 'A':
            points = 4;
            break;
        case 'B':
            points = 3;
            break;
        case 'C':
            points = 2;
            break;
        case 'D':
            points = 1;
            break;
        case 'F':
            points = 0;
            break;
        default:
            alert('not a valid grade');
    }
    return points;
}


//// There was no direction in the ponder with where the console output was coming from, why or anything on those lines. As such I created the console output, but the ponder simply doesn't cover anything about what it wants me to do with the JavaScript
console.log("one");
console.log("two");
console.log("three");
console.log(students);
console.log("7")
console.log(`${7 / 3}`)
console.log(students);
console.log("2")






// Some examples using the map, filter, reduce, and indexOf functions
let someArray = [1,2,3,4,5,6,7,8,9,10]

// Getting the index of specific values in the array
console.log(someArray.indexOf(3)); // Should be 2
console.log(someArray.indexOf(7)); // Should be 6
console.log(someArray.indexOf(1)); // Should be 0

// Example with map
console.log(someArray.map(divider));

// Using map, divide each value in an array in half
function divider(item){
    return item / 2;
}

// example with filter
console.log(someArray.filter(oddBall));

// Use filter to return only odd numbers
function oddBall(item){
    if(item % 2 != 0){
        return item;
    }
    else{
        return;
    }
}


// example using reduce. I also modified the 'total' parameter to start at 0 instead of the value of the first item in the array
console.log(someArray.reduce(compound, 0));

// Use filter to add all even numbers together
function compound(total, item){
    
    if(item % 2 === 0){
        return total + item;
    }
    else{
        return total;
    }
}

