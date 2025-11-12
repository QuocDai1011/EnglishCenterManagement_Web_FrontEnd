import { NavLink } from 'react-router-dom';
import styles from './LinkItem.module.scss';
function LinkItem({ to, icon, label }) {
    return (
        <NavLink to={to} className={styles.LinkItem}>
            {icon && <img className={styles.LinkItem__icon} src={icon} alt={label} />}
            <span className={styles.LinkItem__label}>{label}</span>
        </NavLink>
    );
}
export default LinkItem;
