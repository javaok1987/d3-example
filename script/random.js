/**
 * Generate random function.
 * rand(max) - generate a random number between zero and max.
 * rand(min,max) - generate a random number between min and max.
 * rand(min,max,n) - genrate n random numbers between min and max.
 */
const random = function() {
  var n = 1,
    min = 0,
    max = 9999,
    argc = arguments.length

  if (argc > 3) return -1

  switch (argc) {
    case 1:
      max = arguments[0]
      break
    case 3:
      n = arguments[2]
    case 2:
      min = arguments[0]
      max = arguments[1] - min
      break
  }
  // Closure function
  var _rand = function() {
    return Math.round(Math.random() * max + min)
  }

  if (n == 1) return _rand()
  else {
    result = []
    for (var i = 0; i < n; i++) result.push(_rand())

    return result
  }
}

module.exports = random
