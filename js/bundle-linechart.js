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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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
/* 1 */
/***/ (function(module, exports) {

// set the dimensions and margins of the graph
var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    },
    width = 500 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom,
    skew = 40;

var colorsScale = d3.schemeCategory20;

// parse the month
var parseMonth = d3.timeParse('%b'); //月份的縮寫
var formatMonth = d3.timeFormat('%b');

// set the ranges
var scaleX = d3.scaleTime().range([0, width]);
var scaleY = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3.line()
    .curve(d3.curveCatmullRom)
    .x(function (d) {
        return scaleX(d.month) - skew / 2;
    })
    .y(function (d) {
        return scaleY(d.price);
    });

var outerline = d3.line()
    .x(function (d) {
        return d.x;
    })
    .y(function (d) {
        return d.y;
    });

var t = d3.transition()
    .duration(2800)
    .ease(d3.easeLinear)
    .on('start', function (d) {
        console.log('transiton start');
    })
    .on('end', function (d) {
        console.log('transiton end');
    })

var setPathAnimation = function (path) {
    var totalLength;
    totalLength = path.node().getTotalLength();
    return path.attr('stroke-dasharray', totalLength + ' ' + totalLength)
        .attr('stroke-dashoffset', totalLength)
        .transition(t)
        .attr('stroke-dashoffset', 0);
};

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select('body').append('svg')
    .attrs({
        width: width + margin.left + margin.right + skew / 2,
        height: height + margin.top + margin.bottom
    })
    .append('g')
    .attr('transform', 'translate(' + (margin.left + skew / 2) + ',' + margin.top + ')');

// set thhe background color
svg.append('rect')
    .attrs({
        x: (-skew - 4),
        y: -4,
        fill: '#F2F2F2',
        width: width + margin.left,
        height: height + 8
    })

svg.append('rect')
    .attrs({
        x: -skew,
        fill: '#FFF',
        width: width + skew,
        height: height
    });

var xAxis = d3.axisBottom(scaleX).tickFormat(function (d) {
    return formatMonth(d);
}).tickSize(-height, 0).ticks(12).tickPadding(8);

var yAxis = d3.axisLeft(scaleY).tickValues([30, 40, 50, 60, 70, 80, 90])
    .tickSize(-width - skew, 0).tickPadding(8);

var tooltip = d3.select('body').append('div').attr('class', 'tooltip');

var linePath, circles;
// Get the data
d3.csv('./data/data.csv', function (error, data) {
    console.debug(JSON.stringify(data));
    if (error) throw error;

    // format the data
    data.forEach(function (d) {
        d.month = parseMonth(d.month);
        d.price = +d.price;
    });

    // scale the range of the data
    scaleX.domain(d3.extent(data, function (d) {
        return d.month;
    }));
    scaleY.domain([30, 90]);

    // Add the X Axis
    svg.append('g')
        .attr('class', 'xAxis-grid')
        .style('text-anchor', 'middle')
        .call(xAxis)
        .attr('transform', 'translate(0,' + height + ')')
        .selectAll('text')
        .attr('dx', -skew / 2);

    svg.append('path')
        .data([
            [{
                x: -skew,
                y: height
            }, {
                x: width,
                y: height
            }]
        ])
        .attrs({
            class: 'outerline',
            d: outerline
        });

    // Add the Y Axis
    svg.append('g')
        .attrs({
            class: 'yAxis-grid',
            transform: 'translate(-43,0)'
        })
        .call(yAxis);

    // text label for the y axis
    svg.append('text')
        .attrs({
            x: 0,
            y: -20,
            dx: -45,
            dy: '1em'
        })
        .style('text-anchor', 'middle')
        .text('單價/萬');

    svg.append('path')
        .data([
            [{
                    x: -skew,
                    y: 0
                },
                {
                    x: -skew,
                    y: height
                }
            ]
        ])
        .attr('class', 'outerline')
        .attr('d', outerline);

    // add the valueline path.
    var path = svg.append('path')
        .data([data])
        .attr('class', 'line')
        .attr('d', valueline);



    // add the dots
    circles = svg.selectAll('dot')
        .data(data)
        .enter()
        .append('circle')
        .attrs({
            cx: function (d) {
                return scaleX(d.month) - 20;
            },
            cy: function (d) {
                return scaleY(d.price);
            },
            r: 0,
            fill: '#fff',
            stroke: '#D53F52',
            'stroke-width': '2px'
        })
        .on('mouseover', function (d) {
            d3.select(this).attr('stroke-width', '4px');
            tooltip.transition()
                .duration(200)
                .style('opacity', .9);
            tooltip.html('月份：' + formatMonth(d.month) + ' </br>單價：' + d.price + '/萬')
                .style('left', (d3.event.pageX) + 'px')
                .style('top', (d3.event.pageY - 28) + 'px');
            tooltip.style('display', 'block');
        })
        .on('mousemove', function (d) {
            tooltip.style('top', d3.event.pageY - 15 + 'px').style('left', d3.event.pageX + 15 + 'px');
        })
        .on('mouseout', function (d) {
            d3.select(this).attr('stroke-width', '2px');
            tooltip.style('display', 'none');
        });


    setPathAnimation(path);
    var i = 0;
    while (i < circles._groups[0].length) {
        fn$(i);
        i++;
    }

    function fn$(i) {
        return setTimeout(function () {
            d3.select(circles._groups[0][i]).transition().attr('r', 5);
        }, 210 * i);
    }

});


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(0);


/***/ })
/******/ ]);