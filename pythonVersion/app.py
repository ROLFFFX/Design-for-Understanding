import streamlit as st
import pandas as pd
import plotly.express as px
import matplotlib.pyplot as plt, mpld3
from matplotlib.ticker import MaxNLocator
import mpld3.plugins as plugins
import time

# Set page config
st.set_page_config(layout="wide")

# Function to load data
@st.cache_data
def load_data():
    df = pd.read_csv('nuclear_explosions.csv')
    return df

# Load the data
df = load_data()

# Adding a go-back link
st.sidebar.link_button("Go back", "https://nucexpo.vercel.app/")

# Navigation
page = st.sidebar.radio("Navigate to", ["Nuclear Explosions Map", "Yield Over Time", "Interactive TNT Graph"])
empty = ""

if page == "Nuclear Explosions Map":
    df['year'] = df['year'].astype(int)
    min_year, max_year = df['year'].min(), df['year'].max()

    selected_year = st.slider('Select a year', min_year, max_year, min_year)
    # Check if the selected year is either 1979 or 1983
    if selected_year in [1962, 1979, 1983]:
        # Display an empty world map
        fig = px.scatter_geo(projection="equirectangular")
        fig.update_geos(landcolor="rgb(243, 243, 243)", countrycolor="rgb(204, 204, 204)")
        fig.update_layout(width=1000, height=600, title='Nuclear Explosions by Year')
    else:
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
        fig.update_geos(landcolor="rgb(243, 243, 243)", countrycolor="rgb(204, 204, 204)")
        fig.update_layout(width=1000, height=600)

    col1, col2, col3 = st.columns([2,8,2])
    with col2:
        st.plotly_chart(fig, use_container_width=True)

elif page == "Yield Over Time":
    # Visualization 2 logic
    data = df.copy()
    data['date'] = pd.to_datetime(data['date_long'], format='%Y%m%d')
    data['month_year'] = data['date'].dt.to_period('M').dt.to_timestamp()

    grouped_data = data.groupby(['country', 'month_year'])['yield_upper'].sum().reset_index()
    grouped_data = grouped_data.sort_values(by='yield_upper', ascending=False)

    unique_countries = grouped_data['country'].unique()
    country_to_num = {country: i for i, country in enumerate(unique_countries)}
    grouped_data['country_num'] = grouped_data['country'].map(country_to_num)

    unique_dates = len(grouped_data['month_year'].unique())
    fig_width = max(10, unique_dates * 1.5)
    fig_height = max(800, len(unique_countries) * 60)

    fig, ax = plt.subplots(figsize=(fig_width, fig_height/100))
    scatter = ax.scatter(grouped_data['month_year'], grouped_data['country_num'], s=grouped_data['yield_upper'], c=grouped_data['country_num'], cmap='viridis', alpha=0.8)

    tooltip_labels = [f"Country: {row['country']}, Kilotons: {row['yield_upper']}, Date: {row['month_year'].strftime('%Y-%m')}" for _, row in grouped_data.iterrows()]
    plugins.connect(fig, plugins.PointLabelTooltip(scatter, labels=tooltip_labels))
    ax.set_ylim(-2, len(unique_countries))

    plt.yticks(range(len(unique_countries)), unique_countries)
    plt.xticks(rotation=90)
    plt.gca().xaxis.set_major_locator(MaxNLocator(prune='both', nbins=20))
    plt.tight_layout()
    fig_html = mpld3.fig_to_html(fig)
    variable = "yield over time"

    st.markdown(f"<div style='text-align: center; font-size: 24px; color: black;'>{variable}</div>", unsafe_allow_html=True)
    custom_html = f"""<div style="overflow-x: auto; overflow-y: auto; width:100%; height:100vh;">{fig_html}</div>"""
    st.components.v1.html(custom_html, height=820, scrolling=True)

elif page == "Interactive TNT Graph":
    # Visualization 3 logic
    df['yield_upper'] = pd.to_numeric(df['yield_upper'], errors='coerce')
    tnt_counts = [15, 49, 225, 500, 1690, 5000, 10000, 19100, 50000]
    if 'current_index' not in st.session_state:
        st.session_state.current_index = 0

    def find_matching_yield(tnt_count):
        matching_yields = df[df['yield_upper'] == tnt_count]
        sorted_matches = matching_yields.sort_values(by='date_long')
        
        if not sorted_matches.empty:
            first_match = sorted_matches.iloc[0]
            country = first_match['country']
            date = pd.to_datetime(str(first_match['date_long']), format='%Y%m%d').date()
            kiloton = first_match['yield_upper']
            return country, date, kiloton

    def increment_index():
        st.session_state.current_index = (st.session_state.current_index + 1) % len(tnt_counts)

    def decrement_index():
        st.session_state.current_index = (st.session_state.current_index - 1) % len(tnt_counts)

    number_of_tnts = tnt_counts[st.session_state.current_index]
    file_path = f"tnts/tnt{number_of_tnts}.png"
    country, date, kiloton = find_matching_yield(number_of_tnts)
    tooltip_text = f"Country: {country}, Date: {date}, Kilotons of TNT: {kiloton}" if country and date else "No match found"
    st.markdown(f"<div style='text-align: center; font-size: 24px; color: black;'>{tooltip_text}</div>", unsafe_allow_html=True)
    st.markdown(f"<div style='text-align: center; font-size: 24px; color: black;'>{empty}</div>", unsafe_allow_html=True)
    st.markdown(f"<div style='text-align: center; font-size: 24px; color: black;'>{empty}</div>", unsafe_allow_html=True)
    
    col1, col2, col3 = st.columns([1.85, 5, 1])
    
    with col1:
        st.markdown(f"<div style='text-align: center; font-size: 24px; color: black;'>{empty}</div>", unsafe_allow_html=True)
        st.markdown(f"<div style='text-align: center; font-size: 24px; color: black;'>{empty}</div>", unsafe_allow_html=True)
        st.markdown(f"<div style='text-align: center; font-size: 24px; color: black;'>{empty}</div>", unsafe_allow_html=True)
        st.markdown(f"<div style='text-align: center; font-size: 24px; color: black;'>{empty}</div>", unsafe_allow_html=True)
        
        if st.button("←"):
            decrement_index()

    with col2:
        image_placeholder = st.empty()
        if st.button("Click to Explode!"):
            explosion_gif_path = 'tnts/exp.gif'
            image_placeholder.image(explosion_gif_path, width=800)
            time.sleep(2)
        
        number_of_tnts = tnt_counts[st.session_state.current_index]
        file_path = f"tnts/tnt{number_of_tnts}.png"
        image_placeholder.image(file_path, width=800)


    with col3:
        st.markdown(f"<div style='text-align: center; font-size: 24px; color: black;'>{empty}</div>", unsafe_allow_html=True)
        st.markdown(f"<div style='text-align: center; font-size: 24px; color: black;'>{empty}</div>", unsafe_allow_html=True)
        st.markdown(f"<div style='text-align: center; font-size: 24px; color: black;'>{empty}</div>", unsafe_allow_html=True)
        st.markdown(f"<div style='text-align: center; font-size: 24px; color: black;'>{empty}</div>", unsafe_allow_html=True)
        if st.button("→"):
            increment_index()

