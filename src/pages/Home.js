
import Filter from '../components/Filter';
import GameList from '../components/GameList';
import { useSelector } from 'react-redux';

export default function Home() {
  const filter = useSelector((state) => state.filter);
  return (
    <main className="home_content">
        <h2>{filter}</h2>
        <div className="home_content2">
            <Filter />
            <GameList />
        </div>
        
    </main>
  )
}

// <div className="home_content2">
// <Filter />
// {/* <GameList filter={""} /> */}
// </div>