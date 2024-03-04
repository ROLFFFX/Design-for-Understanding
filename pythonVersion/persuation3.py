import streamlit as st
import pandas as pd
import time


df = pd.read_csv('nuclear_explosions.csv')
df['yield_upper'] = pd.to_numeric(df['yield_upper'], errors='coerce')

def find_matching_yield(tnt_count):
    matching_yields = df[df['yield_upper'] == tnt_count]
    sorted_matches = matching_yields.sort_values(by='date_long')
    
    if not sorted_matches.empty:
        first_match = sorted_matches.iloc[0]
        country = first_match['country']
        date = pd.to_datetime(str(first_match['date_long']), format='%Y%m%d').date()
        kiloton = first_match['yield_upper']
        name = first_match['name']
        return country, date, kiloton, name
    # else:
    #     return None, None

if 'current_index' not in st.session_state:
    st.session_state.current_index = 0

total_images = 9
tnt_counts = [15, 49, 225, 500, 1690, 5000, 10000, 19100, 50000]

def increment_index():
    st.session_state.current_index = (st.session_state.current_index + 1) % total_images

def decrement_index():
    st.session_state.current_index = (st.session_state.current_index - 1) % total_images

def display_tnt_image():
    number_of_tnts = tnt_counts[st.session_state.current_index]
    file_path = f"tnts/tnt{number_of_tnts}.png"
    
    country, date, kiloton, name = find_matching_yield(number_of_tnts)
    tooltip_text = f"name:{name}, Country: {country}, Date: {date}, Kilotons of TNT:{kiloton}" if country and date else "No match found"
    
    image_placeholder.image(file_path, use_column_width=True, caption=tooltip_text)
    
def display_exp_gif():
    number_of_tnts = tnt_counts[st.session_state.current_index]
    file_path = f"tnts/exp{number_of_tnts}.gif"
    image_placeholder.image(file_path, use_column_width=True)

st.link_button("Go back", "https://nucexpo.vercel.app/")

st.title("Interactive TNT Graph")

image_placeholder = st.empty()

col1, col2, col3 = st.columns([5, 7, 1])

with col1:
    if st.button("←"):
        decrement_index()

with col2:
    if st.button("Click to Explode!"):
        display_exp_gif
        time.sleep(2)
        #display_tnt_image()

with col3:
    if st.button("→"):
        increment_index()
display_tnt_image()

#persuation2 rename
#persuation3 stack gifs