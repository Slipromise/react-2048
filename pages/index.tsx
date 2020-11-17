import { goDirectionMatrix, initMatrix } from 'actions/MatrixAction';
import * as React from 'react';
import { Button } from 'react-bootstrap';

const Home = () => {
  return (
    <h1>
      Welcome to My Next App!<Button>test</Button>
    </h1>
  );
};

console.log(initMatrix);
console.log(goDirectionMatrix);
export default Home;
