import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as d3 from 'd3';

const Data = () => {

    const herokuBackend = 'https://itesm-project2-backend.herokuapp.com'

    const [genre, setGenre] = useState('');
    const [language, setLanguage] = useState('');

    const tbody = d3.select("tbody");

    const filterData = async () => {
        try {
            const response = await fetch(`${herokuBackend}/all_movies`);
            const data = await response.json();
            deleteTable();
            console.log(data);
            let filteredArray = Object.values(data).map(d => d)
            filteredArray.forEach(entry => {
                entry.genre_1 = entry.genre_1 ? entry.genre_1 : 'None'
                entry.lang_1 = entry.lang_1 ? entry.lang_1 : 'None'
                return entry
            });
            filteredArray = filteredArray.filter(
                entry => ((entry.genre_1.toLowerCase() === genre.toLowerCase()) && (entry.lang_1.toLowerCase() === language.toLowerCase()))
            );
            filteredArray = filteredArray.sort((a, b) => b.avg_vote_f - a.avg_vote_f)
            filteredArray.forEach(d => {
                let newRow = tbody.append('tr')
                    newRow.append('td').text(d.title)
                    newRow.append('td').text(d.year_mv)
                    newRow.append('td').text(d.genre_1)
                    newRow.append('td').text(d.lang_1)
                    newRow.append('td').text(d.country_1)
                    newRow.append('td').text(d.duration)
                    newRow.append('td').text(d.avg_vote_f)
        })
        } catch(err) {
            console.log(err);
        }
    }


    function deleteTable(){
        tbody.selectAll("tr").remove().selectAll("td").remove();
 }
    
    return (
        <div>
            <div class="container">
            <div class="row pt-5">
                <div class="col">
                    <h4 class="pb-3 mb-0">Search for Movies</h4>
                    <p class="lead">Please ensure to fill in both selections</p>
                    <form action="" onSubmit="return false;">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="genre" placeholder="Romance" onChange={(e) => {setGenre(e.target.value)}} />
                            <label for="genre">Romance, Drama, Crime, Fantasy, Comedy, Biography...</label>
                        </div>
                        <div class="form-floating mt-3">
                            <input type="text" class="form-control" id="language" placeholder="English" onChange={(e) => {setLanguage(e.target.value)}}/>
                            <label for="language">English, Spanish, Italian, French, German...</label>
                        </div>
                        <button type='button' onClick={filterData} class="btn btn-dark mt-3">Find Movies</button>
                    </form>
                </div>
            </div>

                <div class="row py-5">
                    <div class="col">
                        <table class="table table-hover">
                            <thead class="table-light">
                                <tr>
                                    <td>Movie Title</td>
                                    <td>Year</td>
                                    <td>Genre</td>
                                    <td>Language</td>
                                    <td>Country</td>
                                    <td>Duration</td>
                                    <td>Rating</td>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Data
