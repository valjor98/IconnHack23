import os
import pandas as pd
import numpy as np
import json
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense

# Load the demand data
df_demand = pd.read_csv("Back-End/GasolineForecast/datasets/gas_demand.csv")
locations = [f'Location_{i}' for i in range(20)]

# Initialize the MinMaxScaler
scaler = MinMaxScaler(feature_range=(80, 150))

# Initialize predictions dictionary
all_demand_predictions = {}

# Time ranges for prediction (1 hour, 24 hours, 7 days)
time_ranges = [1, 24, 168]

for location in locations:
    print(f"Processing location: {location}")
    
    # Filter data for the current location
    location_data = df_demand[df_demand['Location'] == location]
    
    # Print some training data for debugging
    print("Sample training data:")
    print(location_data.head(10))  # Print the first 10 rows

    # Prepare data for LSTM model
    X, y = [], []
    for i in range(5, len(location_data) - 1):
        X.append(scaler.fit_transform(location_data['Demand'].values[i - 5:i].reshape(-1, 1)).flatten())
        y.append(scaler.fit_transform(location_data['Demand'].values[i + 1].reshape(-1, 1)).flatten())
    X, y = np.array(X), np.array(y)
    X = np.reshape(X, (X.shape[0], X.shape[1], 1))
    
    # Create and train LSTM model
    model = Sequential()
    model.add(LSTM(units=100, return_sequences=True, input_shape=(X.shape[1], 1)))
    model.add(LSTM(units=100))
    model.add(Dense(units=1))

    model.compile(optimizer='adam', loss='mean_squared_error')
    
    # Print model summary for debugging
    print("Model Summary:")
    model.summary()

    model.fit(X, y, epochs=10, batch_size=32)
    
    # Print loss value during training
    loss_value = model.evaluate(X, y, verbose=0)
    print(f"Loss value: {loss_value}")
    
    # Print predictions at each step for debugging
    location_predictions = {}
    for tr in time_ranges:
        test_data = scaler.fit_transform(location_data['Demand'].tail(5).values.reshape(1, -1)).flatten()
        new_preds = []
        #print(f"Predictions for {tr}-hour range:")
        for _ in range(tr):
            pred = model.predict(test_data.reshape(1, -1, 1)).flatten()
            new_preds.append(float(pred))
            #print(f"Step {_ + 1}: {pred[0]}")  # Print each prediction step
            test_data = np.roll(test_data, shift=-1)
            test_data[-1] = float(pred)
        location_predictions[str(tr)] = new_preds

    # Store predictions for the location
    all_demand_predictions[location] = location_predictions

# Flatten the nested dictionary structure
flat_predictions = {}
for location, location_data in all_demand_predictions.items():
    flat_predictions[location] = {}
    for tr, preds in location_data.items():
        flat_predictions[location][tr] = preds

# Save the demand predictions to a JSON file
with open('Back-End/GasolineForecast/predictions/demand_predictions.json', 'w') as f:
    json.dump(flat_predictions, f, indent=4)

# Test Case: The predictions should not be None and JSON file should be created
assert all_demand_predictions is not None
assert os.path.exists('Back-End/GasolineForecast/predictions/demand_predictions.json')
