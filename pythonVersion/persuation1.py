import streamlit as st
import pandas as pd
import plotly.express as px

# Set page config
st.set_page_config(layout="wide")
@st.cache_data()
def load_data():
    df = pd.read_csv('nuclear_explosions.csv')
    return df

df = load_data()
df['year'] = df['year'].astype(int)
min_year, max_year = df['year'].min(), df['year'].max()

selected_year = st.slider('Select a year', min_year, max_year, min_year)
filtered_data = df[df['year'] == selected_year]

fig = px.scatter_geo(filtered_data,
                     lat='latitude',
                     lon='longitude',
                     size='yield_upper',
                     hover_name='name', 
                     hover_data=["name", "yield_upper", "country", "purpose"],
                     projection="equirectangular",
                     title='Nuclear Explosions by Year',
                     size_max=35)

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
