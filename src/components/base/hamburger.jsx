import styles from './hamburger.module.scss';
import Overlay from './overlay';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Hamberger() {
  const [menuIsActive, setMenuIsActive] = useState(null);

  return (
    <>
      <motion.button
        style={{position: 'relative'}}
        onClick={() => setMenuIsActive(!menuIsActive)}
        className={`${menuIsActive ? styles.buttonActive : ''}`}
      >
        <div className={`${styles.hamburger}`}>
        </div>
      </motion.button>
      <Overlay menuIsActive={menuIsActive} />
    </>
  )
}

