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
    .attr('width', width + margin.left + margin.right + skew / 2)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + (margin.left + skew / 2) + ',' + margin.top + ')');

// set thhe background color
svg.append('rect')
    .attr('x', -skew - 4)
    .attr('y', -4)
    .attr('fill', '#F2F2F2')
    .attr('width', width + margin.left)
    .attr('height', height + 8);

svg.append('rect')
    .attr('x', -skew)
    .attr('fill', '#FFF')
    .attr('width', width + skew)
    .attr('height', height);

var xAxis = d3.axisBottom(scaleX).tickFormat(function (d) {
    return formatMonth(d);
}).tickSize(-height, 0).ticks(12).tickPadding(8);

var yAxis = d3.axisLeft(scaleY).tickValues([30, 40, 50, 60, 70, 80, 90])
    .tickSize(-width - skew, 0).tickPadding(8);

var linePath, circles;
// Get the data
d3.csv('../data.csv', function (error, data) {
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
        // .attr('transform', 'translate(-23,' + height + ')')
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
        .attr('class', 'outerline')
        .attr('d', outerline);

    // Add the Y Axis
    svg.append('g')
        .attr('class', 'yAxis-grid')
        .attr('transform', 'translate(-43,0)')
        .call(yAxis);

    // text label for the y axis
    svg.append('text')
        .attr('y', -20)
        .attr('x', 0)
        .attr('dy', '1em')
        .attr('dx', -45)
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
