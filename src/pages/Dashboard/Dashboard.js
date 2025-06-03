import style from './Dashboard.module.css';

import { Link } from 'react-router-dom';

// hooks
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocument } from '../../hooks/useFetchDocument';

const Dashboard = () => {
  const {user} = useAuthValue()
  const uid = user.uid

  const { documents: posts, loading } = useFetchDocument("posts", null, uid)

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Gerencie os seus posts</p>
      {posts && posts.length === 0 ? (
        <div className={style.noposts}>
          <p> Não foram encontrados posts </p>
          <Link to="/posts/create" className="btn"> Criar primeiro post </Link>
        </div>
      ) : (
        <div>
            <p>Tem posts!</p>
        </div>
      )}

      {posts && posts.map((post) => (
        <div key={post.id}> <h3>{post.title}</h3></div> 
      ))}
    </div>
  )
}

export default Dashboard