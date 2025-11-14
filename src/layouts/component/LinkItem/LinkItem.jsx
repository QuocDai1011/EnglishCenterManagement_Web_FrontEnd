import { NavLink } from 'react-router-dom';
import styles from './LinkItem.module.scss';
function LinkItem({ to, icon, label }) {
    return (
        <NavLink to={to} className={styles.LinkItem}>
            {icon && (
                <div className={styles.LinkItem__icon}>
                    <img src={icon} alt={label} />
                </div>
            )}
            <span className={styles.LinkItem__label}>{label}</span>
        </NavLink>
    );
}
export default LinkItem;
