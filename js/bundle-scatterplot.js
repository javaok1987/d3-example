/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var Utils = {};
/**
 * Generate random function.
 * rand(max) - generate a random number between zero and max.
 * rand(min,max) - generate a random number between min and max.
 * rand(min,max,n) - genrate n random numbers between min and max.
 */
Utils.rand = function () {
    var n = 1,
        min = 0,
        max = 9999,
        argc = arguments.length;

    if (argc > 3)
        return -1;

    switch (argc) {
        case 1:
            max = arguments[0];
            break;
        case 3:
            n = arguments[2];
        case 2:
            min = arguments[0];
            max = arguments[1] - min;
            break;
    };
    // Closure function
    var _rand = function () {
        return Math.round(Math.random() * max + min);
    }

    if (n == 1)
        return _rand();
    else {
        result = [];
        for (var i = 0; i < n; i++)
            result.push(_rand());

        return result;
    }
};

module.exports = Utils;


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Utils = __webpack_require__(0);

var dataset = [];
// Generate ten points that (x,y) is between 5 and 30.
for (var i = 0; i < 20; i++) {
    dataset.push({
        "year": Utils.rand(5, 45),
        "ping": Utils.rand(20, 60),
        "type": Utils.rand(0, 19)
    })
}
console.log(JSON.stringify(dataset));

// set the dimensions and margins of the graph
var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    },
    width = 500 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var colorsScale = d3.schemeCategory20;

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select('body').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// set thhe background color
svg.append("rect")
    .attr("x", -4)
    .attr("y", -4)
    .attr('fill','#F2F2F2')
    .attr("width", width + 8)
    .attr("height", height + 8);

    svg.append("rect")
    .attr('fill','#FFF')
    .attr("width", width)
    .attr("height", height);

// set the ranges
var scaleX = d3.scaleLinear().range([0, width]);
var scaleY = d3.scaleLinear().range([height, 0]);

// Scale the range of the data
scaleX.domain(d3.extent(dataset, function (d) {
    return +d.year;
}));
scaleY.domain([20, d3.max(dataset, function (d) {
    return +d.ping;
})]);

// Add the grid
svg.append('g')
    .attr('class', 'xAxis-grid')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(scaleX).ticks(6).tickFormat('').tickSize(-height, 0));

// Add the X Axis
svg.append('g')
    .attr('class', 'xAxis')
    .attr('transform', 'translate(0,' + height + ')')
    .style('text-anchor', 'middle')
    .call(d3.axisBottom(scaleX).ticks(6).tickSize(0, 0).tickPadding(8));

// text label for the x axis
svg.append('text')
    .attr('transform', 'translate(' + (width - margin.right +8) + ' ,' + (height + margin.top + 8) + ')')
    .style('text-anchor', 'middle')
    .text('屋齡');

// Add the grid
svg.append('g')
    .attr('class', 'yAxis-grid')
    .call(d3.axisLeft(scaleY).ticks(3).tickFormat('').tickSize(-width, 0));

// Add the Y Axis
svg.append('g')
    .attr('class', 'yAxis')
    .call(d3.axisLeft(scaleY).ticks(3).tickSize(0, 0).tickPadding(8));

// text label for the y axis
svg.append('text')
    .attr('y', 0)
    .attr('x', -margin.right)
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .text('坪數');

// Add the dots
var circles = svg.selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle');
circles.attrs({
        cx: function (d) {
            return scaleX(d.year);
        },
        cy: function (d) {
            return scaleY(d.ping);
        },
        r: function (d) {
            // return Math.sqrt((d[0] * d[1]) / 3.14);
            return 6;
        },
        text: function (d) {
            return d.ping + '坪/' + d.year + '年';
        },
        fill: function (d) {
            return colorsScale[d.type];
        }
    })
    .on('mouseover', handleMouseOver)
    .on('mouseout', handleMouseOut);

// Create Event Handlers for mouse
function handleMouseOver(d, i) { // Add interactivity
    var $d = d3.select(this);

    // Use D3 to select element, change color and size
    $d.attrs({
        r: function (d) {
            return +$d.attr('r') + 1;
        }
    });

    // Specify where to put label of text
    svg.append('text')
        .attrs({
            id: 't-' + i, // Create an id for text so we can select it later for removing on mouseout
            x: function (d) {
                return +$d.attr('cx') + 15;
            },
            y: function (d) {
                return +$d.attr('cy') + 5;
            }
        })
        .text(function (d) {
            return $d.attr('text');
        });
}

function handleMouseOut(d, i) {
    var $d = d3.select(this);

    // Use D3 to select element, change color back to normal
    d3.select(this).attrs({
        r: function (d) {
            return +$d.attr('r') - 1;
        }
    });

    // Select text by id and then remove
    d3.select('#t-' + i).remove(); // Remove text location
}


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(0);


/***/ })
/******/ ]);