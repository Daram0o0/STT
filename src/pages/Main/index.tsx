import './styles.css';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

function Main() {
  return (
    <div className="Main">
      <Header />
      <div className="container">
        <Sidebar />
        <div className="body">

        </div>

      </div>
    </div>
  );
}

export default Main;