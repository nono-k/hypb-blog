import styles from './overlay.module.scss';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const anim = {
  initial: {
    opacity: 0
  },
  open: (i) => ({
    opacity: 1,
    transition: {duration: 0, delay: 0.02 * i}
  }),
  closed: (i) => ({
    opacity: 0,
    transition: {duration: 0, delay: 0.02 * i}
  })
}

export default function Overlay({ menuIsActive }) {
  console.log(menuIsActive);
  const [ screenSize, setScreenSize ] = useState({x: null, y: null});

  const shuffle = (a) =>{
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      setScreenSize({ x: innerWidth, y: innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getSquare = () => {
    if (!screenSize.x || !screenSize.y) return null;
    const blockSize = screenSize.x * 0.05;
    const amountOfBlocks = Math.ceil(screenSize.y / blockSize);
    const delays = shuffle([...Array(amountOfBlocks)].map((_, i) => i));
    return delays.map((randomDelay, i) => {
      return (
        <motion.div
          key={i}
          className={styles.square}
          variants={anim}
          initial="initial"
          animate={menuIsActive ? 'open' : 'closed'}
          custom={randomDelay}
        />
      )
    })
  }

  return (
    <>
      <div className={`${styles.squareContainer}
        ${menuIsActive ? styles.active : ''}`}>
        {[...Array(20)].map((_, index) => {
          return <div key={index} className={styles.column}>{getSquare()}</div>
        })}
      </div>
      {/* {menuIsActive ? */}
        <div className={`${styles.menuContainer}
          ${menuIsActive ? styles.active : ''}`}>
          <div className={styles.menuInner}>
            <ul className={`${styles.leftList}`}>
              <li>
                <a className={styles.menuLink} href="/">
                  <svg viewport="0 0 210 60" style={{transitionDelay: '0.1s'}} className="for-large"><text x="0" y="100">home</text></svg>
                  <p className='for-mobile'>home</p>
                </a>
              </li>
              <li>
                <a className={styles.menuLink} href="/articles">
                  <svg viewport="0 0 210 60" style={{transitionDelay: '0.2s'}} className="for-large"><text x="0" y="100">articles</text></svg>
                  <p className='for-mobile'>articles</p>
                </a>
              </li>
              <li>
                <a className={styles.menuLink} href="/about">
                  <svg viewport="0 0 210 60" style={{transitionDelay: '0.3s'}} className="for-large"><text x="0" y="100">about</text></svg>
                  <p className='for-mobile'>about</p>
                </a>
              </li>
              <li>
                <a className={styles.menuLink} href="/contact">
                  <svg viewport="0 0 210 60" style={{transitionDelay: '0.4s'}} className="for-large"><text x="0" y="100">contact</text></svg>
                  <p className='for-mobile'>contact</p>
                </a>
              </li>
            </ul>
            {/* <div className={styles.searchArea}>
              <div className={styles.searchButton}>
                <SearchButton />
              </div>
            </div> */}
            <ul className={styles.rightList}>
              <li><a href='/site-policy'>サイトポリシー</a></li>
              <li><a href='/privacy-policy'>プライバシーポリシー</a></li>
            </ul>
          </div>
        </div>
    </>
  )
}
