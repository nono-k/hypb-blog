import styles from './hamburger.module.scss';
import Overlay from './overlay';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Hamberger() {
  const [menuIsActive, setMenuIsActive] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 549);
    }
    handleResize();
    window.addEventListener('risize', handleResize);
    return () => window.removeEventListener('risize', handleResize);
  }, []);

  return (
    <>
      <motion.button
        style={{position: 'relative'}}
        onClick={() => setMenuIsActive(!menuIsActive)}
        className={`${menuIsActive ? styles.buttonActive : ''}`}
      >
        <div className={`${styles.hamburger}`}>
          {/* <div className={styles.bounds}></div> */}
        </div>
      </motion.button>
      <Overlay menuIsActive={menuIsActive} />
    </>
  )
}

