import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
import json

# Generate synthetic gas price data
""" np.random.seed(42)
days = pd.date_range("2023-01-01", periods=30, freq='H')  # For each hour
locations = [f'Location_{i}' for i in range(20)]
gas_prices = np.random.uniform(15, 25, size=(len(days), len(locations)))
df = pd.DataFrame(gas_prices, columns=locations, index=days) """

locations = [f'Location_{i}' for i in range(20)]
df = pd.read_csv("Back-End/GasolineForecast/datasets/gas_prices.csv")

# Initialize the MinMaxScaler
scaler = MinMaxScaler()

# Loop through each location to train model and make predictions
all_predictions = {}
time_ranges = [1, 24, 168]  # 1 hour, 24 hours, 7 days (168 hours)

for loc in locations:
    # Data Preprocessing
    gas_price = df[[loc]].values
    gas_price_scaled = scaler.fit_transform(gas_price)

    X, y = [], []
    for i in range(5, len(gas_price_scaled) - 1):
        X.append(gas_price_scaled[i - 5:i, 0])
        y.append(gas_price_scaled[i, 0])
    X, y = np.array(X), np.array(y)
    X = np.reshape(X, (X.shape[0], X.shape[1], 1))

    # LSTM Model
    model = Sequential()
    model.add(LSTM(units=50, return_sequences=True, input_shape=(X.shape[1], 1)))
    model.add(LSTM(units=50))
    model.add(Dense(units=1))
    model.compile(optimizer='adam', loss='mean_squared_error')
    model.fit(X, y, epochs=10, batch_size=32)

    # Making predictions for future time ranges
    future_predictions = {}
    for tr in time_ranges:
        test_data = gas_price_scaled[-5:, 0].reshape(1, 5, 1)
        new_preds = []
        for _ in range(tr):
            pred = model.predict(test_data)
            new_preds.append(pred)
            test_data = np.roll(test_data, shift=-1)
            test_data[0, -1, 0] = pred
        future_predictions[tr] = scaler.inverse_transform(np.array(new_preds).reshape(-1, 1)).flatten()

    all_predictions[loc] = future_predictions

# Now, 'all_predictions' contains the future gas price predictions for all 20 locations.
# print("Predictions: ", all_predictions)

# Convert NumPy arrays to Python lists before JSON serialization
all_predictions_json_safe = {station: {time_frame: predictions.tolist() for time_frame, predictions in time_dict.items()} for station, time_dict in all_predictions.items()}

# Save the predictions to a JSON file
with open('Back-End/GasolineForecast/predictions/gas_price_predictions.json', 'w') as f:
    json.dump(all_predictions_json_safe, f, indent=4)

assert all_predictions is not None
assert os.path.exists('Back-End/GasolineForecast/predictions/gas_price_predictions.json')