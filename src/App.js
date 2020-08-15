import React from 'react';
import { VictoryBar } from 'victory';
import './App.css';

import { ratings } from './data';

function App() {
  const sortedRatings = ratings
  .map(
    ({ team, rating }) => ({ team, rating: rating - 90 })
  )
  .sort(
    (a, b) => a.rating > b.rating ? -1 : 1,
  );

  console.log(sortedRatings);

  return (
    <div className="App">
      <div className="chart-example">
        <VictoryBar
            data={sortedRatings}
            x="team"
            y="rating"
        />
      </div>
    </div>
  );
}

export default App;
