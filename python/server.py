from flask import Flask, jsonify, request
from bot import *

botList = []


app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/create/<session>')
def create(session):
    # global botList
    bot = Bot(session)
    print "Initial finished"
    botList.append(bot)
    print botList
    return "Done"

@app.route('/chat')
def msg():
    msg = request.args.get('msg')
    session = request.args.get('session')
    for bot in botList:
        if bot.getSession() == session:
            return bot.getResponse(msg)
    return "SessionNotFound"

@app.route('/getBotList')
def getList():
    sessionList = []
    for bot in botList:
        sessionList.append(bot.getSession())
    return ','.join(sessionList)



if __name__ == '__main__':
    app.run(host='0.0.0.0')
