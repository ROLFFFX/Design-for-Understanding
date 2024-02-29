import json

def transform_data(input_file, output_file):
    with open(input_file, 'r') as file:
        data_list = json.load(file)
        
        
    transformed_list = [
        {
        "Location": item["Location"]["Country"],
        "Purpose": item["Data"]["Purpose"].upper()
        } for item in data_list
    ]
    
    with open(output_file, 'w') as file:
        json.dump(transformed_list, file, indent=4)
        
input_file = "../../../nuclear_explosions.json"
output_file = "./app/src/components/PieChartWithPurpose/data/country_purpose_pair.json"

transform_data(input_file, output_file)