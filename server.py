import os
from flask import Flask
from flask import request
import base64
import subprocess
import logging
import sys
from pprint import pprint

app = Flask(__name__)
app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.DEBUG)


@app.route('/')
def hello():
	return '<i>Hello World!</i>'

@app.route('/translate', methods=['POST'])
def translate():
	print 'test'
	print request.method
	print request.data
	# print("entered translate function")
	# imageData = flask.request.data
 #   	imageObj = base64.b64decode(imageData)
	# imageObj.save('./image.jpg')
	# subprocess.call("python process.py image.jpg")
	# out_text = open('./output.txt', 'r')
	# return out_text.readlines()
	return 'It works'

port = os.getenv('VCAP_APP_PORT', '5000')
if __name__ == "__main__":
	app.run(host='0.0.0.0', port=int(port))