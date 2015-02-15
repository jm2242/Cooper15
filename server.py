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
    print("entered translate function")

    fh = open("image.jpg", "wb")
    
    imageData = request.data[23:]
    print imageData
    fh.write(imageData.decode('base64'))
    fh.close()
    # imageObj.save('./image.jpg')

    print "image saved"
    p = subprocess.Popen("python ./process.py image.jpg output.txt", shell = True)
    p.wait()
    print "subprocess done"

    p = subprocess.Popen("Python ./execute.py", shell = True)
    p.wait()

    out_text = open('./output.txt', 'r')
    print out_text.readlines()
    return "Yeah!"

port = os.getenv('VCAP_APP_PORT', '5000')
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(port))