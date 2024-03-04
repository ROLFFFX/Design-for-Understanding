import json

# Function to standardize country names
def standardize_country_name(country_code):
    mapping = {'CHN': 'CHINA', 'CHINA': 'CHINA', 'US': 'USA', 'USA': 'USA'}
    return mapping.get(country_code.upper(), country_code.upper())

# Load the JSON data
with open('app/src/components/HistogramTotalYieldCountry/data/nuclear_explosions.json', 'r') as file:
    data = json.load(file)

# Dictionary to hold the total yield (lower and upper) for each country
total_yield_by_country = {}

for item in data:
    country = standardize_country_name(item['Location']['Country'])
    lower_yield = item['Data']['Yield']['Lower']
    upper_yield = item['Data']['Yield']['Upper']
    
    if country not in total_yield_by_country:
        total_yield_by_country[country] = {'Lower': 0, 'Upper': 0}
    
    total_yield_by_country[country]['Lower'] += lower_yield
    total_yield_by_country[country]['Upper'] += upper_yield

# Print the results
for country, yields in total_yield_by_country.items():
    print(f"{country}: Lower Total Yield = {yields['Lower']} kt, Upper Total Yield = {yields['Upper']} kt")
