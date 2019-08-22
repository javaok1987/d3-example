const margin = {
  top: 30,
  right: 0,
  bottom: 60,
  left: 30
};
const width = 980;
const height = 370;
const barWidth = 48;

const dataSet = [
  { caption: "建案Ａ", id: "001", pinPriceL: "53", pinPriceH: "60", pin: "20-50坪" },
  { caption: "建案Ｂ", id: "002", pinPriceL: "21", pinPriceH: "35", pin: "18-102坪" },
  { caption: "建案Ｃ", id: "003", pinPriceL: "51", pinPriceH: "56", pin: "14-40坪" },
  { caption: "建案Ｄ", id: "004", pinPriceL: "49", pinPriceH: "63", pin: "20-40坪" },
  { caption: "建案Ｅ", id: "005", pinPriceL: "62", pinPriceH: "68", pin: "13-38坪" },
  { caption: "建案Ｆ", id: "006", pinPriceL: "38", pinPriceH: "43", pin: "37-58坪" }
];

const yGroupMin = d3.min(dataSet, d => +d.pinPriceL) - 5;
const yGroupMax = d3.max(dataSet, d => +d.pinPriceH) + 5;

// 準備圖表.
const svg = d3
  .select("body")
  .append("svg")
  .attr("class", "chart")
  .attr("width", width)
  .attr("height", height);

const chart = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

const xScale = d3
  .scaleBand()
  .domain(dataSet.map(d => d.caption))
  .range([0, width])
  .padding(0.1);

const yScale = d3
  .scaleLinear()
  .domain([yGroupMin, yGroupMax])
  .range([height - margin.bottom, 0]);

const yAxis = d3.axisLeft(yScale); // .ticks(6);

const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);

chart
  .append("g")
  .attr("transform", `translate(0,${height - margin.bottom})`)
  .attr("class", "axis-style")
  .call(xAxis);

chart
  .append("g")
  .attr("class", "axis-style")
  .call(yAxis);

const makeYLines = () => d3.axisLeft().scale(yScale);

chart
  .append("g")
  .attr("class", "grid")
  .call(
    makeYLines()
      .tickSize(-width, 0, 0)
      .tickFormat("")
  );

// X 軸線.
svg
  .append("line")
  .attr("class", "domain")
  .attr("x1", margin.left)
  .attr("y1", height - margin.top + 1)
  .attr("x2", width)
  .attr("y2", height - margin.top + 1);

// Y 軸線.
svg
  .append("line")
  .attr("class", "domain")
  .attr("x1", margin.left)
  .attr("y1", margin.top)
  .attr("x2", margin.left)
  .attr("y2", height - margin.top + 1);

const infoWindow = d3
  .tip()
  .attr("class", "d3-tip")
  .html(d => `${d.pinPriceL}~${d.pinPriceH}萬/坪`)
  .direction("n");

svg.call(infoWindow);

// 計算bar位移寬度.
const padding = (xScale.bandwidth() - barWidth) / 2;

const barGroups = chart
  .selectAll()
  .data(dataSet)
  .enter()
  .append("g");

barGroups
  .append("rect")
  .attr("class", "bar")
  .attr("x", d => xScale(d.caption) + padding)
  .attr("y", d => yScale(d.pinPriceH))
  .attr("width", 48)
  .attr("height", d => {
    const h = yScale(d.pinPriceL) - yScale(d.pinPriceH);
    return h === 0 ? 3 : Math.abs(h);
  })
  .attr("rx", 3)
  .attr("ry", 3);

barGroups
  .append("rect")
  .attr("class", "bar-group")
  .attr("x", d => xScale(d.caption) + padding)
  .attr("y", 0)
  .attr("width", 48)
  .attr("height", height - 30)
  .on("mouseover", function(data) {
    d3.select(this.parentNode).classed("is-hover", true);
    chart.selectAll(".grid").classed("is-hide", true);
    infoWindow.offset([yScale(data.pinPriceH) - 15, 0]);
    infoWindow.show(data, this);
  })
  .on("mouseout", function() {
    d3.select(this.parentNode).classed("is-hover", false);
    chart.selectAll(".grid").classed("is-hide", false);
    infoWindow.hide();
  });

// 上標線.
barGroups
  .append("line")
  .attr("class", "bar-line pin-price-h")
  .attr("x1", 0)
  .attr("y1", d => yScale(d.pinPriceH))
  .attr("x2", d => xScale(d.caption) + padding)
  .attr("y2", d => yScale(d.pinPriceH));

// 下標線.
barGroups
  .append("line")
  .attr("class", "bar-line pin-price-l")
  .attr("x1", 0)
  .attr("y1", d => yScale(d.pinPriceL))
  .attr("x2", d => xScale(d.caption) + padding)
  .attr("y2", d => yScale(d.pinPriceL));

svg
  .append("text")
  .attr("x", 0)
  .attr("y", 15)
  .attr("class", "bar-axis")
  .text("單價 / 萬(坪)");
