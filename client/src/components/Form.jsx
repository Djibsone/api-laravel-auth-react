import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import $ from 'jquery';
import axios from 'axios';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const Form = () => {
  const navigate = useNavigate();
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullname: '',
  });

  useEffect(() => {
    const showLoginForm = () => {
      $('.loginMsg').removeClass('visibility');
      $('.frontbox').removeClass('moving');
      $('.signupMsg').addClass('visibility');
      $('.signup').addClass('hide');
      $('.login').removeClass('hide');
      setShowLoginForm(true);
    };

    const showSignupForm = () => {
      $('.loginMsg').addClass('visibility');
      $('.frontbox').addClass('moving');
      $('.signupMsg').removeClass('visibility');
      $('.signup').removeClass('hide');
      $('.login').addClass('hide');
      setShowLoginForm(false);
    };

    // Au chargement de la page, afficher le formulaire de connexion
    showLoginForm();

    // Lorsque vous cliquez sur "LOG IN", afficher le formulaire de connexion
    $('#switch2').on('click', showLoginForm);

    // Lorsque vous cliquez sur "Sign Up", afficher le formulaire d'inscription
    $('#switch1').on('click', showSignupForm);

    // Déclencher un clic automatique sur "Sign Up" après un certain délai
    setTimeout(showSignupForm, 1000);

    // Déclencher un clic automatique sur "LOG IN" après un certain délai
    setTimeout(showLoginForm, 3000);

    // Nettoyage des événements lorsque le composant est démonté
    return () => {
      $('#switch2').off('click', showLoginForm);
      $('#switch1').off('click', showSignupForm);
    };
  }, []);

const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const [validationErrors, setValidationErrors] = useState({});

// const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//         const response = await axios.post('http://127.0.0.1:8000/api/users/login', {
//             email: formData.email,
//             password: formData.password,
//         });

//         if (response && response.data && response.data.authorisation && response.data.authorisation.token) {
//             const token = response.data.authorisation.token;

//             localStorage.setItem('token', token);

//             Swal.fire({
//                 icon: 'success',
//                 title: 'Login Successful',
//                 text: 'Welcome back!',
//             }).then(() => {
//                 navigate("/dashboard");
//             });
//         } else {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error',
//                 text: 'Invalid response format.',
//             });
//         }
//     } catch (error) {
//         console.log(error); // Affichez l'erreur dans la console pour le débogage
//         if (error.response && error.response.status === 422) {
//             Swal.fire({
//                 icon: "error",
//                 title: "Login Failed",
//                 text: "Invalid email or password. Please try again.",
//             });
//         } else {
//             const responseData = error.response ? error.response.data : 'An error occurred during login.';
//             Swal.fire({
//                 icon: "error",
//                 title: "Error",
//                 text: responseData,
//             });
//         }
//     }
// };

const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users/login', {
        email: formData.email,
        password: formData.password,
      });

      const token = response.data.authorisation.token;

      localStorage.setItem('token', token);

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'Welcome back!',
      }).then(() => {
        navigate("/dashboard");
      });
    } catch (error) {
        if (error.response && error.response.status === 401) {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Invalid email or password. Please try again.",
            });
        } else {
            const responseData = error.response.data;
            setValidationErrors(responseData);
            if (responseData) {
                setValidationErrors(responseData);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: responseData || "Registration failed.",
                });
            }
        }
    }
};

const handleSignup = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/users/register', {
            email: formData.email,
            password: formData.password,
            name: formData.fullname,
        });

        if (response && response.status === 200) {
            setValidationErrors({});
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Registration successful.',
            }).then(() => {
                navigate("/form");
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: response.data.message || 'Registration failed.',
            });
        }
    } catch (error) {
        console.log(error); // Affichez l'erreur dans la console pour le débogage
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred during registration.',
        });
    }
};

return (
    <div className="container">
      <div className="backbox">
        <div className="loginMsg">
          <div className="textcontent">
            <p className="title">Don't have an account?</p>
            <p>Sign up to save all your graph.</p>
            <button id="switch1" onClick={() => setShowLoginForm(false)}>Sign Up</button>
          </div>
        </div>
        <div className="signupMsg visibility">
          <div className="textcontent">
            <p className="title">Have an account?</p>
            <p>Log in to see all your collection.</p>
            <button id="switch2" onClick={() => setShowLoginForm(true)}>LOG IN</button>
          </div>
        </div>
      </div>
      <div className="frontbox">
        {showLoginForm ? (
          <LoginForm
            handleChange={handleChange}
            validationErrors={validationErrors}
            handleLogin={handleLogin}
          />
        ) : (
          <SignupForm
            handleChange={handleChange}
            validationErrors={validationErrors}
            handleSignup={handleSignup}
          />
        )}
      </div>
    </div>
  );
};

export default Form;
