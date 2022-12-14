var { onChangeOutput } = require('./helper')

const interval = onChangeOutput((x) => console.log("current output", x))







