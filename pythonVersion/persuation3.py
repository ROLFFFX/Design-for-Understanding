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
    else:
        return "No match found", None, None, None

if 'current_index' not in st.session_state:
    st.session_state.current_index = 0

if 'show_explosion' not in st.session_state:
    st.session_state.show_explosion = False

total_images = 9
tnt_counts = [15, 49, 225, 500, 1690, 5000, 10000, 19100, 50000]

# Dictionary containing facts for each kiloton value
kiloton_facts = {
    15: "Little Boy was the codename for the atomic bomb dropped on the Japanese city of Hiroshima on August 6, 1945, by the United States during World War II. This was the first atomic bomb ever used in warfare. It utilized uranium-235 as its fissile material and had an explosive yield of approximately 15 kilotons of TNT.",
    49: "Conducted on November 16, 1952, as part of Operation Ivy, it had a yield of about 500 kilotons, which is substantially higher than 49 kilotons but demonstrates the scale of nuclear testing during that era. The devices in this yield range are designed to cause significant destruction over a wide area, capable of devastating a medium to large city.",
    225: "A 225-kiloton explosion would create a fireball several kilometers in diameter, with severe blast effects demolishing even reinforced structures within a considerable radius and causing widespread fires. The immediate area around the blast would experience near-total destruction, with significant damage extending out to further distances. ",
    500: "The environmental impact would be severe, with the potential for a nuclear winter effect if multiple bombs of this size were detonated, blocking sunlight and lowering global temperatures. The immediate human toll would be devastating, with a very high death toll and long-term health effects from radiation exposure extending far beyond the initial blast zone.",
    1690: "A weapon yielding 1,690 kilotons would create a massive fireball, initially several kilometers in diameter, vaporizing everything within it and creating a severe shockwave that would demolish even hardened structures for kilometers beyond the fireball. The thermal radiation could cause third-degree burns and ignite fires over a vast area, contributing to a firestorm that could consume a large metropolitan area.",
    5000: "This test was indicative of the period's emphasis on developing and testing high-yield thermonuclear weapons, which were intended to serve as powerful deterrents in the strategic arms race, particularly against the Soviet Union. It is capable of causing catastrophic destruction over a wide area. The Tewa test would have produced a gigantic fireball, visible from dozens of kilometers away, and a mushroom cloud that reached high into the atmosphere. ",
    10000: "A 10,000-kiloton explosion would have had catastrophic effects, capable of causing unprecedented destruction over a wide area, with a massive fireball, extensive blast damage, and severe thermal radiation. The environmental impact would include significant fallout, spreading radioactive material over a wide area, leading to long-term contamination and health effects for exposed populations.",
    19100: "The test conducted by the Soviet Union on September 25, 1962, is likely the detonation of a very large thermonuclear device, part of a series of tests during the Cold War. It has a similar scale to the erruption of st.Helen.",
    50000: "This test is famously known for the Tsar Bomba, the largest nuclear weapon ever detonated. Conducted over the Novaya Zemlya archipelago in the Arctic Ocean, Tsar Bomba's original design yield was 100 megatons, but it was scaled down to approximately half to reduce the amount of fallout. The bomb was air-dropped from a modified Tu-95 bomber and detonated at an altitude of about 4,000 meters"
}

def increment_index():
    st.session_state.current_index = (st.session_state.current_index + 1) % total_images

def decrement_index():
    st.session_state.current_index = (st.session_state.current_index - 1) % total_images

def display_tnt_info():
    number_of_tnts = tnt_counts[st.session_state.current_index]
    st.write(kiloton_facts[number_of_tnts])

def display_tnt_image():
    if not st.session_state.show_explosion:  # Display static image if not showing explosion
        number_of_tnts = tnt_counts[st.session_state.current_index]
        file_path = f"tnts/tnt{number_of_tnts}.png"
        image_placeholder.image(file_path, use_column_width=True, caption="Phenomenon displayed is the same TNT equivalency as the bomb displayed")

def display_exp_gif():
    st.session_state.show_explosion = True  # Trigger explosion display
    number_of_tnts = tnt_counts[st.session_state.current_index]
    file_path = f"tnts/exp{number_of_tnts}.gif"
    image_placeholder.image(file_path, use_column_width=True)
    time.sleep(2)  # Display the explosion for 2 seconds
    st.session_state.show_explosion = False  # Reset to display static image again

st.link_button("Go back", "https://nucexpo.vercel.app/")

number_of_tnts = tnt_counts[st.session_state.current_index]
country, date, kiloton, name = find_matching_yield(number_of_tnts)
title = f"The bomb {name} is built by {country} and detonated on {date}"
st.title(title)

# Streamlit layout
col1, col2, col3 = st.columns([20, 2, 12])

with col1:
    image_placeholder = st.empty()
    if st.button("See in Action"):
        display_exp_gif()
        time.sleep(2)
    display_tnt_image()

with col3:
    display_tnt_info()
    decrement_btn = st.button("←", on_click=lambda: st.session_state.update(current_index=(st.session_state.current_index - 1) % total_images))
    increment_btn = st.button("→", on_click=lambda: st.session_state.update(current_index=(st.session_state.current_index + 1) % total_images))