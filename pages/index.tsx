// import './_index.module.scss';
import ControlBar from '@components/ControlBar';
import GamResultModal from '@components/GamResultModal';
import InfoBar from '@components/InfoBar';
import MatrixCubes from '@components/MatrixCubes';
import SettingModal from '@components/SettingModal';
import { goDirectionMatrix, initMatrix } from 'actions/matrixAction';
import { KeyboardEventHandlerProps } from 'definitions/keyCode';
import useKeyEvent from 'hooks/useKeyEvent';
import { settingSelector } from 'hooks/useSelector';
import dynamic from 'next/dynamic';
import * as React from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import styles from './index.module.scss';

const KeyboardEventHandler = dynamic<KeyboardEventHandlerProps>(
  () => import('react-keyboard-event-handler'),
  { ssr: false },
);

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { spaceSideCount } = useSelector(settingSelector);
  React.useEffect(() => {
    dispatch(initMatrix(Math.pow(spaceSideCount, 2)));
  }, []);
  const KeyboardEventHandlerProps = useKeyEvent();
  return (
    <Container className={styles.container}>
      <InfoBar></InfoBar>
      <MatrixCubes />
      <ControlBar />
      <KeyboardEventHandler {...KeyboardEventHandlerProps} />
      <SettingModal />
      <GamResultModal />
    </Container>
  );
};

export default Home;
