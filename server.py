import os
from flask import Flask
from flask import request
import base64
import subprocess
import logging
import sys
from pprint import pprint
import random

app = Flask(__name__)
app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.DEBUG)


@app.route('/')
def hello():
    return '<i>Hello World!</i>'

@app.route('/translate', methods=['GET','POST'])
def translate():
    print("entered translate function")

    unique = 'unique-%f' % random.random()

    fh = open(unique + '.jpg', "wb")
    imageData = request.data[23:]
    # print imageData
    fh.write(imageData.decode('base64'))
    fh.close()

    print "image saved"
    p = subprocess.Popen("python ./process.py "+unique+".jpg "+unique+".txt", shell = True)
    p.wait()
    print "process done"

    p = subprocess.Popen("python ./execute.py "+unique, shell = True)
    p.wait()
    print 'execute done'
    return '{"success":"'+unique+'.wav"}'

# @app.route('/pwrite', methods=['GET','POST'])
# def pwrite():
#     fh = open("output.txt", "wb");
#     text = request.data;
#     print(text);
#     fh.write(text);
#     fh.close()

#     p = subprocess.Popen("python ./execute.py", shell = True)
#     p.wait()

#     out_text = open('./output.txt', 'r')
#     print out_text.readlines()
#     return '{"success":true}'

port = os.getenv('VCAP_APP_PORT', '5000')
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(port))
