import { countDownAction } from 'actions/statusAction';
import { GameMode, START_TIME } from 'definitions/state';
import {
  isEndingSelector,
  matrixStatusSelector,
  settingSelector,
  statusSelector,
} from 'hooks/useSelector';
import numeral from 'numeral';
import React, { useEffect } from 'react';
import { Col, Container, ProgressBar, Row } from 'react-bootstrap';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useDispatch, useSelector } from 'react-redux';

import styles from './InfoBar.module.scss';

const InfoBar: React.FC = () => {
  const dispatch = useDispatch();
  const { extraSecond, score, currentExponent } = useSelector(
    matrixStatusSelector,
  );
  const { countDownSecond, minCostTime, bestScore, isPaused } = useSelector(
    statusSelector,
  );
  const { gameMode, goalExponent } = useSelector(settingSelector);

  const timeString = numeral(START_TIME - countDownSecond).format('00:00');

  const firstLabel =
    gameMode == GameMode.Standard ? `Score:\n${score}` : `Time:\n${timeString}`;

  const secondLabel =
    gameMode == GameMode.Standard
      ? `Best:\n${bestScore}`
      : `Best:\n${minCostTime}`;

  const isEnding = useSelector(isEndingSelector);

  useEffect(() => {
    if (isEnding || isPaused || gameMode == GameMode.Standard) {
      return;
    }
    const countSecond = 1;
    const interval = setInterval(() => {
      dispatch(countDownAction(countSecond));
    }, countSecond * 1000);
    return () => clearInterval(interval);
  }, [isEnding, isPaused, gameMode]);

  return (
    <Row xs={2} sm={1} as={Container} className={styles.container}>
      <Col xs={{ span: 5 }}>{firstLabel}</Col>
      <Col xs={{ span: 5 }}>{secondLabel}</Col>
      <Col xs={{ span: 12 }}>
        <ProgressBar
          now={
            gameMode == GameMode.Standard
              ? ((currentExponent - 1) / (goalExponent - 1)) * 100
              : ((countDownSecond + extraSecond) / START_TIME) * 100
          }
          animated
          variant="danger"
          className="d-flex d-sm-none"
        />
        <CircularProgressbar
          value={
            gameMode == GameMode.Standard
              ? currentExponent
              : countDownSecond + extraSecond
          }
          maxValue={gameMode == GameMode.Standard ? goalExponent : 30}
          minValue={1}
          strokeWidth={15}
          text={
            gameMode == GameMode.Standard
              ? `${Math.pow(2, currentExponent)}`
              : `${countDownSecond + extraSecond}s`
          }
          classes={{
            ...CircularProgressbar.defaultProps.classes,
            path: `${styles.circularProgressingPath} ${CircularProgressbar.defaultProps.classes.path}`,
            trail: `${styles.circularProgressingTrail} ${CircularProgressbar.defaultProps.classes.trail}`,
            text: `${styles.circularProgressingText} ${CircularProgressbar.defaultProps.classes.text}`,
          }}
          className="d-none d-sm-flex"
        />
      </Col>
    </Row>
  );
};

export default InfoBar;
