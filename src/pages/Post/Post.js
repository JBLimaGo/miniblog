import styles from './Post.module.css';

// hooks
import { useParams } from "react-router-dom"; 
import { useFetchDocuments } from '../../hooks/UseFetchDocuments';

const Post = () => {
    const { id } = useParams();
    const { documents: post, loading } = useFetchDocuments("posts", id);

   // console.log(post); // Verifique o conteúdo do post
    return (
        <div className={styles.post_container}>
            {loading && <p>Carregando post...</p>}    
            {post && (
                <>
                    <h1>{post.title}</h1>
                    <img src={post.image} alt={post.title} className={styles.post_image}></img>
                    <p>{post.body}</p>
                    <h3>Este post trata sobre:</h3>
                    <div className={styles.tags}>
                        {post.tags && post.tags.length > 0 ? (
                            post.tags.map((tags) => (
                                <p key={tags}>
                                    <span>#</span>
                                    {tags}     
                                </p>
                            ))
                        ) : (
                            <p>Sem tags disponíveis.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Post;