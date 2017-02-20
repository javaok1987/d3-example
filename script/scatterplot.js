var Utils = require('./utils');

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
