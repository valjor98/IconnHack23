import pandas as pd
import numpy as np

np.random.seed(42)

# Create date ranges for 500 hours (approximately 20 days)
days = pd.date_range("2023-01-01", periods=500, freq='H')
locations = [f'Location_{i}' for i in range(20)]

# Initialize data frame with random values within the range [18, 24]
gas_prices = np.random.uniform(18, 24, size=(len(days), len(locations)))

# Add monthly patterns to the gas prices
for month in range(1, 13):  # 12 months
    month_mask = (days.month == month)
    gas_prices[month_mask] += np.random.normal(0, 1, size=(month_mask.sum(), len(locations)))

# Clip the gas prices to ensure they stay within the range [18, 24]
gas_prices = np.clip(gas_prices, 18, 24)

# Create DataFrame
df = pd.DataFrame(gas_prices, columns=locations, index=days)

# Save the gas prices to a CSV file
df.to_csv("Back-End/GasolineForecast/datasets/gas_prices.csv", index=False)
