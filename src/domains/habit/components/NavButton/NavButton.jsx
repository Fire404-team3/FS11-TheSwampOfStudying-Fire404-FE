import styles from './navButton.module.css';
import { IoIosArrowForward } from 'react-icons/io';

function navButton() {
  return (
    <div className={styles.navButtonContainer}>
      <div className={styles.foucsBtnContainer}>
        <button className={styles.foucsBtn}>오늘의 집중</button>
        <IoIosArrowForward className={styles.foucsIcon} />
      </div>

      <div>
        <button>홈</button>
        <IoIosArrowForward />
      </div>
    </div>
  );
}

export default navButton;
