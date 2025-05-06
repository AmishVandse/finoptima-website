from flask import Flask, request, jsonify
from flask_cors import CORS
import boto3
import os
import json

app = Flask(__name__)
CORS(app)  


lambda_client = boto3.client(
    'lambda',
    region_name='us-east-2',
    aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY')
)

LAMBDA_ARN = 'arn:aws:lambda:us-east-2:034362030940:function:routeFideoSignals'

@app.route('/api/ocr', methods=['POST'])
def invoke_lambda():
    data = request.get_json()
    # You may want to validate/sanitize data here

    try:
        response = lambda_client.invoke(
            FunctionName=LAMBDA_ARN,
            InvocationType='RequestResponse',
            Payload=json.dumps(data)
        )
        result = response['Payload'].read()
        return jsonify(json.loads(result)), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 