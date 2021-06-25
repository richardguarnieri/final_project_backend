
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as d3 from 'd3';
import * as tf from '@tensorflow/tfjs';
import modelI from '../tfjsmodel/model.json';
import inputss from './inputs.csv';
//const tfn = require("@tensorflow/tfjs-node");

const modelJson = require('../tfjsmodel/model.json');
const modelWeights = require('../tfjsmodel/group1-shard1of1.bin');

const url = {
  model: 'https://tfjsmodel1212121212.b-cdn.net/model.json',
  };


 




const NW = () => {

    const [genre, setGenre] = useState('');
    const [language, setLanguage] = useState('');

    const herokuBackend = 'http://3.17.42.22:5000';

    let datac;
    useEffect(() => {
        const general = async () => {
            try {
/*                const response = await fetch(`${herokuBackend}/all_movies`);
                const data = await response.json()
                datac = data;
                init();*/
                chargeData();
                console.log("charged");
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
    let filters = {"country":[],"lang":[],"genre":[],"top":""};
    let maxLenght = {"country":5,"lang":5,"genre":3}
    let inputs = [];
    let indexes = {};
    

    let ids=['genre','country','lang'];
    function chargeData(){
      d3.csv(inputss).then(function(Inputs){
        let mapp = Inputs.map(d => d[0]);
        let count = 1;
        ids.forEach(function(id,i){
          let items = mapp.filter(function(d){  return d.substring(0,id.length) == id; }).map(d => d.substring(id.length+1));
          let select = d3.select("#myDropdown"+(i+1))
                          .selectAll("a")
                          .data(items);
                          
                          let group = select.enter()
                          .append("a")
                          /*.attr("onclick", function(d) {
                              count++; 
                              indexes[d.replace(/\s/g, '')] = count;
                              return "hold('"+id+"','"+d.replace(/\s/g, '')+"')"; })*/
                          .attr("id",function(d){
                                count++; 
                                indexes[d.replace(/\s/g, '')] = count;
                                return d.replace(/\s/g, '');})
                          .on("click", function(d) {
                              hold(id,d3.select(this).attr("id")); // my react method
                              
                          } )
                          
                          .merge(select)
                          .text(function(d){
                                             return d;})
        });
        /*items = mapp.filter(function(d){ return d.substring(0,5) == "genre"; }).map(d => d.substring(6));
        console.log(items);*/
      }).catch(function(error) {
        console.log(error);
      })
    }
    function colorWeighted(w){
      switch(w){
        case 5:
          return "#CACFD2";
        case 4:
          return "#BDC3C7";
        case 3:
          return "#A6ACAF";
        case 2:
          return "#909497";
        case 1:
          return "#797D7F";
      }
    }

    function hold(i,id){
      if(inFilters(i,id)){
        d3.select("#"+id).style("background-color","#f6f6f6");
        let index = filters[i].indexOf(id);
        if (index > -1) {
          filters[i].splice(index, 1);
        }
        for(let j=0;j<filters[i].length;j++){
          d3.select("#"+filters[i][j]).style("background-color",colorWeighted(j+1));
        }
        
      }else{
        if(filters[i].length==maxLenght[i]){
          return;
        }
        filters[i].push(id);   
        d3.select("#"+id).style("background-color",colorWeighted(filters[i].length));
      }
    }

    async function init(){
      let url = {model:'https://tfjsmodel1212121212.b-cdn.net/model.json'}
      const model = await tf.loadLayersModel(url.model);
      let array = [];
      for(let i=0;i<484;i++){
        array.push(.01);
      }
      //const inputData = tf.tensor(array, [1, 484])
      const inputData = tf.tensor(inputs, [1, 484])
      const result = model.predict([inputData]);
      //result.dataSync()[0];
    
    // Display the winner
      let prediction = Math.round(result.dataSync()[0]*100)/100;
    
      if(prediction < 0){
        d3.select("#pt").text("This rating is probably not meaningful since it's below 0: ");
      }
      else if(prediction > 10){
        d3.select("#pt").text("This rating is probably not meaningful since it's above 10: ");
      }
      else{
        d3.select("#pt").text("The predicted rating for this movie is: ");
      }
      d3.select("#prediction").text(prediction);
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
        div = document.getElementById("myDropdown"+id);
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



    function predictions(){
      inputs = [];
      for(let i=0;i<484;i++){
        inputs.push(0);
      }
      
      let year = document.getElementById("year").value;
      let duration = document.getElementById("duration").value;
      /*console.log(year);
      console.log(duration);*/
      if(isNaN(year)){
        d3.select("#prediction").text("Not a valid year");
        return;
      } 
      inputs[0] = (year - 1894) / (2020 - 1894)
      if(isNaN(duration)){
        d3.select("#prediction").text("Not a valid duration");
        return;
      } 
      inputs[1] = (duration - 40) / (3360 - 40)
    
      ids.forEach(function(kind){
        filters[kind].forEach(function(el,i){
          inputs[indexes[el]] = (maxLenght[kind]-i)/(maxLenght[kind])
        });
      });
      init();
    }






    return (
        <div>
            <div className="container">
              <div className="row p-3">
                  <div className='col'>
                      <h2 className="display-6 pt-3 pb-3">Regressional neural network</h2>
                      <p className="lead">Description</p>
                      <p>Select up to three genres, and 5 countries and languages for a movie, with a possible year of realease and duration, get a rating prediction!
                        (Mean absolute error: 0.70 trained with over 74 thousand movies and tested on over 6 thousand)
                      </p>
                  </div>
                  <hr className='mt-4 mb-4'/>
              </div>



              <div className="row">
                <div className="col-md-3 text-center">

                  <div className="dropdown">
                    <p>Select up to 3 genres</p>
                    <button onClick={() => myFunction('myDropdown1')} className="dropbtn">Genre</button>
                    <div id="myDropdown1" className="dropdownz-content" style={{height: "200px", overflow: "auto"}}>
                      <input type="text" placeholder="Search.." id="myInput1" onKeyUp={() => filterFunction(1)}></input>
                    </div>
                  </div>

                  <p>Select up to 5 countries</p>
                  <div className="dropdown">
                    <button onClick={() => myFunction('myDropdown2')} className="dropbtn">Country</button>
                    <div id="myDropdown2" className="dropdownz-content" style={{height: "200px", overflow: "auto"}}>
                      <input type="text" placeholder="Search.." id="myInput2" onKeyUp={() => filterFunction(2)}></input>
                    </div>
                  </div>

                  <p>Select up to 5 languages</p>
                  <div className="dropdown">
                    <button onClick={() => myFunction('myDropdown3')} className="dropbtn">Language</button>
                    <div id="myDropdown3" className="dropdownz-content" style={{height: "200px", overflow: "auto"}}>
                      <input type="text" placeholder="Search.." id="myInput3" onKeyUp={() => filterFunction(3)}></input>
                    </div>
                  </div>

                  <p>Write a year (Between 1894 and 2020 for optimal performance)</p>
                  <input id="year" type="text"></input>

                  <p>Write a duration in minutes (Between 40 and 3360 for optimal performance)</p>
                  <input id="duration" type="text"></input>
                  
                </div>
                <div className="col text-center">
                  <button onClick={() => predictions()} className="dropbtn">Predict</button>
                  <h1 id='pt'>The predicted rating for this movie is:</h1>
                  <h2 id ="prediction">10</h2>
                </div> 

              </div>
              <script crossorigin src="https://tfjsmodel1212121212.b-cdn.net/model.json"></script>




              {/* <div className="d-flex justify-content-center pt-4">
                          <Link to="/visualizations" className="btn btn-dark btn-lg m-2">Back to Visualizations</Link>
                  </div>
                  */}

            </div>
        </div>
        
    )
}

export default NW
