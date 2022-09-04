import { useEffect, useState } from 'react';
import { auth, storage, db } from './firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { addDoc, disableNetwork, doc, setDoc, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { async } from '@firebase/util';

function Header(props) {

    useEffect(() => {

    }, []);

    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState(null);

    function abrirModalCriarConta(e) {
        e.preventDefault();
        document.querySelector(".modalCriarConta").style.display = "block";
    }

    function abrirModalUpload(e) {
        e.preventDefault();
        document.querySelector(".modalUpload").style.display = "block";
    }

    function fecharModalUpload() {
        document.querySelector(".modalUpload").style.display = "none";
    }

    function fecharModalCriar() {
        document.querySelector(".modalCriarConta").style.display = "none";
    }

    function criarConta(e) {
        e.preventDefault();

        let userName = document.getElementById("userName").value;
        let userEmail = document.getElementById("userEmail").value;
        let userPass = document.getElementById("userPass").value;

        createUserWithEmailAndPassword(auth, userEmail, userPass).then((authUser) => {
            updateProfile(auth.currentUser, {
                displayName: userName
            })
            alert('Conta criada com sucesso')
            document.querySelector(".modalCriarConta").style.display = "none";
        }).catch((erro => {
            alert(erro);
        }));

    }

    function logar(e) {
        e.preventDefault();
        let email = document.getElementById("login-email").value;
        let pass = document.getElementById("login-pass").value;
        signInWithEmailAndPassword(auth, email, pass).then((userAuth) => {
            props.setUser(userAuth.user.displayName);
            alert('Logado com sucesso');
        }).catch((erro) => {
            alert(erro);
        });
    }

    function uploadPost(e) {
        e.preventDefault();
        let titulo = document.getElementById('titulo-upload');
        let prog = document.getElementById('progress-upload');

        const uploadTask = uploadBytesResumable(ref(storage, 'image/' + file.nama), file);

        uploadTask.on('state_changed',
            (snap) => {
                let progIt = Math.round(snap.bytesTransferred / snap.totalBytes) * 100;
                setProgress(prog);
            }, (erro) => {
                alert(erro);
            }, (sucesso) => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    let coll = collection(db, 'post');

                    var setItens = async () => {
                        let resp = await addDoc(coll, {
                            name: 11,
                            titulo: titulo,
                            image: url,
                            userName: props.name,
                            timestamp: new Date()
                        });
                        console.log(resp);
                    };
                    setItens();
                    setProgress(0);
                    setFile(null);
                    alert('Upload concluido com sucesso!');
                    document.getElementById('upload-form').reset();
                });
            });
    }

    return (
        <div className='header'>

            <div className="modalCriarConta">
                <div className="formCriarConta">
                    <div onClick={(e) => fecharModalCriar()} className="closeModalCriar">X</div>
                    <h2>Criar Conta</h2>
                    <form onSubmit={(e) => criarConta(e)}>
                        <input id="userEmail" type='text' placeholder="Seu e-mail..." />
                        <input id="userName" type='text' placeholder="Seu nome de usuario..." />
                        <input id="userPass" type='password' placeholder="Sua senha..." />
                        <button type='submit'>Criar conta!</button>
                    </form>
                </div>
            </div>

            <div className="modalUpload">
                <div className="formUpload">
                    <div onClick={(e) => fecharModalUpload()} className="closeModalUpload">X</div>
                    <h2>Fazer Upload</h2>
                    <form id='upload-form' onSubmit={(e) => uploadPost(e)}>
                        <progress id='progress-upload' value={progress}></progress>
                        <input id="titulo-upload" type='text' placeholder="Nome da sua foto..." />
                        <input onChange={(e) => setFile(e.target.files[0])} type='file' name='file' />
                        <button type='submit'>Postar Arquivo!</button>
                    </form>
                </div>
            </div>


            <div className='logo'>
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png' />
            </div>

            {
                (props.user)
                    ? <div className='use'>
                        <span>Olá, {props.user}</span>
                        <a onClick={(e) => { abrirModalUpload(e) }} href='#'>Postar!</a>
                    </div>
                    : <form onSubmit={(e) => { logar(e) }} className="formLogin">
                        <input id='login-email' type="text" name='user' placeholder='Digite o usuario...' />
                        <input id='login-pass' type='password' name='pass' placeholder='Digite sua senha...' />
                        <button type='submit' name='login'>Enviar</button>
                        <a onClick={(e) => abrirModalCriarConta(e)} href='#'>Criar conta!</a>
                    </form>
            }
        </div>
    );
}

export default Header;