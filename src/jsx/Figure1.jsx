import React, { useState, useEffect } from 'react';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartLine from './components/ChartLine.jsx';

import '../styles/styles.less';

function Figure1() {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map((el) => {
    const labels = Object.keys(el).filter(val => val !== 'Name').map(val => Date.UTC(parseInt(val, 10), 0, 1));
    const values = Object.values(el).map(val => (parseFloat(val))).filter(val => !Number.isNaN(val));

    return ({
      data: values.map((e, j) => ({
        x: labels[j],
        y: e,
      })),
      name: el.Name,
      lineWidth: (el.Name === 'Knowledge-intensive services') ? 6 : 3
    });
  });

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2022-africa_stat_day/' : './'}assets/data/2022-africa_stat_day_figure_1.csv`;
    try {
      fetch(data_file)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.text();
        })
        .then(body => setDataFigure(cleanData(CSVtoJSON(body))));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="app">
      {dataFigure && (
      <ChartLine
        data={dataFigure}
        data_decimals={0}
        idx="1"
        note="Knowledge-intensive services include the following Extended balance of payments services classification 2010 service items: insurance and pension services, financial services, telecommunications, computer, and information services, other business services, and personal, cultural, and recreational services."
        source="UNCTADstat as jointly compiled by UNCTAD and WTO."
        subtitle="Value of services exports, millions of US dollars in current prices"
        suffix=""
        title="Knowledge-intensive services lead Africa’s services exports following COVID-19"
        ylabel=""
      />
      )}
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

export default Figure1;
