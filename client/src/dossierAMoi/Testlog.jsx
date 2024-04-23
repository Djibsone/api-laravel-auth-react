// import React, { useEffect, useState } from 'react';
// import $ from 'jquery';
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';
// import '../test.css';

// const Form = () => {
//   const navigate = useNavigate();
//   const [showLoginForm, setShowLoginForm] = useState(true);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     fullname: '',
//   });

//   useEffect(() => {
//     const showLoginForm = () => {
//       $('.loginMsg').removeClass('visibility');
//       $('.frontbox').removeClass('moving');
//       $('.signupMsg').addClass('visibility');
//       $('.signup').addClass('hide');
//       $('.login').removeClass('hide');
//       setShowLoginForm(true);
//     };

//     const showSignupForm = () => {
//       $('.loginMsg').addClass('visibility');
//       $('.frontbox').addClass('moving');
//       $('.signupMsg').removeClass('visibility');
//       $('.signup').removeClass('hide');
//       $('.login').addClass('hide');
//       setShowLoginForm(false);
//     };

//     // Au chargement de la page, afficher le formulaire de connexion
//     showLoginForm();

//     // Lorsque vous cliquez sur "LOG IN", afficher le formulaire de connexion
//     $('#switch2').on('click', showLoginForm);

//     // Lorsque vous cliquez sur "Sign Up", afficher le formulaire d'inscription
//     $('#switch1').on('click', showSignupForm);

//     // Déclencher un clic automatique sur "Sign Up" après un certain délai
//     setTimeout(showSignupForm, 1000);

//     // Déclencher un clic automatique sur "LOG IN" après un certain délai
//     setTimeout(showLoginForm, 3000);

//     // Nettoyage des événements lorsque le composant est démonté
//     return () => {
//       $('#switch2').off('click', showLoginForm);
//       $('#switch1').off('click', showSignupForm);
//     };
//   }, []); // Le tableau vide en tant que deuxième argument signifie que cet effet ne s'exécute qu'une seule fois après le rendu initial

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const [validationErrors, setValidationErrors] = useState({});

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/users/login', {
//         email: formData.email,
//         password: formData.password,
//       });

//       const token = response.data.authorisation.token;

//       localStorage.setItem('token', token);

//       Swal.fire({
//         icon: 'success',
//         title: 'Login Successful',
//         text: 'Welcome back!',
//       }).then(() => {
//         navigate("/dashboard");
//       });
//     } catch (error) {
//         if (error.response && error.response.status === 401) {
//             Swal.fire({
//                 icon: "error",
//                 title: "Login Failed",
//                 text: "Invalid email or password. Please try again.",
//             });
//         } else {
//             const responseData = error.response.data;
//             setValidationErrors(responseData);
//             if (responseData) {
//                 setValidationErrors(responseData);
//             } else {
//                 Swal.fire({
//                     icon: "error",
//                     title: "Error",
//                     text: responseData || "Registration failed.",
//                 });
//             }
//         }
//     }
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/users/register', {
//         email: formData.email,
//         password: formData.password,
//         name: formData.fullname,
//       });
  
//       if (response.status === 200) {
//         setValidationErrors({});
//         Swal.fire({
//           icon: 'success',
//           title: 'Success',
//           text: 'Registration successful.',
//         }).then(() => {
//           navigate("/form");
//         });
//       } else {
//         const responseData = response.data;
//         setValidationErrors(responseData);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: responseData.message || 'Registration failed.',
//         });    
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'An error occurred during registration.',
//       });
//     }
//   }; 

//   return (
//     <div className="container">
//       <div className="backbox">
//         <div className="loginMsg">
//           <div className="textcontent">
//             <p className="title">Don't have an account?</p>
//             <p>Sign up to save all your graph.</p>
//             <button id="switch1">Sign Up</button>
//           </div>
//         </div>
//         <div className="signupMsg visibility">
//             <div className="textcontent">
//                 <p className="title">Have an account?</p>
//                 <p>Log in to see all your collection.</p>
//                 <button id="switch2">LOG IN</button>
//             </div>
//         </div>
//       </div>
//       <div className="frontbox">
//         <div className={showLoginForm ? 'login' : 'login hide'}>
//             <h2>LOG IN</h2>
//             <div className="form-outline mb-4">
//                 <input type="text" name="email" placeholder="Enter Email" className="form-control" onChange={handleChange} />
//                 {validationErrors.email && <span className="text-danger">{validationErrors.email[0]}</span>}
//             </div>
//             <div className="form-outline mb-4">
//                 <input type="password" name="password" placeholder="Enter Password" className="form-control" onChange={handleChange} />
//                 {validationErrors.password && <span className="text-danger">{validationErrors.password[0]}</span>}
//             </div>
//             <p>FORGET PASSWORD?</p>
//             <button onClick={handleLogin}>LOG IN</button>
//         </div>
//         <div className={!showLoginForm ? 'signup' : 'signup hide'}>
//           <h2>SIGN UP</h2>
//           <div className="form-outline mb-4">
//                 <input type="text" name="fullname" placeholder="Enter Name" className="form-control" onChange={handleChange} />
//                 {validationErrors.name && <span className="text-danger">{validationErrors.name[0]}</span>}
//             </div>
//             <div className="form-outline mb-4">
//                 <input type="email" name="email" placeholder="Enter Email" className="form-control" onChange={handleChange} />
//                 {validationErrors.email && <span className="text-danger">{validationErrors.email[0]}</span>}
//             </div>
//             <div className="form-outline mb-4">
//                 <input type="password" name="password" placeholder="Enter Password" className="form-control" onChange={handleChange} />
//                 {validationErrors.password && <span className="text-danger">{validationErrors.password[0]}</span>}
//             </div>
//           <button onClick={handleSignup}>SIGN UP</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Form;

<style>
{`
.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: end;
  align-items: center;
  background-color: #f0f0f0;
  padding: 10px;
}

.link {
  text-decoration: none;
  color: #333;
  margin: 0 10px;
  font-weight: bold;
}

.main-title {
  color: #007bff;
}

.gradient-custom-3 {
  /* fallback for old browsers */
  background: #84fab0;
  
  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to right, rgba(132, 250, 176, 0.5), rgba(143, 211, 244, 0.5));
  
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right, rgba(132, 250, 176, 0.5), rgba(143, 211, 244, 0.5))
  }
  .gradient-custom-4 {
  /* fallback for old browsers */
  background: #84fab0;
  
  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1));
  
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1))
}
`}
</style>
