import Slider from 'rc-slider';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { initMatrix } from '../actions/matrixAction';
import { removeSettingDialog, setConfig } from '../actions/settingAction';
import { DialogType } from '../definitions/dialog';
import { GameMode } from '../definitions/state';
import { statusSelector } from '../hooks/useSelector';
import { rootState } from '../utils/store';
import styles from './SettingModal.module.scss';
const modeMarks = {
  [GameMode.Standard]: 'Standard',
  [GameMode.Timer]: 'Timer',
};

const spaceMarks = {
  3: '3*3',
  4: '4*4',
  5: '5*5',
};

const getGoalMark = (i: number) => ({
  [i - 1]: Math.pow(2, i - 1),
  [i]: Math.pow(2, i),
  [i + 1]: Math.pow(2, i + 1),
});

const generateCountMark = {
  1: '1',
  2: '2',
  3: '3',
};

const SettingModal: React.FC = () => {
  const dispatch = useDispatch();
  const setting = useSelector((state: rootState) => state.setting);
  const [gameMode, setGameMode] = useState(setting.gameMode);
  const [spaceSideCount, setSpaceSideCount] = useState(setting.spaceSideCount);
  const [goalExponent, setGoalExponent] = useState(setting.goalExponent);
  const [generateCount, setGenerateCount] = useState(setting.generateCount);
  const { dialogs } = useSelector(statusSelector);

  const onApply = useCallback(() => {
    dispatch(removeSettingDialog);
    dispatch(
      setConfig({
        gameMode,
        spaceSideCount,
        goalExponent,
        generateCount,
      }),
    );
    dispatch(initMatrix(Math.pow(spaceSideCount, 2)));
  }, [gameMode, spaceSideCount, goalExponent, generateCount]);

  const applicable =
    gameMode == setting.gameMode &&
    spaceSideCount == setting.spaceSideCount &&
    goalExponent == setting.goalExponent &&
    generateCount == setting.generateCount;

  useEffect(() => {
    if (
      goalExponent > spaceSideCount + 8 ||
      goalExponent < spaceSideCount + 6
    ) {
      setGoalExponent(spaceSideCount + 7);
    }
  }, [goalExponent, spaceSideCount]);

  return (
    <Modal
      show={dialogs[0] == DialogType.Setting}
      centered
      onHide={() => dispatch(removeSettingDialog)}>
      <Modal.Header>
        <h2>Game Setting</h2>
      </Modal.Header>
      <Modal.Body className={styles.modal_Body}>
        <h3>Mode</h3>
        <Slider
          max={1}
          min={0}
          marks={modeMarks}
          value={gameMode}
          onChange={setGameMode}></Slider>
        <h3>Space</h3>
        <Slider
          max={5}
          min={3}
          marks={spaceMarks}
          value={spaceSideCount}
          onChange={setSpaceSideCount}></Slider>
        <h3>Goal</h3>
        <Slider
          max={spaceSideCount + 8}
          min={spaceSideCount + 6}
          marks={getGoalMark(spaceSideCount + 7)}
          value={goalExponent}
          onChange={setGoalExponent}></Slider>
        <h3>Productivity</h3>
        <Slider
          max={3}
          min={1}
          marks={generateCountMark}
          value={generateCount}
          onChange={setGenerateCount}></Slider>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onApply} disabled={applicable}>
          Apply
        </Button>
        <Button onClick={() => dispatch(removeSettingDialog)}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SettingModal;
