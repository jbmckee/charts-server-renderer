# d3-v4-server-renderer
A charts server renderer easy to customize, it uses [d3.js](https://d3js.org/) 
or [FusionCharts](http://www.fusioncharts.com/) to render svg charts on the 
server-side with node.js and to serve it. Based on charts-server-renderer by Michele Di Salvatore but usind D3 V4.

## Getting started
- clone this project
- install all dependencies `npm install`
- run it `node .`
- open your browser at [localhost:1337](http://localhost:1337)

## How to add a new chart type

### To add a new D3 chart
Follow the README in [config/d3](config/d3)

### To add a new FusionCharts chart
Follow the README in [config/fusion-charts](config/fusion-charts)
