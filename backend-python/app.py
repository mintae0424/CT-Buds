from flask import Flask, jsonify
import nltk
from nltk import word_tokenize, pos_tag, ne_chunk
from nltk import RegexpParser
from nltk import Tree
import requests
from flask_cors import CORS


nltk.data.path.append("/tmp")
nltk.download("popular", download_dir = "/tmp")


def get_continuous_chunks(text, chunk_func):
    chunked = chunk_func(pos_tag(word_tokenize(text)))
    continuous_chunk = []
    current_chunk = []

    for subtree in chunked:
        if type(subtree) == Tree:
            current_chunk.append(" ".join([token for token, pos in subtree.leaves()]))
        elif current_chunk:
            named_entity = " ".join(current_chunk)
            if named_entity not in continuous_chunk:
                continuous_chunk.append(named_entity)
                current_chunk = []
        else:
            continue

    if current_chunk:
        named_entity = " ".join(current_chunk)
        if named_entity not in continuous_chunk:
            continuous_chunk.append(named_entity)
            current_chunk = []

    return continuous_chunk


app = Flask(__name__)
CORS(app)


@app.route("/")
def hello():
    return "Hello World!"


@app.route("/calories/<string:descriptions>")
def calculate_calories(descriptions):
    NP = "NP: {(<V\w+>|<NN\w?>)}"
    chunker = RegexpParser(NP)
    items = get_continuous_chunks(descriptions.lower(), chunker.parse)
    # items = ''.join(nouns)

    API_KEY = 'FEjjqylAG6cqOjq8n2sO1y3njopvccXmVPwIJYGs'
    url = 'https://api.nal.usda.gov/fdc/v1/foods/search?'

    total = 0
    for item in items:
        r = requests.get(url+'api_key={}&query={}'.format(API_KEY, item))
        res = r.json()
        nutrients = res['foods'][0]['foodNutrients']
        for nutrient in nutrients:
            if nutrient['nutrientName'] == 'Energy':
                calorie = nutrient['value']
                break
        if item == 'spicy':
            calorie = 0
        if item == 'cream':
            calorie = calorie / 5
        if item == 'sauce contains bacon':
            calorie = 0
        if item == 'note':
            calorie = 0
        if item == 'rib':
            calorie = 0
        if 'cheese' in item:
            calorie = calorie / 5
        if 'seeds' in item:
            calorie = calorie / 15
        if 'quinoa' in item:
            calorie = calorie / 5
        if 'dressing' in item:
            calorie = calorie / 2
        if 'sourdough' in item:
            calorie = calorie / 8
        if 'lemon' in item:
            calorie = calorie / 10
        if 'crushed' in item:
            calorie = calorie / 2
        if 'butter' in item:
            calorie = calorie / 100
        if 'granola' in item:
            calorie = calorie / 10
        if 'fruit' in item:
            calorie = calorie / 10
        if 'honey' in item:
            calorie = calorie / 10
        if 'compote' in item:
            calorie = calorie / 5
        if 'mayo' in item:
            calorie = calorie / 2
        if 'fried egg' in item:
            calorie = calorie / 10
        if 'potato bun' in item:
            calorie = calorie / 4
        if 'sauce' in item:
            calorie = calorie / 2
        if 'rigatoni' in item:
            calorie = calorie / 2
        if 'pesto' in item:
            calorie = calorie / 2
        if 'breadcrumbs' in item:
            calorie = calorie / 10
        if 'flakes' in item:
            calorie = calorie / 10
        if 'bacon' in item:
            calorie = calorie / 5
        if 'pappardelle' in item:
            calorie = calorie / 2
        
        total += calorie
    return jsonify({
        'calories': total
    })