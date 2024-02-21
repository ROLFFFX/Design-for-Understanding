import streamlit as st
import json
import matplotlib.pyplot as plt
from matplotlib.offsetbox import OffsetImage, AnnotationBbox

st.set_page_config(layout="wide")

# Load data
@st.cache_data()
def load_data():
    with open('nuclear_explosions.json', 'r') as f:
        data = json.load(f)
    return data

data = load_data()


years = [bomb['Date']['Year'] for bomb in data]
min_year, max_year = min(years), max(years)

# Dynamic year selection
selected_year = st.slider('Select a year', min_year, max_year, min_year)
filtered_data = [bomb for bomb in data if bomb['Date']['Year'] == selected_year]

fig, ax = plt.subplots(figsize = (13, 7.5))

# Load and set the background image
img = plt.imread('worldmap.jpg')
ax.imshow(img, extent=[-180, 180, -90, 90], aspect='auto')

# Set x and y axis limits
ax.set_xlim([-180, 180])
ax.set_ylim([-90, 90])

for bomb in filtered_data:
    
    # Calculate pixel size based on yield; you might need to define the conversion
    pixel_size = bomb['Data']['Yield']['Upper'] * 1
    # Example plotting command, replace with actual coordinates and sizes
    ax.scatter(bomb['Location']['Coordinates']['Longitude'], bomb['Location']['Coordinates']['Latitude'], s=pixel_size)
    
plt.title('Nuclear Explosions by Year')
plt.xlabel('Longitude')
plt.ylabel('Latitude')

# Display the plot in the Streamlit app
col1, col2, col3 = st.columns([2,8,2])
with col2:
    st.pyplot(fig)
