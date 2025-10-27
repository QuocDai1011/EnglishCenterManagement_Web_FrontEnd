import { Header } from '../component';
import Footer from '../component/Footer';

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="content">{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
