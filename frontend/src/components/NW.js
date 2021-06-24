
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as d3 from 'd3';
import * as tf from '@tensorflow/tfjs';
import modelI from '../tfjsmodel/model.json';
//const tfn = require("@tensorflow/tfjs-node");

const modelJson = require('../tfjsmodel/model.json');
const modelWeights = require('../tfjsmodel/group1-shard1of1.bin');






const NW = () => {

    const [genre, setGenre] = useState('');
    const [language, setLanguage] = useState('');

    const herokuBackend = 'https://itesm-project2-backend.herokuapp.com';

    let datac;
    useEffect(() => {
        const general = async () => {
            try {
/*                const response = await fetch(`${herokuBackend}/all_movies`);
                const data = await response.json()
                datac = data;
                init();*/
                chargeData();
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
      d3.csv("inputs.csv").then(function(Inputs){
        let mapp = Inputs.map(d => d[0]);
        let count = 1;
        ids.forEach(function(id,i){
          let items = mapp.filter(function(d){ return d.substring(0,id.length) == id; }).map(d => d.substring(id.length+1));
          let select = d3.select("#myDropdown"+(i+1))
                          .selectAll("a")
                          .data(items);
                          
                          let group = select.enter()
                          .append("a")
                          .attr("onclick", function(d) {
                              count++; 
                              indexes[d.replace(/\s/g, '')] = count;
                              return "hold('"+id+"','"+d.replace(/\s/g, '')+"')"; })
                          .attr("id",function(d){return d.replace(/\s/g, '');})
                          .merge(select)
                          .text(function(d){
                                             return d;})
          console.log(items);
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
          console.log("No more");
          return;
        }
        filters[i].push(id);   
        d3.select("#"+id).style("background-color",colorWeighted(filters[i].length));
      }
    }

    async function init(){
      
      /*const url = {
        model: 'https://00f74ba44b219bc8969ee28a3c08e0f49551fa18a8-apidata.googleusercontent.com/download/storage/v1/b/artifacts.speedy-triode-302818.appspot.com/o/model.json?jk=AFshE3WKd-PhCHabrHhagYbn2huIaTal97_8A0o4BUmud4YBVTyeyFyFyAGpRXZd_W-D61PMcDPGZKxTgG9U7nufuoVRL4ju7WJ0baStWfrYXGf9NuYNT1ymE0nrH8Id52szPX0ELIMLQIjmv5oelRTidyQXog-f1MsJPa2c7zBh6helk7oLVpJd2XrzfEWqt6coflqX8BtmVa9qBkBakH4huphXT71XunV7Y5HzPVR2Mul8WddC7SiRKYKElj7Qkcr_JqRDBbVQGLAS2CDZKVv8CNyzTdmpJWNyLb2zbe3icdCxsYumnzdInHSnPp8-WmMZNWnW-eJTXqNMNikdd22wI5iLIZqBSuoJLDZfq8pLqZLNvP9_QgqDN47jHgpRexLaHqPCuS7v9z1F2CwW70oyBHwYEDACV5kSht-PzlALe9r6AnnxsexSQQDdQNK0Nm9yMddjVXFJWqtrBHneAEHmtQiSqK5ZGJOWD9QcY_SWG_d3pU15nMPspy1Ujnh24kW_d_07O3Ui5xoYqNPZPlEplTjo2iMvbz6I_JfhebKsJMZET-DftadsXLuwTjujjn-DN2JsM6VX_5gKQOECKSCW3GDY6bDDdtzaf_8hnMAHu9SDPbnzjn2sFRA2TD5j79i5nav4LNxffrDAa7VDWqJMN8fTWJZt6_7cqxsgvHepdKMVks0eXVMbTEGeXwO60OXdA2kou_Yyuq3AthlVD6Jh0QH2GfDwR7ysDIfB-Ogo6CU3DJcDa4xuDvYLPbsnGGsSBsDwHe0OCQYstwLIrALLZPsDszdwWQm80lae2eKavjC-S4qovb0ZtwesRMVUj_rfvTJOoQeP1xvxTpmuy8-j2HPHJFqqzDRkZnMs70o143oU7ESJm_rgOTfurRpLaAeK2ttnqX9XvuDkXHsNp71zJx3wgbl3q6G-7rIE8EDVHzHmEpX5jAqzJyiNH1uMYZ7qNfjT_tixvd-BJRtymeUfpjAWp7sVOp5vMSoS&isca=1',
        //metadata: 'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json'
        };
        async function loadModel(url) {
        try {
        const model = await tf.loadLayersModel(url.model);
        setModel(model);} 
        catch (err) {
        console.log(err);
        }}
        //React Hook
        const [model, setModel] = useState();
        useEffect(()=>{
        tf.ready().then(()=>{
        loadModel(url)
        });
        },[])

        const predictOut = model.predict(input);
        const score = predictOut.dataSync()[0];
        predictOut.dispose();
        setScore(score)
        return score;*/




//      const model = await tf.loadLayersModel('http://127.0.0.1:3000/model.json');
      //const model = await tf.loadLayersModel(fetch('http://127.0.0.1:3000/model.json'),{mode:'cors'});
      
      //console.log(model);

      //const model = await tf.loadLayersModel('http://localhost:3000/model.json');

     /* const tf = require('@tensorflow/tfjs');
      const tfnode = require('@tensorflow/tfjs-node');

      async function loadModel(){
          const handler = tfnode.io.fileSystem('tfjs_model/model.json');
          const model = await tf.loadLayersModel(handler);
          console.log("Model loaded")
      }


      loadModel();*/


      //const model = await tf.loadGraphModel('http://localhost:3000/model.json');

      /*const modelJson = require('./model.json');
      const modelWeights = require('./group1-shard1of1.bin');
      async function bundleResourceIOExample() {
        const model =
          await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights));
          console.log(model);
      }
      let model=0;*/

      //const handler = tfn.io.fileSystem(modelI);
      //const model = await tf.loadLayersModel(handler);
      //const model = await tf.loadLayersModel('https://tfjsmodel1212121212.b-cdn.net/model.json');
      
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
    
      console.log(result.dataSync()[0]);
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
      console.log(inputs[0])
      if(isNaN(duration)){
        d3.select("#prediction").text("Not a valid duration");
        return;
      } 
      inputs[1] = (duration - 40) / (3360 - 40)
      console.log(inputs[1])
    
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
                    <button onClick={() => myFunction('mydropdown1')} className="dropbtn">Genre</button>
                    <div id="myDropdown1" className="dropdownz-content" style={{height: "200px", overflow: "auto"}}>
                      <input type="text" placeholder="Search.." id="myInput1" onKeyUp={() => filterFunction(1)}></input>
                    </div>
                  </div>

                  <p>Select up to 5 countries</p>
                  <div className="dropdown">
                    <button onClick={() => myFunction('mydropdown2')} className="dropbtn">Country</button>
                    <div id="myDropdown2" className="dropdownz-content" style={{height: "200px", overflow: "auto"}}>
                      <input type="text" placeholder="Search.." id="myInput2" onKeyUp={() => filterFunction(2)}></input>
                    </div>
                  </div>

                  <p>Select up to 5 languages</p>
                  <div className="dropdown">
                    <button onClick={() => myFunction('mydropdown3')} className="dropbtn">Language</button>
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
