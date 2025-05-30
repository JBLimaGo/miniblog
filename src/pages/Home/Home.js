//CSS
import styles from "./Home.module.css";

// hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const [query, setQuery] = useState([]);
  const [posts] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${query}`);
  };

  return (
    <div className={styles.home}>
      <h1>Bem-vindo ao MiniBlog - posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          type="text"
          placeholder="Pesquisar posts"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        <h1>Posts recentes</h1>
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não há posts cadastrados</p>
            <Link to="/posts/create" className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
