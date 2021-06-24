# Import Dependencies
from flask import Flask, jsonify, request
from sqlalchemy import create_engine
import pandas as pd
from flask_cors import CORS
import psycopg2


rds_connection_string = (f'postgres:proj2-team4@database-movies.cd8c7znzvm29.us-east-2.rds.amazonaws.com:5432/postgres')
engine = create_engine(f'postgresql://{rds_connection_string}')
conn = engine.connect()

data = pd.read_sql_query('SELECT * FROM imdb_movies_global', conn)
data_yr = pd.read_sql_query('SELECT DISTINCT year_mv FROM imdb_movies_global ORDER BY year_mv', conn)
data_gen = pd.read_sql_query('SELECT DISTINCT genre_1 FROM imdb_movies_global ORDER BY genre_1', conn)
data_lan = pd.read_sql_query('SELECT DISTINCT lang_1 FROM imdb_movies_global ORDER BY lang_1', conn)
movies_data = data.set_index('imdb_title_id').T.to_dict('dict')

#STARTING FLAST SERVER
app = Flask(__name__)
CORS(app)

#DEFINING HOME PAGE
@app.route('/')
def home():
    return "Home Page"

#RETURNING ALL MOVIE_DATA IN JASON FORMAT
@app.route('/all_movies')
def all_movies():
    return jsonify(movies_data)

#RETURNING SPECIFIC MOVIE RECORD BASED ON TITLE
@app.route('/movie/<title>')
def id(title):
    titleDF = data.loc[data['title'] == title.capitalize()]
    titleDic = titleDF.set_index('imdb_title_id').T.to_dict('dict')
    try:
        return jsonify(titleDic)
    except:
        return "Movie not available"

#RETURNING ALL MOVIE RECORDS
@app.route('/all_titles')
def all_titles():
    titleDic = data['title'].to_dict()
    try:
        return jsonify(titleDic)
    except:
        return "Movie not available"

#RETURNING ONLY A SPECIFIC YEAR
@app.route('/year/<year>')
def year(year):
    yearDF = data.loc[data['year_mv'] == str(year)]
    yearDic = yearDF.set_index('imdb_title_id').T.to_dict('dict')
    try:
        return jsonify(yearDic)
    except:
        return "Year not found"

#RETURNING ALL YEARS IN DATABASE
@app.route('/all_years')
def all_years():
    title_yr = data_yr['year_mv'].to_dict()
    try:
        return jsonify(title_yr)
    except:
        return "Year not found"
    
#RETURNING RECORDS PER GENRE AND LANGUAGE
@app.route('/filter/<genre>/<language>')
def filter(genre=None, language=None):
    filterDF = data.loc[(data['genre_1'] == genre.capitalize()) & (data['lang_1'] == language.capitalize())]
    filterDic = filterDF.set_index('imdb_title_id').T.to_dict('dict')
    try:
        return jsonify(filterDic)
    except:
        return "Record not found"

#RETURNING ALL GENRES IN DATABASE
@app.route('/genres')
def genres():
    genre = data_gen['genre_1'].to_dict()
    try:
        return jsonify(genre)
    except:
        return "Genres not found"

#RETURNING ALL LANGUAGES IN DATABASE
@app.route('/language')
def language():
    lang = data_lan['lang_1'].to_dict()
    try:
        return jsonify(lang)
    except:
        return "Language not found"
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)