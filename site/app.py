from flask import Flask, jsonify
from flask_restful import Resource, Api
from content_parser import getTextContent, getSummary, getDetails

app = Flask(__name__)
api = Api(app)


class getInfo(Resource):
    def get(self, encoded_url):
        extract = dict()
        extract["url"] = encoded_url
        print("url:", encoded_url)

        text = getTextContent(encoded_url)
        extract["text"] = text
        print("text: " + text)

        summary = getSummary(text)
        extract["summary"] = summary
        print("summary: " + summary)

        (deployer, developer, harmed) = getDetails(summary)
        extract["deployer"] = deployer
        print("deployer: " + deployer)

        extract["developer"] = developer
        print("developer: " + developer)

        extract["harmed"] = harmed
        print("harmed: " + harmed)
        

        return jsonify(extract)

api.add_resource(getInfo, '/getInfo/<path:encoded_url>')

if __name__ == '__main__':
    app.run()
