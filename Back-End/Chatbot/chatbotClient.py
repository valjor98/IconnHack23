from flask import Flask, request, jsonify
from ibm_watson import AssistantV2
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
import json

app = Flask(__name__)

# Load env variables
with open('Back-End\Chatbot\config.json', 'r') as f:
    config = json.load(f)

api_key = config['WATSON_API_KEY']
url = config['WATSON_URL']
version = config['WATSON_VERSION']
assistant_id = config['WATSON_ASSISTANT_ID']

# Create Assistant service object.
authenticator = IAMAuthenticator(api_key)
assistant = AssistantV2(
    version=version,
    authenticator=authenticator
)
assistant.set_service_url(url)

# Create a new session
session = assistant.create_session(assistant_id=assistant_id).get_result()
session_id = session['session_id']

@app.route('/message', methods=['POST'])
def message():
    user_input = request.json['text']
    result = assistant.message(
        assistant_id=assistant_id,
        session_id=session_id,
        input={
            'message_type': 'text',
            'text': user_input
        }
    ).get_result()

    responses = []
    if 'output' in result and 'generic' in result['output']:
        for response in result['output']['generic']:
            if response['response_type'] == 'text':
                responses.append(response['text'])

    return jsonify({'responses': responses})

if __name__ == '__main__':
    app.run(debug=True)
