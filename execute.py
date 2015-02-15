import pyaudio,wave,sys,urllib

file = 'output.txt'

def play_sound(file):
	chunk=1024
	wf=wave.open(file,'rb')
	p=pyaudio.PyAudio()
	stream=p.open(format=p.get_format_from_width(wf.getsampwidth()),channels=wf.getnchannels(),rate=wf.getframerate(),output=True)
	data=wf.readframes(chunk)
	while data!='':
		stream.write(data)
		data=wf.readframes(chunk)
	stream.close()
	p.terminate()

message="Lamp post ahead of your turn left"
res=urllib.URLopener()
res.retrieve("http://ronaktexttospeechproxy.mybluemix.net/synthesize?download=true&text="+message,"transcript.wav")

play_sound("transcript.wav")