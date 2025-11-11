import { Header } from '../component';
import NavbarStudent from '../component/NavbarStudent';
import styles from './HeaderAndNavbar.module.scss';
function HeaderAndNavbar({ children }) {
    return (
        <div className={styles.HeaderAndNavbar}>
            <Header className={styles.HeaderAndNavbar__Header} />
            <div className={styles.HeaderAndNavbar__Container}>
                <NavbarStudent className={styles.HeaderAndNavbar__NavbarStudent} />
                <div className={styles.HeaderAndNavbar__Content}>
                    <div className={styles.HeaderAndNavbar__ContentWrapper}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderAndNavbar;
