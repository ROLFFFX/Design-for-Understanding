import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt, mpld3
from matplotlib.ticker import MaxNLocator
import mpld3.plugins as plugins
import string

# Adjust CSS to hide the top bar and potentially adjust other styles
hide_streamlit_style = """
<style>
    #root > div:nth-child(1) > div > div > div > div > section > div {padding-top: 2rem;}
</style>
"""

st.set_page_config(layout="wide")
st.markdown(hide_streamlit_style, unsafe_allow_html=True)

col1, col2 = st.columns([1, 8])

with col1:
    st.button("Go back", on_click=lambda: st.write("https://nucexpo.vercel.app/"))
with col2:
    # Use markdown with unsafe_allow_html to customize the header style
    st.markdown("### If Twenty Kilotons is One Pixel", unsafe_allow_html=True)

# Assuming the existence of 'nuclear_explosions.csv' with appropriate columns
data = pd.read_csv('nuclear_explosions.csv')
data['date'] = pd.to_datetime(data['date_long'], format='%Y%m%d')
data['month_year'] = data['date'].dt.to_period('M').dt.to_timestamp()
data = data[data['date'].dt.year > 1945]

grouped_data = data.groupby(['country', 'month_year'])['yield_upper'].sum().reset_index()

# Sort grouped_data by 'yield_upper' in descending order so larger circles are plotted first
grouped_data = grouped_data.sort_values(by='yield_upper', ascending=False)
unique_countries = grouped_data['country'].unique()
country_to_num = {country: i for i, country in enumerate(unique_countries)}
grouped_data['country_num'] = grouped_data['country'].map(country_to_num)
country_labels = {country: label for country, label in zip(unique_countries, string.ascii_lowercase)}
grouped_data['country_label'] = grouped_data['country'].map(country_labels)
unique_dates = len(grouped_data['month_year'].unique())
fig_width = max(10, unique_dates*0.2)
fig_height = max(700, len(unique_countries) * 60)

fig, ax = plt.subplots(figsize=(fig_width, fig_height / 100))
scatter = ax.scatter(grouped_data['month_year'], 
                     grouped_data['country'].map(lambda x: list(country_labels.values()).index(country_labels.get(x))),  # Map country to its label index for y position
                     s=grouped_data['yield_upper'], 
                     c=grouped_data['country_num'], 
                     cmap='viridis', 
                     alpha=0.8,
                     edgecolors='white',
                     linewidth=0.5)

# Create a legend
legend_labels = {num: country for country, num in country_to_num.items()}
handles = [plt.Line2D([0], [0], marker='o', color='w', label=legend_labels[num], 
              markerfacecolor=plt.cm.viridis(num/len(unique_countries)), markersize=10) for num in legend_labels]
ax.legend(handles=handles, title="Country", bbox_to_anchor=(1.05, 1), loc='upper left')

tooltip_labels = [
    f"Country: {row['country']}, Kilotons: {row['yield_upper']}, Date: {row['month_year'].strftime('%Y-%m')}"
    for _, row in grouped_data.iterrows()
]
plugins.connect(fig, plugins.PointLabelTooltip(scatter, labels=tooltip_labels))

ax.set_ylim(-2, len(unique_countries))

plt.ylabel("Countries")
plt.gca().xaxis.set_major_locator(MaxNLocator(prune='both', nbins=20))
plt.tight_layout()

fig_html = mpld3.fig_to_html(fig)
custom_html = f"""
<div style="overflow-x: auto; overflow-y: auto; width:100%; height:100vh;">
    {fig_html}
</div>
"""
st.components.v1.html(custom_html, height=820, scrolling=False)
