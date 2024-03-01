import streamlit as st
import pandas as pd
import time

# Load the CSV file into a DataFrame
df = pd.read_csv('nuclear_explosions.csv')

def find_matching_yield(tnt_count):
    # Filter the DataFrame for explosions where the yield_lower <= tnt_count <= yield_upper
    matching_yields = df[(df['yield_lower'] <= tnt_count) & (df['yield_upper'] >= tnt_count)]
    
    # Sort the matching yields by date to find the earliest
    sorted_matches = matching_yields.sort_values(by='date_long')
    
    if not sorted_matches.empty:
        # Get the first row of the sorted matches
        first_match = sorted_matches.iloc[0]
        # Return the country and date (converted to a readable format)
        country = first_match['country']
        date = pd.to_datetime(str(first_match['date_long']), format='%Y%m%d').date()
        kiloton = first_match['yield_upper']
        return country, date, kiloton
    else:
        # Return None if there are no matches
        return None, None

# Initialize or check for the 'current_index' in the session state
if 'current_index' not in st.session_state:
    st.session_state.current_index = 0

# Define total number of images and their TNT counts
total_images = 9
tnt_counts = [15, 200, 800, 1000, 2000, 4000, 10000, 20000, 50000]

def increment_index():
    st.session_state.current_index = (st.session_state.current_index + 1) % total_images

def decrement_index():
    st.session_state.current_index = (st.session_state.current_index - 1) % total_images

def display_tnt_image():
    number_of_tnts = tnt_counts[st.session_state.current_index]
    file_path = f"tnts/tnt{number_of_tnts}.png"
    
    country, date, kiloton = find_matching_yield(number_of_tnts)
    tooltip_text = f"Country: {country}, Date: {date}, Kilotons of TNT:{kiloton}" if country and date else "No match found"
    
    image_placeholder.image(file_path, use_column_width=True, caption=tooltip_text)

st.title("Interactive TNT Graph")

image_placeholder = st.empty()

col1, col2, col3 = st.columns([1, 10, 1])

with col1:
    if st.button("←"):
        decrement_index()
with col3:
    if st.button("→"):
        increment_index()

display_tnt_image()

if st.button("Click to Explode!"):
    explosion_gif_path = 'tnts/exp.gif'
    image_placeholder.image(explosion_gif_path, use_column_width=True)
    time.sleep(2)  # Pause to show the explosion GIF
    display_tnt_image()  # Re-display the TNT image after the explosion
