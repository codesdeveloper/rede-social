import { auth } from './firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";



function Header(props) {

    function abrirModalCriarConta(e) {
        e.preventDefault();
        document.querySelector(".modalCriarConta").style.display = "block";
    }

    function closeModalCriar() {
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


    return (
        <div className='header'>

            <div className="modalCriarConta">
                <div className="formCriarConta">
                    <div onClick={(e) => closeModalCriar()} className="closeModalCriar">X</div>
                    <h2>Criar Conta</h2>
                    <form onSubmit={(e) => criarConta(e)}>
                        <input id="userEmail" type='text' placeholder="Seu e-mail..." />
                        <input id="userName" type='text' placeholder="Seu nome de usuario..." />
                        <input id="userPass" type='password' placeholder="Sua senha..." />
                        <button type='submit'>Criar conta!</button>
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
                        <a href='#'>Postar!</a>
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