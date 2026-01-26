import { Link } from 'react-router';
import clsx from 'clsx';
import arrow from '@/assets/ic_arrow_right.svg';
import styles from './LinkButton.module.css';

export function LinkButton({ to, children, className }) {
  return (
    <Link to={to} className={clsx(styles.linkButton, className)}>
      {children}
      <img src={arrow} alt="화살표" />
    </Link>
  );
}
