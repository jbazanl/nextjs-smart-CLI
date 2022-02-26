
import { connect } from "react-redux";
import { startLogin } from "../../pages/actions/actions";
import React, {useState} from "react";
import Head from 'next/head'

const Login =(props)=>{
    console.log('props in login ',props);

    let handleChange;
    let handleSubmit;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userState, setUserState] = useState({
        email: '',
        password: ''
    });
    const [showErrorLogin, setShowErrorLogin] = useState(false);

    handleChange = (e) =>{
        let name = e.target.name;
        if (name === 'password'){
            setPassword(e.target.value);
        }
        if (name === 'email'){
            setEmail(e.target.value);
        }
        userState[e.target.name] =  e.target.value;
        setUserState(userState);

    };

    handleSubmit = e => {

        e.preventDefault();

        props.login(userState).then(()=>{
            //props.history.push("/home");
        }).catch(error =>{
            console.log(error);
            //let errorLogin = error.response;
            //let status = errorLogin.status;

            setShowErrorLogin(true);
        });

    };


    let errorLogin;
    if (showErrorLogin) {
        errorLogin = <div className="alert alert-danger" role="alert">
            El usuario o contraseña que ingresaste es incorrecto.
        </div>;
    }


    return (

        <div className="container-fluid ps-md-0">

            <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
                      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
                      crossOrigin="anonymous"/>
            </Head>

            <div className="row g-0">
                <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"/>
                <div className="col-md-8 col-lg-6">
                    <div className="login d-flex align-items-center py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-9 col-lg-8 mx-auto">
                                    <h3 className="login-heading mb-4">Sign in to Itelvox!</h3>

                                    <form onSubmit={handleSubmit}>
                                        <div className="form-floating mb-3">
                                            <input

                                                type="email"
                                                className="form-control"
                                                id="floatingInput"
                                                placeholder="name@entel.pe"
                                                name="email"
                                                onChange={handleChange}
                                                value={email}
                                            />
                                            <label htmlFor="floatingInput">Email address</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="floatingPassword"
                                                placeholder="Password"
                                                name="password"
                                                required
                                                onChange={handleChange}
                                                value={password}
                                            />
                                            <label htmlFor="floatingPassword">Password</label>
                                        </div>

                                        {errorLogin}


                                        <div className="form-check mb-3">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id="rememberPasswordCheck"
                                            />
                                            <label className="form-check-label" htmlFor="rememberPasswordCheck">
                                                Remember password
                                            </label>
                                        </div>

                                        <div className="d-grid">
                                            <button
                                                className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                                                type="submit"
                                                onSubmit={handleSubmit}
                                            >
                                                Sign in
                                            </button>

                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                  .login {
                      min-height: 100vh;
                  }

                  .bg-image {
                      background-image: url('https://debmedia.com/blog/wp-content/uploads/2021/10/21-10-C-C%C3%B3mo-mejorar-la-Experiencia-del-Cliente-en-un-Call-Center-pre.jpg');
                      background-size: cover;
                      background-position: center;
                  }

                  .login-heading {
                      font-weight: 300;
                  }

                  .btn-login {
                      font-size: 0.9rem;
                      letter-spacing: 0.05rem;
                      padding: 0.75rem 1rem;
                  }

            `}</style>

        </div>



    );
};


const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        loginProcessing: state.loginProcessing
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: data => dispatch(startLogin(data))
    };
};



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
