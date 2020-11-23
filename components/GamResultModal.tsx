import { initMatrix } from 'actions/matrixAction';
import { GameMode } from 'definitions/state';
import {
  matrixDirectiveSelector,
  matrixSelector,
  matrixStatusSelector,
  settingSelector,
  statusSelector,
} from 'hooks/useSelector';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import styles from './GamResultModal.module.scss';

const GamResultModal: React.FC = () => {
  const dispatch = useDispatch();
  const matrix = useSelector(matrixSelector);
  const { extraSecond, currentExponent } = useSelector(matrixStatusSelector);
  const { canDown, canLeft, canRight, canUp } = useSelector(
    matrixDirectiveSelector,
  );
  const { countDownSecond } = useSelector(statusSelector);
  const { goalExponent, gameMode, spaceSideCount } = useSelector(
    settingSelector,
  );
  const isFinished = currentExponent >= goalExponent;
  const isNoStep = !canDown && !canLeft && !canRight && !canUp;
  const isTimeOut =
    extraSecond + countDownSecond <= 0 && gameMode == GameMode.Timer;
  const resultLabel = isFinished
    ? 'Wining!\nYou reach your goal'
    : isNoStep
    ? 'Sorry!\nNo more step'
    : isTimeOut
    ? 'Sorry!\nTime is up'
    : 'Unexpected Error';
  return (
    <Modal
      show={matrix.length > 0 && (isFinished || isNoStep || isTimeOut)}
      centered
      contentClassName={styles.modal_content}
      onHide={() => undefined}>
      <Modal.Body>
        <h2>{resultLabel}</h2>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => dispatch(initMatrix(Math.pow(spaceSideCount, 2)))}>
          Try Again
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GamResultModal;
