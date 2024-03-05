import streamlit as st
import pandas as pd
import plotly.express as px

hide_streamlit_style = """
<style>
    #root > div:nth-child(1) > div > div > div > div > section > div {padding-top: 2rem;}
</style>
"""
st.set_page_config(layout="wide")
st.markdown(hide_streamlit_style, unsafe_allow_html=True)

@st.cache_data()
def load_data():
    df = pd.read_csv('nuclear_explosions.csv')
    columns_to_fill = ['name']
    for column in columns_to_fill:
        df[column] = df[column].fillna("Un-named") 
    return df

df = load_data()
df['year'] = df['year'].astype(int)
min_year, max_year = df['year'].min(), df['year'].max()

col1, col2 = st.columns([1, 8])

with col1:
    st.link_button("Go back", "https://nucexpo.vercel.app/")
with col2:
    st.markdown("### Geospatial Multi-View", unsafe_allow_html=True)

selected_year = st.slider('Select a Year', min_year, max_year, min_year)

# Plotting logic based on the selected year
if selected_year in [1962, 1968, 1979, 1983]:
    # Display an empty world map if the selected year matches any in the list
    fig = px.scatter_geo(projection="equirectangular")
    fig.update_geos(landcolor="rgb(243, 243, 243)", countrycolor="rgb(204, 204, 204)")
        
else:
    filtered_data = df[df['year'] == selected_year]
    fig = px.scatter_geo(filtered_data,
                         lat='latitude',
                         lon='longitude',
                         size='yield_upper',
                         hover_name='name', 
                         hover_data={'name': True, 'yield_upper': True, 'country': True, 'purpose': True},
                         projection="equirectangular",
                         size_max=35,
                         color_discrete_sequence=['#d50000'])
    fig.update_geos(landcolor="rgb(243, 243, 243)", countrycolor="rgb(204, 204, 204)")
    fig.update_traces(hovertemplate="<br>".join([
        "Name: %{hovertext}",
        "Yield Upper: %{customdata[1]} Kilotons",
        "Country: %{customdata[2]}",
        "Purpose: %{customdata[3]}"
    ]))
fig.update_layout(margin={"r":0,"t":0,"l":0,"b":0})

# Displaying the plot
col1, col2, col3 = st.columns([1,6,1])
with col2:
    st.plotly_chart(fig, use_container_width=True)