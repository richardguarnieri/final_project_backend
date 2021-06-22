import { Link } from 'react-router-dom';
import { useState, useEffect, React } from 'react';
import * as d3 from 'd3';
import { selectAll } from 'd3';

const One = () => {
    
    //SVG Variables

    let svgWidth = 1000;
    let svgHeight = 1000;
    
    let chartMargin = {
        top: 60,
        right: 20,
        bottom: 20,
        left: 60
      };

    let chartWidth = svgWidth - chartMargin.left - chartMargin.right;
    let chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;
    
    let radius = Math.min(chartWidth,chartHeight)/2;
    let color = d3.scaleOrdinal(d3.schemeTableau10);
    
    console.log(color);

    let svg = {};
    let sunburst = {};

    let partition = d3.partition()
        .size([2*Math.PI, radius]);

    let rootNode = {
        "name": "GENRE",
        "children": []
    };
    // Backend & Event Listener variables
    const [year, setYear] = useState('');
    const herokuBackend = 'https://itesm-project2-backend.herokuapp.com'

    useEffect(() => {    
        const general = async () => {
            let menuYears = d3.selectAll("#year-movie");
            menuYears.selectAll("option").remove();            
            try {
                // Populate years dropdown
                const response = await fetch(`${herokuBackend}/all_years`);
                const data = await response.json();
                Object.entries(data).forEach(function([key, value]){
                    menuYears.append("option")
                    .text(value)
                    .attr("value", value);
                });               
                // Get data for de default graph
                const default_response = await fetch(`${herokuBackend}/year/1894`);
                const default_data = await default_response.json();
                graphSuburst(default_data);

            } catch(err) {
                console.log(err);
            }
        }
        general();

    }, []);
    
    
    useEffect(() => {
        const general = async () => {
            try {
                const response = await fetch(`${herokuBackend}/year/${year}`);
                const data = await response.json();
                // console.log(data);
                console.log(year);
                graphSuburst(data); 
            } catch(err) {
                console.log(err);
            }
        }
        general();
    }, [year]);

    function graphSuburst(movie_data){
        // Data formatting
        rootNode = {
            "name": "GENRE",
            "children": []
        };

        let genres = [];
        movie_data = Object.entries(movie_data).slice(0,10);
        movie_data = movie_data.map(d => d[1]);
        console.log(movie_data);

        // Object.entries(movie_data).forEach(function([key, value]){

        // });

        movie_data.forEach(function(movie){
            genres.push(movie.genre_1);
        });
        
        genres = genres.filter((val, index) => genres.indexOf(val) === index);
        
        console.log(genres);
 

        genres.forEach((genre)=>{
            let nodeElement = {};
            let movie_titles = [];

            Object.entries(movie_data).forEach(function([key, value]){
                if (value.genre_1 == genre){
                    let titleObject ={
                        "name": value.title,
                        "size": 1
                    };
                    movie_titles.push(titleObject);    
                }
            });

            nodeElement["name"] = genre;
            nodeElement["children"] = movie_titles;
            rootNode["children"].push(nodeElement);
        });

        console.log(rootNode);

        d3.selectAll('svg').remove();
        
        partition = d3.partition()
            .size([2*Math.PI, radius]);

        // Graphing the sunburst
        svg = d3.selectAll("#graph-section")
            .append("svg")
            .attr("height", svgHeight)
            .attr("width", svgWidth)
            .attr("class", "svg-sunburst");

        sunburst = svg.append("g")
            .attr("transform", `translate(${chartWidth/2}, ${chartHeight/2})`);

        let root = d3.hierarchy(rootNode)
            .sum(function (d){ return d.size});
        
        partition(root);
        
        let arc = d3.arc()
            .startAngle(function(d){return d.x0})
            .endAngle(function(d){return d.x1})
            .innerRadius(function(d){return d.y0})
            .outerRadius(function(d){return (d.y1)});
        
        console.log(sunburst.selectAll("g"));
        
        let sunburstGroup = sunburst.selectAll("g")
            .data(root.descendants())
            .enter().append("g").attr("class", "node").append("path")
            .attr("display", function (d) {return d.depth ? null : "none"})
            .attr("d", arc)
            .style("stroke", "white")
            .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); });
        
        let toolTip = d3.select(".holder-tip");         

        // MouseOver event
        sunburstGroup.on("mouseover", function(d, i) {
            toolTip.style("display", "block")
            toolTip.html(`<strong>${i["parent"]["data"]["name"]}: ${i["data"]["name"]}</strong>`)
            .style("left", d.screenX + "px")
            .style("top", d.screenY + "px"); 
            // console.log(d);
            // console.log(i);
            // console.log(i["data"]["name"]);
    
        })
            // Step 3: Add an onmouseout event to make the tooltip invisible
            .on("mouseout", function() {
            toolTip.style("display", "none");
        });

        console.log(sunburst.selectAll("g"));
        console.log(sunburst.selectAll(".node"));
        

        sunburst.selectAll(".node")
            .append("text")
            .attr("transform", function(d){
                return "translate(" + arc.centroid(d) + ")rotate(" + computeTextRotation(d) + ")"; 
            })
            .attr("dx", "0") // radius margin
            .attr("dy", "0") // rotation align
            .attr("text-anchor", "middle")
            .text(function(d) { return d.parent ? d.data.name : "" });

    }

    function computeTextRotation(d){
        let angle = (d.x0 + d.x1) / Math.PI * 90;
        return (angle < 120 || angle > 270) ? angle : angle + 180; 
    }

    return (
        <div>
            <div className="container">
            <div className="row p-3">
                <div className='col'>
                    <h2 className="display-6 pt-3 pb-3">Movies by Genre - Sunburst</h2>
                    <p className="lead">Description</p>
                    <p>The following chart shows movies categorized by genre based on your year selection.</p>
                </div>
                <hr className='mt-4 mb-4'/>
                <div className="col">
                    <h1 className='text-center'>Movies by Genre based on Year</h1>
                    
                    <h5 class="menu-instructions">Select the year you want to explore</h5>

                    <div>
                    <select id="year-movie" className="form-select mb-5" 
                    onChange={(e) => {
                        setYear(e.target.value);
                      }}>
                    </select>   
                    </div>

                    <div id = "graph-section"></div>
                    <div class="holder-tip" style = {{display:"none"}} ></div>

                </div>
                
                {/* <div className="d-flex justify-content-center pt-4">
                        <Link to="/visualizations" className="btn btn-dark btn-lg m-2">Back to Visualizations</Link>
                </div> */}
            </div>
        </div>
        </div>
    )
}

export default One
