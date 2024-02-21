import React, { useEffect } from 'react';
import vegaEmbed from 'vega-embed';
import data from './nuclear_explosions.json'; // Adjust this path as needed
import './App.css';

const App = () => {
  useEffect(() => {
    const surfaceMagnitudes = data.map(d => ({ Surface: d.Data.Magnitude.Surface }))
      .filter(d => d.Surface > 0); // Filter out entries with 0.0, assuming they're placeholders

    const spec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      description: 'Histogram of Nuclear Explosion Surface Magnitudes',
      data: {
        values: surfaceMagnitudes
      },
      mark: 'bar',
      encoding: {
        x: {
          field: 'Surface',
          bin: true,
          title: 'Surface Magnitude'
        },
        y: {
          aggregate: 'count',
          title: 'Frequency'
        }
      }
    };

    vegaEmbed('#root', spec, { actions: false });
  }, []);

  return <div id="vega-chart"></div>;
};

export default App;
