import datetime
from chatterbot import ChatBot

class Bot:

    def __init__(self, session):
        self.session = session
        self.chatbot = ChatBot(session)
        self.training()
        print session, " Initialized!"

    def training(self):
        # Train based on the english corpus
        print "Training . . ."
        self.chatbot.train("chatterbot.corpus.english")
        self.chatbot.train("chatterbot.corpus.italian")


    def getSession(self):
        print self.session
        return self.session

    # def getCreateDate():
    #     return self.createDate

    def getResponse(self, msg):
        response = self.chatbot.get_response(msg)
        return response
