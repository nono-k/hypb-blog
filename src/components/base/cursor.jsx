import styles from './cursor.module.scss';
import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, transform, animate } from 'framer-motion';

export default function  Cursor() {
  const [isLink, setIsLink] = useState(false);
  const cursorSize = 14;
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  };

  const smoothOptions = { damping: 20, stiffness: 350, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions)
  };

  useEffect(() => {
    const manageMouseMove = e => {
      const { clientX, clientY } = e;
      mouse.x.set(clientX - cursorSize / 2);
      mouse.y.set(clientY - cursorSize / 2);
    };

    window.addEventListener('mousemove', manageMouseMove);

    const links = document.querySelectorAll('a');
    const buttons = document.querySelectorAll('button');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        setIsLink(true);
      })
      link.addEventListener('mouseleave', () => {
        setIsLink(false);
      })
    })
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        setIsLink(true);
      })
      button.addEventListener('mouseleave', () => {
        setIsLink(false);
      })
    })

    return () => {
      window.removeEventListener('mousemove', manageMouseMove);
    }
  }, []);

  return (
    <motion.div
      className={`${styles.cursor} for-large-2 ${isLink && styles.isActive}`}
      style={{
        left: smoothMouse.x,
        top: smoothMouse.y,
      }}
    >
    </motion.div>
  )
}