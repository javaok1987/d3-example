var random = require('./random');

const dataset = [];

// Generate ten points that (x,y) is between 5 and 30.
for (var i = 0; i < 10; i++) {
  dataset.push({
    idx: i,
    date: ['2019-08-01', '2019-08-31'],
    address: `羅斯福路${random(1, 5)}段`,
    value: [{ queue: random(5, 100), flow: random(30, 80) }, { queue: random(5, 100), flow: random(30, 80) }],
  });
}
console.log('dataset', dataset);

// set the dimensions and margins of the graph
const margin = {
    top: 30,
    right: 30,
    bottom: 50,
    left: 50,
  },
  width = 500 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

const colorsScale = d3.schemeSet2;

const svg = d3
  .select('body')
  .append('svg')
  .attrs({
    width: width + margin.left + margin.right,
    height: height + margin.top + margin.bottom,
  })
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// set thhe background color
svg
  .append('rect')
  .attrs({
    x: -4,
    y: -4,
  })
  .styles({
    fill: '#F2F2F2',
    width: width + 8,
    height: height + 8,
  });

svg.append('rect').attrs({
  fill: '#FFF',
  width: width,
  height: height,
});

// set the ranges
const scaleX = d3.scaleLinear().range([0, width]);
const scaleY = d3.scaleLinear().range([height, 0]);

// Scale the range of the data
const valAry = d3
  .extent(dataset, function(d) {
    return d3.max(d.value, function(v) {
      return +v.flow;
    });
  })
  .concat(
    d3.extent(dataset, function(d) {
      return d3.min(d.value, function(v) {
        return +v.flow;
      });
    })
  );
const xGroupMax = d3.max(valAry, function(d) {
  return d;
});
const xGroupMin = d3.min(valAry, function(d) {
  return d;
});
scaleX.domain([xGroupMin - 5, xGroupMax + 5]);
scaleY.domain([0, 100]);

// Add the grid
svg
  .append('g')
  .attr('class', 'yAxis-grid')
  .call(
    d3
      .axisLeft(scaleY)
      .ticks(4)
      .tickFormat('')
      .tickSize(-width, 0)
  );

// Add the X Axis
svg
  .append('g')
  .attrs({
    class: 'xAxis',
    transform: 'translate(0,' + height + ')',
  })
  .style('text-anchor', 'middle')
  .call(
    d3
      .axisBottom(scaleX)
      .ticks(0)
      .tickSizeOuter(0)
  );

// text label for the x axis
svg
  .append('text')
  .attr('transform', 'translate(' + (width - margin.right + 8) + ' ,' + (height + margin.top + 8) + ')')
  .style('text-anchor', 'middle')
  .text('Traffic flow');

// Add the Y Axis
svg
  .append('g')
  .attr('class', 'yAxis')
  .call(
    d3
      .axisLeft(scaleY)
      .ticks(4)
      .tickSize(0, 0)
      .tickPadding(4)
  );

// text label for the y axis
svg
  .append('text')
  .attrs({
    x: -margin.right,
    y: '-1rem',
  })
  .style('text-anchor', 'middle')
  .text('Queue');

//arrow
svg
  .append('svg:defs')
  .append('svg:marker')
  .attr('id', 'icon-arrow')
  .attr('refX', 20)
  .attr('refY', 6)
  .attr('markerWidth', 30)
  .attr('markerHeight', 30)
  .attr('markerUnits', 'userSpaceOnUse')
  .attr('orient', 'auto')
  .append('path')
  .attr('d', 'M 0 0 12 6 0 12 3 6')
  .style('fill', '#66c2a5');

//arrow-active
svg
  .append('svg:defs')
  .append('svg:marker')
  .attrs({
    refX: 20,
    refY: 6,
    markerWidth: 30,
    markerHeight: 30,
    markerUnits: 'userSpaceOnUse',
    orient: 'auto',
  })
  .properties({
    id: 'icon-arrow--active',
  })
  .append('path')
  .attr('d', 'M 0 0 12 6 0 12 3 6')
  .style('fill', '#fc8d62');

//line
svg
  .selectAll('date-line')
  .data(dataset)
  .enter()
  .append('line')
  .attrs({
    x1: function(d) {
      return scaleX(+d.value[0].flow);
    },
    y1: function(d) {
      return scaleY(+d.value[0].queue);
    },
    x2: function(d) {
      return scaleX(+d.value[1].flow);
    },
    y2: function(d) {
      return scaleY(+d.value[1].queue);
    },
    'marker-end': 'url(#icon-arrow)',
    class: 'arrow-line',
  })
  .on('mouseover', handleMouseOver)
  .on('mouseout', handleMouseOut)
  .on('mousemove', function(d) {
    tooltip.style('top', d3.event.layerY + 10 + 'px').style('left', d3.event.layerX - 25 + 'px');
  });

// Add the dots
const date1_dot = svg
  .selectAll('date1-dot')
  .data(dataset)
  .enter()
  .append('g');

date1_dot.append('circle').attrs({
  cx: function(d) {
    return scaleX(+d.value[0].flow);
  },
  cy: function(d) {
    return scaleY(+d.value[0].queue);
  },
  r: 10,
  class: 'date1-dot',
  text: function(d) {
    return d.address;
  },
  fill: function(d) {
    return '#66c2a5';
  },
});
date1_dot
  .append('text')
  .attrs({
    x: function(d) {
      return scaleX(+d.value[0].flow);
    },
    y: function(d) {
      return scaleY(+d.value[0].queue);
    },
    transform: 'translate(-3, 3)',
    class: 'date1-dot__text',
  })
  .text(function(d) {
    return d.idx + 1;
  });

const date2_dot = svg
  .selectAll('date2-dot')
  .data(dataset)
  .enter()
  .append('g');
date2_dot.append('circle').attrs({
  cx: function(d) {
    return scaleX(+d.value[1].flow);
  },
  cy: function(d) {
    return scaleY(+d.value[1].queue);
  },
  r: 8,
  class: 'date2-dot',
  text: function(d) {
    return d.address;
  },
  fill: function(d) {
    return '#F56C6C';
  },
});
date2_dot
  .append('text')
  .attrs({
    x: function(d) {
      return scaleX(+d.value[1].flow);
    },
    y: function(d) {
      return scaleY(+d.value[1].queue);
    },
    transform: 'translate(-3, 3)',
    class: 'date2-dot__text',
  })
  .text(function(d) {
    return d.idx + 1;
  });

const tooltip = d3
  .select('body')
  .append('div')
  .attr('class', 'tooltip');

tooltip.append('div').attr('class', 'address');

// Create Event Handlers for mouse
function handleMouseOver(d, i) {
  var $d = d3.select(this);
  d3.select($d._groups[0][0]).classed('is-active', true);
  d3.select($d._groups[0][0]).attr('marker-end', 'url(#icon-arrow--active)');
  tooltip.select('.address').text(d.address);
  tooltip.style('opacity', 1);
}

function handleMouseOut(d, i) {
  var $d = d3.select(this);
  d3.select($d._groups[0][0]).classed('is-active', false);
  d3.select($d._groups[0][0]).attr('marker-end', 'url(#icon-arrow)');
  tooltip.style('opacity', 0);
}
