import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt, mpld3
from matplotlib.ticker import MaxNLocator
import mpld3.plugins as plugins

st.set_page_config(layout="wide")
st.link_button("Go back", "https://nucexpo.vercel.app/")
data = pd.read_csv('nuclear_explosions.csv')

data['date'] = pd.to_datetime(data['date_long'], format='%Y%m%d')
data['month_year'] = data['date'].dt.to_period('M').dt.to_timestamp()

grouped_data = data.groupby(['country', 'month_year'])['yield_upper'].sum().reset_index()

# Sort grouped_data by 'yield_upper' in descending order so larger circles are plotted first
grouped_data = grouped_data.sort_values(by='yield_upper', ascending=False)

unique_countries = grouped_data['country'].unique()
country_to_num = {country: i for i, country in enumerate(unique_countries)}
grouped_data['country_num'] = grouped_data['country'].map(country_to_num)

unique_dates = len(grouped_data['month_year'].unique())
fig_width = max(10, unique_dates*0.8)

fig_height = max(800, len(unique_countries) * 60)
fig, ax = plt.subplots(figsize=(fig_width, fig_height/100))
scatter = ax.scatter(grouped_data['month_year'], grouped_data['country_num'], s=grouped_data['yield_upper'], c=grouped_data['country_num'], cmap='viridis', alpha=0.8)

tooltip_labels = [
    f"Country: {row['country']}, Kilotons: {row['yield_upper']}, Date: {row['month_year'].strftime('%Y-%m')}"
    for _, row in grouped_data.iterrows()
]
plugins.connect(fig, plugins.PointLabelTooltip(scatter, labels=tooltip_labels))
ax.set_ylim(-2, len(unique_countries))


# plt.yticks(range(len(unique_countries)), unique_countries)
# plt.xticks(rotation=90)
plt.ylabel("Countries")
plt.gca().xaxis.set_major_locator(MaxNLocator(prune='both', nbins=20))
# debug
# plt.colorbar(scatter, ax=ax, orientation='vertical', label='Country')
plt.tight_layout()
variable = "yield over time"

st.markdown(f"<div style='text-align: center; font-size: 24px; color: black;'>{variable}</div>", unsafe_allow_html=True)
fig_html = mpld3.fig_to_html(fig)
custom_html = f"""
<div style="overflow-x: auto; overflow-y: auto; width:100%; height:100vh;">
    {fig_html}
</div>
"""
st.components.v1.html(custom_html, height=820, scrolling=False)

# html_file_name = "persuation2.html"  # You can choose any name for the file
# with open(html_file_name, "w") as file:  # Open a file in write mode
#     file.write(custom_html)  # Write the HTML content to the file

# print(f"HTML file saved as {html_file_name}")
