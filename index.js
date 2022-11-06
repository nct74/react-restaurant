const bcrypt = require("bcryptjs")

const res = bcrypt.hashSync("Thifsfsdfdsfsd is", 10);
console.log(res, res.length)