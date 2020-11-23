import { initMatrix } from 'actions/matrixAction';
import { popupSettingDialog } from 'actions/settingAction';
import { settingSelector } from 'hooks/useSelector';
import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { FaCog, FaRedo, FaTrophy } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import styles from './ControlBar.module.scss';

const ControlBar: React.FC = () => {
  const dispatch = useDispatch();
  const { spaceSideCount } = useSelector(settingSelector);
  return (
    <Container className={styles.container}>
      <Button onClick={() => dispatch(initMatrix(Math.pow(spaceSideCount, 2)))}>
        <FaRedo />
        <h5>Restart</h5>
      </Button>
      {/* TODO: 排行榜 */}
      <Button disabled>
        <FaTrophy />
        <h5>Rank</h5>
      </Button>
      <Button onClick={() => dispatch(popupSettingDialog)}>
        <FaCog />
        <h5>Setting</h5>
      </Button>
    </Container>
  );
};

export default ControlBar;
