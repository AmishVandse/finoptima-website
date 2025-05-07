from flask import Flask, request, jsonify
from flask_cors import CORS
import boto3
import os
import json
import logging

from dotenv import load_dotenv
load_dotenv()
# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
# Allow requests from your React app
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}})

# Configure AWS Lambda client
lambda_client = boto3.client(
    'lambda',
    region_name='us-east-2',
    aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY')
)

LAMBDA_ARN = 'arn:aws:lambda:us-east-2:034362030940:function:routeFideoSignals'

@app.route('/api/ocr', methods=['POST'])
def invoke_lambda():
    try:
        # Determine if the request contains JSON or form data
        if request.content_type and 'application/json' in request.content_type:
            # Handle JSON request
            request_data = request.get_json()
            logger.info("Received JSON data")
        else:
            # Handle multipart form data with files
            files_data = []
            
            # Process uploaded files if any
            if 'files' in request.files:
                files = request.files.getlist('files')
                for file in files:
                    # Read file content and encode as base64 if needed
                    file_content = file.read()
                    files_data.append({
                        'filename': file.filename,
                        'content_type': file.content_type,
                        'size': len(file_content),
                        # You might need to encode file_content as base64 here
                        # depending on how your Lambda function processes files
                    })
            
            # Get metadata from form
            metadata_json = request.form.get('metadata', '{}')
            metadata = json.loads(metadata_json)
            
            # Construct the request data for Lambda
            request_data = {
                'files': files_data,
                'metadata': metadata
            }
            
            logger.info(f"Processed form data with {len(files_data)} files")

        # Log the data we're sending to Lambda
        logger.info(f"Sending to Lambda: {json.dumps(request_data, default=str)}")
        
        # Invoke the Lambda function
        response = lambda_client.invoke(
            FunctionName=LAMBDA_ARN,
            InvocationType='RequestResponse',
            Payload=json.dumps(request_data)
        )
        
        # Process Lambda response
        result = json.loads(response['Payload'].read())
        logger.info(f"Lambda response: {result}")
        
        # Check if Lambda returned an error
        if 'errorMessage' in result:
            return jsonify({'error': result['errorMessage']}), 500
            
        return jsonify(result), 200
        
    except Exception as e:
        logger.error(f"Error: {str(e)}", exc_info=True)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)