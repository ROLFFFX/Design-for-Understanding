import json

def transform_to_purpose_frequency(input_file, output_file):
    with open(input_file, 'r') as file:
        data_list = json.load(file)

    purpose_frequency = {}
    for item in data_list:
        purpose = item["Data"]["Purpose"]
        if purpose in purpose_frequency:
            purpose_frequency[purpose] += 1
        else:
            purpose_frequency[purpose] = 1

    transformed_list = [{"purpose": key, "frequency": value} for key, value in purpose_frequency.items()]

    with open(output_file, 'w') as file:
        json.dump(transformed_list, file, indent=4)

input_file = "./app/src/components/PieChartWithPurpose/data/nuclear_explosions.json"  
output_file = "./app/src/components/PieChartWithPurpose/data/purpose_frequency_pair.json"  

transform_to_purpose_frequency(input_file, output_file)
