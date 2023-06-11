import './styles.css';
import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

function Main() {
  const txt = "Shared-Time-Table";
  const [text, setText] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    const Interval = setInterval(() => {
      setText(text + txt[count]);
      setCount(count + 1);
    }, 300);
    if (count === txt.length) {
      clearInterval(Interval);
    }
    return () => clearInterval(Interval);
  })


  return (
    <div className="Main">
      <Header />
      <div className="container">
        <Sidebar />
        <div className="body">
        <div className="typing">
          {text}
        </div>
        </div>

      </div>
    </div>
  );
}

export default Main;