import pandas as pd
import numpy as np

# Create synthetic demand data
np.random.seed(42)

# Create date ranges for 30 days
days = pd.date_range("2023-01-01", periods=30, freq='D')
locations = [f'Location_{i}' for i in range(20)]

# Calculate the total number of data points needed
total_data_points = len(days) * len(locations)

# Generate demand data with patterns
demand_pattern = np.concatenate([np.random.normal(100, 20, 12), np.random.normal(150, 30, 5), np.random.normal(80, 15, 7)])

# Repeat the demand pattern to match the total_data_points
demand_data = {
    'Date': np.array([[day]*len(locations) for day in days]).flatten()[:total_data_points],
    'Location': np.array([locations for _ in range(len(days))]).flatten()[:total_data_points],
    'Demand': np.tile(demand_pattern, total_data_points // len(demand_pattern))
}

# Create DataFrame
df_demand = pd.DataFrame(demand_data)

# Save the demand data to a CSV file
df_demand.to_csv("Back-End/GasolineForecast/datasets/gas_demand.csv", index=False)
