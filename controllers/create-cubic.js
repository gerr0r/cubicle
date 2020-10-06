const Cubic = require("../models/cubic.js");

const newCubic1 = new Cubic("Test name", "Test description", "https://google.com", 2);
const newCubic2 = new Cubic();

console.log(newCubic1);
newCubic1.save();
console.log(newCubic2);
newCubic2.save();