import { db } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { addDoc, collection, getDocs, setDoc, doc, orderBy, query } from 'firebase/firestore/lite';
import { async } from '@firebase/util';
import { useEffect, useState } from "react";
import { clear } from "@testing-library/user-event/dist/clear";

function Post(props) {

    const [coments, setComents] = useState([]);

    useEffect(() => {

        (async () => {
            let doc_post = doc(collection(db, 'post'), props.id);
            let qry = query(collection(doc_post, 'comentarios'), orderBy("data", "desc"));
            let doc_coment = await getDocs(qry);
            setComents(doc_coment.docs.map((m) => {
                return m.data();
            }))

        })();

    }, []);


    function comentar(e, id) {
        e.preventDefault();
        let comment_text = document.getElementById('comment-text' + props.id);
        (async () => {
            try {
                let doc_post = doc(collection(db, 'post'), props.id);
                let doc_coment = doc(collection(doc_post, 'comentarios'));

                await setDoc(doc_coment, {
                    nome: props.user,
                    comentario: comment_text.value,
                    data: new Date()
                })

                comment_text.value = '';
                window.location.href = '/';
                alert('Comentario realizado com sucesso!');
            } catch (erro) {
                alert(erro);
            }

        })();


    }


    return (
        <div className='postSingle'>
            <img src={props.info.image} />
            <p><b>{props.info.userName}: </b>{props.info.titulo}</p>

            <div className="coments">
                <h2>Ultimos comentarios:</h2>

                {
                    coments.map((com) => {
                        return (
                            <p><b>{com.nome}: </b>{com.comentario}</p>
                        )
                    })
                }

            </div>

            {
                (props.user) ?
                    <form onSubmit={(e) => comentar(e)}>
                        <textarea id={'comment-text' + props.id}></textarea>
                        <input type='submit' value='Comentar!' />
                    </form> : ''
            }



        </div>
    );
};

export default Post;