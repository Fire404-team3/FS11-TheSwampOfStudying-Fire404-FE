import { Link } from 'react-router';
import clsx from 'clsx';
import arrow from '@/assets/ic_arrow_right.svg';
import styles from './LinkButton.module.css';

export function LinkButton({ to, children, className, onClick }) {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(e)
    }
  }
  return (
    <Link to={to} className={clsx(styles.linkButton, className)} onClick={handleClick}>
      {children}
      <img src={arrow} alt="화살표" />
    </Link>
  );
}
