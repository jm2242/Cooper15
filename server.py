import os
from flask import Flask
import base64
import subprocess

app = Flask(__name__)

@app.route('/')
def hello():
	return '<i>Hello World!</i>'
@app.route('/translate', methods = ['GET', 'POST'])
def translate(imageData):
   	imageObj = base64.b64decode(imageData)
	imageObj.save('./image.jpg')
	subprocess.call("python process.py image.jpg")
	out_text = open('./output.txt', 'r')
	return out_text.readlines()

port = os.getenv('VCAP_APP_PORT', '5000')
if __name__ == "__main__":
	app.run(host='0.0.0.0', port=int(port))