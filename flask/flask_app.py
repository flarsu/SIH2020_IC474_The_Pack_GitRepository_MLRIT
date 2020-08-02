from flask import Flask,request,render_template,jsonify
from flask_restful import Resource, Api
import requests
from pos_tag import *
from flask_cors import CORS
# Creating app instance
app = Flask(__name__)
CORS(app)
app.config['DEBUG'] = True
app.config['JSON_SORT_KEYS'] = False

# Creating api instance
api = Api(app)

class pos_tag(Resource):
    
    def get(self):
        return jsonify({'message': 'Make post request for results'})
    
    def post(self):
        text = request.get_json()['text']
        return pos_obj.result(text)


api.add_resource(pos_tag,'/get_pos')
