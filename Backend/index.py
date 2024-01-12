from flask import Flask, render_template
from flask_socketio import SocketIO
from flask_cors import CORS
import requests

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='eventlet', websocket_path='/') 
CORS(app)  

@app.route('/')
def index():
    return "Hola mundo"

@socketio.on('message')
def handle_message(msg):
    print('Message:', msg)
    socketio.emit('message', msg)
    

if __name__ == '__main__':
    socketio.run(app, debug=True)
