const express = require("express");
const app = express();

const collectibles = [
  { name: "shiny ball", price: 5.95 },
  { name: "autographed picture of a dog", price: 10 },
  { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
];

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" },
];

// define a homepage
app.get("/", (req, res) => {
  res.send("<h1>This is our homepage!</h1>");
});

app.get("/greetings/:user", (req, res) => {
  console.log(req.params.user);
  res.send(`Hello ${req.params.user}`);
});

app.get("/roll/:target", (req, res) => {
  let targetNum = req.params.target;
  // thanks for the extra reading on regex's Mat!
  regex = /[0-9]+/;
  const randomNum = (target) => Math.floor(Math.random() * target);
  if (regex.test(targetNum)) {
    // if (!isNaN(targetNum)){ this line made with help of Ian
    res.send(`You rolled a ${randomNum(targetNum)}`);
  } else {
    res.send(`You must specify a number`);
  }
});

app.get("/collectibles/:index", (req, res) => {
  let targetItem = req.params.index;
  if (targetItem < collectibles.length && targetItem > -1) {
    res.send(
      `So, you want the ${collectibles[targetItem].name}? For ${collectibles[targetItem].price}, it can be yours!`
    );
  } else {
    res.send("This item is not yet in stock. Check back soon!");
  }
});

app.get("/shoes", (req, res) => {
  const regex = /[0-9]+/;
  const regex2 = /['sandal','sneaker','boot','heel']/
  const target = req.query.target;
  const filter = req.query.filter;
// filter function syntax and usage taught with the help of perplexity.ai
  if (filter === "minPrice" && target !== "" && regex.test(target)) {
        let filteredList = shoes.filter((shoe) => shoe.price > target);
    res.send(filteredList);
  } else if (filter === "maxPrice" && target !== "" && regex.test(target)) {
    filteredList = shoes.filter((shoe) => shoe.price < target);
    res.send(filteredList);
  } else if (filter === "type" && target !== "" && regex2.test(target)){
    filteredList = shoes.filter((shoe) => shoe.type === target);
    res.send(filteredList)
  } else{ 
    // the instructions don't calling for throwing an error if invalid filter or an empty filtered list so I chose to be lazy
    res.send(shoes)
  }
});

app.listen(3000, () => {
  console.log("Listening on 3000");
});
