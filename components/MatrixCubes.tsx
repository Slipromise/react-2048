import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useGesture } from 'react-use-gesture';

import { generateOnDragEnd } from '../hooks/useGestureEvent';
import { warpMatrixSelector } from '../hooks/useSelector';
import styles from './MatrixCubes.module.scss';

const MatrixCubes: React.FC = () => {
  const list = useSelector(warpMatrixSelector);

  const gestureEvent = useGesture({ onDragEnd: generateOnDragEnd() });
  return (
    <Container className={styles.container} {...gestureEvent()}>
      {list.map((items, i) => (
        <Row key={i}>
          {items.map((item, j) => (
            <Col key={j}>
              <Cube value={item.value} />
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};

interface CubeProps {
  value: number;
}

const Cube: React.FC<CubeProps> = (props) => {
  const { value } = props;
  return (
    <div className={styles.cube} data-value={value}>
      <h1>{value}</h1>
    </div>
  );
};

export default MatrixCubes;
