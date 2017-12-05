var d3 = require('d3');

module.exports = function (document, wrapper, data) {
    // EDITING STARTS HERE
    
        var color_palette = ["#5e6485","#ba5659","#ab7e8c","#b6b95d","#f8d984"];

        var width = 800,
        height = 600;
    
        /*
         * Use this variable instead of d3.select("body").append("svg")
         * */
        // var svg = d3.select("body").append("svg")
         var svg = wrapper
            .attr("width", width)
            .attr("height", height)
        ;
    
        var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 800 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

        var parseDate = d3.timeParse("%Y %b %d");

        var x = d3.scaleTime().range([0, width]),
            y = d3.scaleLinear().domain([0,4000]).range([height, 0]),
            z = d3.scaleOrdinal().range(color_palette);

        var stack = d3.stack();

        var area = d3.area()
            .x(function(d, i) { return x(d.data.date); })
            .y0(function(d) { return y(d[0]); })
            .y1(function(d) { return y(d[1]); });

        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var objKeys = Object.keys(data[0]);
    
        data.map(type);

        var keys = objKeys.slice(1);

        x.domain(d3.extent(data, function(d) { return d.date; }));
        z.domain(keys);
        stack.keys(keys);

        var layer = g.selectAll(".layer")
            .data(stack(data))
            .enter().append("g")
            .attr("class", "layer");

        layer.append("path")
            .attr("class", "area")
            .style("fill", function(d) { return z(d.key); })
            .attr("d", area);

        layer.filter(function(d) { return d[d.length - 1][1] - d[d.length - 1][0] > 0.01; })
            .append("text")
            .attr("x", width - 6)
            .attr("y", function(d) { return y((d[d.length - 1][0] + d[d.length - 1][1]) / 2); })
            .attr("dy", ".35em")
            .style("font-family", "sans-serif")
            .style("font-size", "10px")
            .style("text-anchor", "end")
            .text(function(d) { return d.key; });

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y));

        function type(d) {
            d.date = parseDate(d.date);
            return d;
        }


    // EDITING ENDS HERE
    return wrapper['_groups'][0][0];
};