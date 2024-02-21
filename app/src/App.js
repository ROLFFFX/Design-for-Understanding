import React, { useEffect } from 'react';
import vegaEmbed from 'vega-embed';
import data from './nuclear_explosions.json'; // Adjust this path as needed
import './App.css';

const App = () => {
  useEffect(() => {
    const surfaceMagnitudes = data.map(d => ({ Surface: d.Data.Magnitude.Surface }))
      .filter(d => d.Surface > 0); // Filter out entries with 0.0, assuming they're placeholders
    
    const bodyMagnitudes = data.map(d => ({ Body: d.Data.Magnitude.Body }))
    .filter(d => d.Body > 0);    

    const specSurface = {
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

const specBody = {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      description: 'Histogram of Nuclear Explosion Body Magnitudes',
      data: {
        values: bodyMagnitudes
      },
      mark: 'bar',
      encoding: {
        x: {
          field: 'Body',
          bin: true,
          title: 'Body Magnitude'
        },
        y: {
          aggregate: 'count',
          title: 'Frequency'
        }
      }
    };


    // Embed the first graph
    vegaEmbed('#surface-magnitude', specSurface, { actions: false });

    // Embed the second graph
    vegaEmbed('#body-magnitude', specBody, { actions: false });

  }, []);
  return (
    <div>
      <div id="surface-magnitude"></div>
      <div id="body-magnitude"></div>
      {/* more graphs */}
    </div>
  );
};

export default App;
