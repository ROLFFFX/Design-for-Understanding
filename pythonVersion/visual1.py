import streamlit as st
import json
import plotly.express as px
import pandas as pd


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

selected_year = st.slider('Select a year', min_year, max_year, min_year)
filtered_data = [bomb for bomb in data if bomb['Date']['Year'] == selected_year]

df = pd.DataFrame(filtered_data)

df['Latitude'] = df.apply(lambda x: x.get('Location', {}).get('Coordinates', {}).get('Latitude', None), axis=1)
df['Longitude'] = df.apply(lambda x: x.get('Location', {}).get('Coordinates', {}).get('Longitude', None), axis=1)
df['size'] = df.apply(lambda x: x.get('Data', {}).get('Yield', {}).get('Upper', None), axis=1)
df['name'] = df.apply(lambda x: x.get('Data', {}).get('Name', {}), axis=1)

fig = px.scatter_geo(df,
                     lat='Latitude',
                     lon='Longitude',
                     size='size',
                     hover_name='name',  
                     hover_data=["name", "size"],  
                     projection="equirectangular",
                     title='Nuclear Explosions by Year',size_max=200)

fig.update_geos(
    landcolor="rgb(243, 243, 243)",
    countrycolor="rgb(204, 204, 204)"
)

fig.update_layout(
    width=1000,  
    height=600,  
)

col1, col2, col3 = st.columns([2,8,2])
with col2:
    st.plotly_chart(fig, use_container_width=True)
