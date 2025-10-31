import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from './components';

const Home = () => {
  return (
    <SafeAreaView>
      <Button title="Click me" />
    </SafeAreaView>
  );
};

export default Home;
