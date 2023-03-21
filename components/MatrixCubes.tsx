import { generateOnDragEnd } from 'hooks/useGestureEvent';
import {
  existMatrixSelector,
  settingSelector,
  warpMatrixSelector,
} from 'hooks/useSelector';
import React, { CSSProperties } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useGesture } from 'react-use-gesture';

import styles from './MatrixCubes.module.scss';

const MatrixCubes: React.FC = () => {
  const list = useSelector(warpMatrixSelector);

  const { spaceSideCount } = useSelector(settingSelector);

  const existList = useSelector(existMatrixSelector);

  const gestureEvent = useGesture({ onDragEnd: generateOnDragEnd() });
  return (
    <Container
      style={{ '--baseWidth': `${100 / spaceSideCount}%` } as CSSProperties}
      className={styles.container}
      {...gestureEvent()}>
      {list.map((items, i) => (
        <Row key={i}>
          {items.map((item, j) => (
            <Col key={j}>
              <Cube value={0} />
            </Col>
          ))}
        </Row>
      ))}
      <TransitionGroup>
        {existList.map((item) => (
          <CSSTransition
            in={item.isVisible}
            mountOnEnter
            timeout={300}
            key={item.id}
            unmountOnExit>
            <div
              style={{ '--x': item.x, '--y': item.y } as CSSProperties}
              className={styles.animationCube}
              data-value={item.value}
              data-visible={item.isVisible}>
              <h1>{item.value}</h1>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
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
