import json
from collections import defaultdict

# Function to standardize country names
def standardize_country_name(country_code):
    mapping = {'CHN': 'CHINA', 'CHINA': 'CHINA', 'US': 'USA', 'USA': 'USA'}
    # Return the standardized country name if it exists in the mapping, else return the original
    return mapping.get(country_code.upper(), country_code.upper())

# Load the JSON data
with open('app/src/components/StackedBarChartTestPerYear/data/nuclear_explosions.json', 'r') as file:
    data = json.load(file)

# Process the data
results = defaultdict(lambda: defaultdict(int))
all_countries = set()  # To track all unique countries

for entry in data:
    country_code = standardize_country_name(entry['Location']['Country'])
    year = entry['Date']['Year']
    results[year][country_code] += 1
    all_countries.add(country_code)

# Ensure each object has all countries, set to 0 for years with no tests
output_data = []
for year in sorted(results.keys()):
    obj = {'country': "World", 'year': year}
    # Initialize each country's count to 0 for the year
    for country in all_countries:
        obj[country] = 0
    # Update the count for countries that had tests
    for country_code, count in results[year].items():
        obj[country_code] = count
    output_data.append(obj)

# Write the output to a new JSON file
with open('app/src/components/StackedBarChartTestPerYear/data/processed_nuclear_explosion_data.json', 'w') as file:
    json.dump(output_data, file, indent=4)

print("The data has been processed and saved to 'processed_nuclear_explosion_data.json'.")
