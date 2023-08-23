import React from 'react';
import {TailwindProvider} from 'tailwind-rn';
import {Provider} from 'react-redux';
import {store} from '../../redux/store';
import utilities from '../../../tailwind.json';
import RootNavigation from '../navigation/RootNavigation';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      {/* @ts-ignore */}
      <TailwindProvider utilities={utilities}>
        <RootNavigation />
      </TailwindProvider>
    </Provider>
  );
};

export default App;
