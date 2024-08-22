from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from sklearn.ensemble import RandomForestClassifier

app = Flask(__name__)
CORS(app)

# Simulating a pre-trained model (you would load a real model in practice)
model = RandomForestClassifier()
model.fit(np.array([[1, 2], [3, 4], [5, 6]]), [0, 1, 1])  # Dummy training data

@app.route('/api/interactions', methods=['POST'])
def process_interactions():
    interaction_data = request.json
    print("Received data:", interaction_data)

    # Simulate feature extraction from interaction data
    features = np.random.rand(1, 2)  # Example: replace with real feature extraction
    
    # Predict using the ML model
    prediction = model.predict(features)[0]
    is_human = bool(prediction)  # 1 for human, 0 for bot (in this example)

    return jsonify({'isHuman': is_human})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
