import streamlit as st
import pandas as pd
import altair as alt
import json


with open('nuclear_explosions.json') as f:
    data = json.load(f)

df_surface = pd.DataFrame.from_records([{'Surface': d['Data']['Magnitude']['Surface']} for d in data if d['Data']['Magnitude']['Surface'] > 0])
df_depth_body = pd.DataFrame.from_records([{'Upper': d['Data']['Yield']['Upper'], 'Body': d['Data']['Magnitude']['Body']} for d in data])
df_yield_upper = pd.DataFrame.from_records([{'Upper': d['Data']['Yield']['Upper']} for d in data if d['Data']['Yield']['Upper'] > 0])

chart_surface = alt.Chart(df_surface).mark_bar().encode(
    alt.X('Surface:Q', bin=True, title='Surface Magnitude'),
    alt.Y('count()', title='Frequency'),
    tooltip=[alt.Tooltip('Surface:Q')]
).properties(
    title='Histogram of Nuclear Explosion Surface Magnitudes'
)

chart_body = alt.Chart(df_depth_body).mark_point().encode(
    alt.X('Body:Q', title='Upper Bound'),
    alt.Y('Upper:Q', title='Body Magnitude'),
    tooltip=[alt.Tooltip('Upper:Q'), alt.Tooltip('Body:Q')]
).properties(
    title='Scatter plot of Nuclear Explosion Body Magnitudes vs. Depth'
)

chart_upper = alt.Chart(df_yield_upper).mark_bar().encode(
    alt.X('Upper:Q', bin=True, title='Explosion yield upper estimate in kilotons of TNT'),
    alt.Y('count()', title='Frequency'),
    tooltip=[alt.Tooltip('Upper:Q')]
).properties(
    title='Histogram of Explosion yield upper estimate in kilotons of TNT'
)

# first pip install streamlit altair
# then streamlit run main.py
st.write("# Nuclear Explosions Analysis")
st.altair_chart(chart_surface, use_container_width=True)
st.altair_chart(chart_body, use_container_width=True)
st.altair_chart(chart_upper, use_container_width=True)
