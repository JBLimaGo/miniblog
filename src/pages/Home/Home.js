//CSS
import styles from "./Home.module.css";

// hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocument } from "../../hooks/useFetchDocument";

// components
import PostDetail from "../../components/PostDetail";

const Home = () => {
  const [query, setQuery] = useState([]);
  // const [posts] = useState([]);
  const { documents: posts, loading } = useFetchDocument("posts");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${query}`);
  };

  return (
    <div className={styles.home}>
      <h1>Bem-vindo ao MiniBlog - posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.serch_form}>
        <input
          type="text"
          placeholder="Pesquisar posts"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <p></p>
      <div>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
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
