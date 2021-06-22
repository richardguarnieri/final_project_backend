import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as d3 from 'd3';


const Two = () => {

    const [genre, setGenre] = useState('');
    const [language, setLanguage] = useState('');

    const herokuBackend = 'https://itesm-project2-backend.herokuapp.com';

    let datac;
    useEffect(() => {
        const general = async () => {
            try {
                //const response = await fetch(`https://cors-anywhere.herokuapp.com/${herokuBackend}/filter/${genre}/${language}`);
                //const response = await fetch(`https://cors-anywhere.herokuapp.com/${herokuBackend}/all_movies`);
                const response = await fetch(`${herokuBackend}/all_movies`);
                const data = await response.json();
                //console.log(genre);
                //console.log(data);
                datac = data;
                init();
                //console.log(datac);
            } catch(err) {
                console.log(err);
            }
        }
        general();
    }, [genre, language]);
    //simulating UNIQUES
    let bedata = {"country":["US","UK"],
                "language":["English","Spanish"],
                "genre":["Drama","Crime"]};

    //Holding initial filters and also will hold further filters
    let filters = {"country":["USA"],"language":["English"],"genre":["Drama"],"top":""};
    let chartG;
    let dots;
    let dataG;
    let colorsG=[];
    let values={}

    let svgWidth = 	1140;
    let svgHeight = 600;
    


    function hold(i,id){
        //console.log(filters);
        if(inFilters(i,id)){
            
            d3.select("#"+id).style("background-color","#f6f6f6");
            let index = filters[i].indexOf(id);
            if (index > -1) {
            filters[i].splice(index, 1);
            }
        }else{
            filters[i].push(id);    
            d3.select("#"+id).style("background-color","#A6ACAF");
        }
        updateChart();
    }

    function init(){
        //console.log(datac);
        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }
        //getting unique countries
        let Uniques = {"country":[],"language":[],"genre":[]}

        getUniques("country","country_1"); //country_1 to country_5
        getUniques("language","lang_1"); //lang_1 to lang_5
        getUniques("genre","genre_1"); //genre_1 to genre_3
        function getUniques(value,search){
            Uniques[value] = Object.keys(datac).map(d => datac[d][search]);
            function onlyUnique(value, index, self) {
                if(value === null){
                    return false;
                }
                return self.indexOf(value) === index;
            }
            Uniques[value] = Uniques[value].filter(onlyUnique); 
        }

        let ids=['country','language','genre'];

        ids.forEach(function(id,i) {
            let items = Uniques[id];
            let group;

            let select = d3.select("#mydropdown"+(i+1))
                            .selectAll("a")
                            .data(items);
                           group = select.enter()
                            .append("a")
                            /*.attr("onclick", function(d) { console.log("setted"); 
                                                            return "hold('"+id+"','"+d+ "')"; })*/                 
                            .attr("id",function(d){
                                //console.log(d);
                                return d;})
                            .on("click", function(d) {
                                hold(id,d3.select(this).attr("id")); // my react method
                                
                            } )
                            .merge(select)
                            .text(function(d){
                                               return d;})
                        
                        select.exit().remove(); 
                        d3.select("#"+filters[id][0]).style("background-color","#A6ACAF"); 
                        if(id === ids[2]){
                          createChart();
                        }   
        });
        d3.select(window).on("resize", makeResponsive);
      }
      
    function myFunction(id) {
        let element = d3.select("#"+id);
        if(element.style("display")=="block"){
            element.style("display","none"); 
        }
        else{
            element.style("display","block");
        }
    }
    
    function filterFunction(id) {
        let input, filter, ul, li, a, i,div,txtValue;
        input = document.getElementById("myInput"+id);
        filter = input.value.toUpperCase();
        div = document.getElementById("mydropdown"+id);
        a = div.getElementsByTagName("a");
        for (i = 0; i < a.length; i++) {
            txtValue = a[i].textContent || a[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
            } else {
            a[i].style.display = "none";
            }
        }
    }
    function inFilters(i,id){
     return filters[i].includes(id);
    }

    function createChart(){
        //console.log(datac);
        let svgArea = d3.select("body").select("svg");
        if (!svgArea.empty()) {
          svgArea.remove();
        }
    
        let margin = {
            top: 100,
            bottom: 50,
            right: 70,
            left: 70
          };
        
          let height = svgHeight - margin.top - margin.bottom;
          let width = svgWidth - margin.left - margin.right;
        
          // Append SVG element
          let svg = d3
            .select("#chart")
            .append("svg")
            .attr("height", svgHeight)
            .attr("width", svgWidth)
            .attr("preserveAspectRatio","xMidYMin");
        
          // Append group element
          
          let chartGroup = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);
          chartG = chartGroup;

        //this should be exactly as movies in d3csv
        let Movies = Object.keys(datac).map(d => datac[d]);
        //console.log("printing movies");
        //console.log(Movies);

        
      //d3.csv("imdb_movies_global.csv").then(function(Movies) {
        
        Movies = Movies.filter(function(d){
          return filters["country"].includes(d.country_1)&&
          filters["language"].includes(d.lang_1)&&
          filters["genre"].includes(d.genre_1);
          
        })    
        Movies.sort(function(a, b){return b.avg_vote_f-a.avg_vote_f});
        Movies = Movies.slice(0,21);
        Movies.sort(function(a, b){return b.duration-a.duration});
        // parse data
        colorsG = [];
        Movies.forEach(function(data) {
            data.avg_vote_f = +data.avg_vote_f;
            data.year_mv = +data.year_mv;
            data.duration = +data.duration;
            colorsG.push("#"+Math.floor(Math.random()*16777215).toString(16));
            
        });
        dataG = Movies;
    
        // create scales
          let extent = d3.extent(Movies, d => d.year_mv);
          extent[0] = extent[0]-5; 
          //console.log("x: "+extent);
          let xLinearScale = d3.scaleLinear()
          .domain(extent)
          .range([0, width])
    
          extent = d3.extent(Movies, d => d.avg_vote_f);
          extent[0] = extent[0]-(extent[1]-extent[0])/10; 
          //console.log("y: "+extent);
          let yLinearScale = d3.scaleLinear()
          .domain(extent)
          .range([height, 0]);
    
        // create axes
        let xAxis = d3.axisBottom(xLinearScale).tickFormat(x => `${x.toString()}`);
        let yAxis = d3.axisLeft(yLinearScale);
    
    
        // append axes
        values["xAxis"] = chartGroup.append("g")
          .attr("transform", `translate(0, ${height})`)
          .call(xAxis);
    
          values["yAxis"] = chartGroup.append("g")
          .call(yAxis);
    
        // append circles
        let circlesGroup = chartGroup.selectAll("circle")
          .data(Movies)
          .enter()
          .append("circle")
          .attr("cx", d => xLinearScale(d.year_mv))
          .attr("cy", d => yLinearScale(d.avg_vote_f))
          .attr("r", d => d.duration/1.7)
          .attr("fill",(d,i) => colorsG[i])
          .attr("opacity",".30");
     
    
        // Step 1: Append tooltip div
        let toolTip = d3.select(".holder");
        //toolTip.style("display", "none");
    
        // Step 2: Create "mouseover" event listener to display tooltip
        circlesGroup.on("mouseover", function(event,d, i) {
          toolTip.style("display", "block");
          toolTip.html(`Movie: <strong>${d.title}</strong><br>
          Duration: <strong>${d.duration}</strong><br>
          Year: <strong>${d.year_mv}</strong><br>
          Rating: <strong>${d.avg_vote_f}</strong><br>`)
          //.style("left",  d3.event.pageX + "px")
          //.style("top",  d3.event.pageY + "px")
          .style("left",  event.pageX + "px")
          .style("top",  event.pageY + "px")
            .style("font-size", "18px");
        })
        // Step 3: Create "mouseout" event listener to hide tooltip
        .on("mouseout", function() {
          toolTip.style("display", "none");
        });
        dots = circlesGroup;
       
        chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`).append("text")
        .attr("x", 0)
        .attr("y", 30)
        .attr("value", "hair_length") // value to grab for event listener
        .classed("activez", true)
        .text("Year of Release");
    
    
        chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left-5)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .classed("activez", true)
        .text("Average Rating");
    
    
      /*}).catch(function(error) {
        console.log(error);
      });*/
    }

    function updateChart(){
       
         let margin = {
            top: 100,
            bottom: 50,
            right: 70,
            left: 70
          };
         
           let height = svgHeight - margin.top - margin.bottom;
           let width = svgWidth - margin.left - margin.right;

         //d3.csv("imdb_movies_global.csv").then(function(Movies) {
        let Movies = Object.keys(datac).map(d => datac[d]);
        Movies.sort(function(a, b){return b.avg_vote_f-a.avg_vote_f});
           Movies = Movies.filter(function(d){
             return filters["country"].includes(d.country_1)&&
             filters["language"].includes(d.lang_1)&&
             filters["genre"].includes(d.genre_1);
             
           }).slice(0,21);
           // parse data
           colorsG = [];
           Movies.forEach(function(data) {
               data.avg_vote_f = +data.avg_vote_f;
               data.year_mv = +data.year_mv;
               data.duration = +data.duration;
               colorsG.push("#"+Math.floor(Math.random()*16777215).toString(16));
           });
           Movies.sort(function(a, b){return b.duration-a.duration});
           dataG = Movies;
           //console.log(Movies);
             let extent = d3.extent(Movies, d => d.year_mv);
             extent[0] = extent[0]-5;
             
             //console.log("x: "+extent); 
             let xLinearScale = d3.scaleLinear()
             .domain(extent)
             .range([0, width]);
       
             extent = d3.extent(Movies, d => d.avg_vote_f);
             extent[0] = extent[0]-(extent[1]-extent[0])/10; 
             //console.log("y: "+extent);
             let yLinearScale = d3.scaleLinear()
             .domain(extent)
             .range([height, 0]);
       
           // create axes
           let xAxis = d3.axisBottom(xLinearScale).tickFormat(x => `${x.toString()}`);
           let yAxis = d3.axisLeft(yLinearScale);
       
             values["xAxis"].transition()
             .duration(500)
             .call(xAxis);
       
             values["yAxis"].transition()
             .duration(500)
             .call(yAxis);
           //console.log(Movies);
           chartG.selectAll("circle")
             .data(Movies)
             .enter()
             .append("circle")
             
           dots
           .data(Movies)
           .exit()
           .remove();
       
           dots = chartG.selectAll("circle").data(Movies);
       
           dots
           .transition()
           .duration(500)
           .attr("cx", function(d){
             return xLinearScale(d.year_mv);
           })
           .attr("cy", d => yLinearScale(d.avg_vote_f))
           .attr("r", d => d.duration/1.7)
           .attr("fill",(d,i) => colorsG[i])
           .attr("opacity",".30");
             
           // Step 1: Append tooltip div
           let toolTip = d3.select(".holder");
           //toolTip.style("display", "none");
       
           // Step 2: Create "mouseover" event listener to display tooltip
           dots.on("mouseover", function(event,d, i) {
             toolTip.style("display", "block");
             toolTip.html(`Movie: <strong>${d.title}</strong><br>
             Duration: <strong>${d.duration}</strong><br>
             Year: <strong>${d.year_mv}</strong><br>
             Rating: <strong>${d.avg_vote_f}</strong><br>`)
             //.style("left",  d3.event.pageX + "px")
             //.style("top",  d3.event.pageY + "px")
             .style("left",  event.pageX + "px")
             .style("top",  event.pageY + "px")
               .style("font-size", "18px");
           })
           // Step 3: Create "mouseout" event listener to hide tooltip
           .on("mouseout", function() {
             toolTip.style("display", "none");
           });
       
           
       }

    function makeResponsive() {
  
        let svgArea = d3.select("body").select("svg");
        if (!svgArea.empty()) {
          svgArea.remove();
        }

        let margin = {
            top: 100,
            bottom: 50,
            right: 70,
            left: 70
          };
        
          let height = svgHeight - margin.top - margin.bottom;
          let width = svgWidth - margin.left - margin.right;
        
          // Append SVG element
          let svg = d3
            .select("#chart")
            .append("svg")
            .attr("height", svgHeight)
            .attr("width", svgWidth);
        
          // Append group element
          let Movies = dataG;
          let chartGroup = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);
            chartG = chartGroup;
      
            let extent = d3.extent(Movies, d => d.year_mv);
            extent[0] = extent[0]-5; 
            let xLinearScale = d3.scaleLinear()
            .domain(extent)
            .range([0, width]);
      
            extent = d3.extent(Movies, d => d.avg_vote_f);
            extent[0] = extent[0]-(extent[1]-extent[0])/10; 
            let yLinearScale = d3.scaleLinear()
            .domain(extent)
            .range([height, 0]);
      
          // create axes
          let xAxis = d3.axisBottom(xLinearScale).tickFormat(x => `${x.toString()}`);
          let yAxis = d3.axisLeft(yLinearScale);
      
          // append axes
          values["xAxis"] = chartGroup.append("g")
          .attr("transform", `translate(0, ${height})`)
          .call(xAxis);
      
          values["yAxis"] = chartGroup.append("g")
          .call(yAxis);
            
          let circlesGroup = chartGroup.selectAll("circle")
            .data(Movies)
            .enter()
            .append("circle")
            .attr("cx", d => xLinearScale(d.year_mv))
            .attr("cy", d => yLinearScale(d.avg_vote_f))
            .attr("r", d => d.duration/1.7)
            .attr("fill",(d,i) => colorsG[i])
            .attr("opacity",".30");
    
          let toolTip = d3.select(".holder");
      
          // Step 2: Create "mouseover" event listener to display tooltip
          circlesGroup.on("mouseover", function(event,d, i) {
            toolTip.style("display", "block");
            toolTip.html(`Movie: <strong>${d.title}</strong><br>
            Duration: <strong>${d.duration}</strong><br>
            Year: <strong>${d.year_mv}</strong><br>
            Rating: <strong>${d.avg_vote_f}</strong><br>`)
            .style("left",  event.pageX + "px")
            .style("top",  event.pageY + "px")
              .style("font-size", "18px");
          })
      
          .on("mouseout", function() {
            toolTip.style("display", "none");
          });


          chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`).append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "hair_length") // value to grab for event listener
        .classed("activez", true)
        .text("Year of realease");
    
    
        chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left-5)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .classed("activez", true)
        .text("Average rating");
          dots = circlesGroup;
      
      }





    return (
        <div>
            <div className="container">
                <div className="row p-3">
                    <div className='col'>
                        <h2 className="display-6 pt-3 pb-3">Movies by Country, Language and Genre</h2>
                        <p className="lead">Description</p>
                        <p>Select the contry, language and genre of your choice, based on that we will show you the 20 best rated movies, and graphically display their duration, rating, and year of release!</p>
                    </div>
                    <hr className='mt-4 mb-4'/>
                    <div className="col">
                        <h1 className='text-center pb-4'>A unique color, for a unique movie</h1>
                    </div>
                </div>
                <div className="row pb-5">
                    <div className="col-md-4">
                        <div className="dropdown">
                            <button onClick={() => myFunction('mydropdown1')} className="dropbtn" style={{"text-align": "center"}}>Country</button>
                            <div id="mydropdown1" className="dropdownz-content" style={{height: "200px", overflow: "auto"}}>
                                <input type="text" placeholder="Search.." id="myInput1" onKeyUp={() => filterFunction(1)}/>                               
                            </div>
                        </div>

                    </div>
                    <div className="col-md-4">
                        <div className="dropdown" style={{"text-align": "center"}}>
                            <button onClick={() => myFunction('mydropdown2')} className="dropbtn">Language</button>
                            <div id="mydropdown2" className="dropdownz-content" style={{height: "200px", overflow: "auto"}}>
                            <input type="text" placeholder="Search.." id="myInput2" onKeyUp={() => filterFunction(2)}/>                               
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="dropdown" style={{"text-align": "center"}}>
                            <button onClick={() => myFunction('mydropdown3')} className="dropbtn">Genre</button>
                            <div id="mydropdown3" className="dropdownz-content" style={{height: "200px", overflow: "auto"}}>
                            <input type="text" placeholder="Search.." id="myInput3" onKeyUp={() =>filterFunction(3)}/>                               
                            </div>
                        </div>
                    </div>   
                </div>
                <div class="row">
                    <div class="col">
                        <div id="chart" style={{"text-align": "center"}}></div>
                    </div>
                </div>

                <div class="holder" style={{display: "none"}}></div>
               
                {/* <div className="d-flex justify-content-center pt-4">
                            <Link to="/visualizations" className="btn btn-dark btn-lg m-2">Back to Visualizations</Link>
                    </div>
                     */}

            </div>
        </div>
    )
}

export default Two
