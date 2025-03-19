import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Resetpassword() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [forgot, setforgot] = useState({mobile:"",newpassword:"",confirmpassword:""})

    const handlechange = (e) => {
        setforgot({ ...forgot, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:8000/resetpassword', forgot);
            if (response.data.status === 1) {
                // localStorage.setItem('loggedIn', 'true');
                // localStorage.setItem('token', response.data.token);
                // setIsLoggedIn(true);
                navigate('/login');
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>Forgotpassword
            <main id="content" role="main" class="w-full max-w-md mx-auto p-8">
                <div class="mt-7 bg-white  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-4 sm:p-7">
                        {/* <div class="text-center">
                            <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">Forgot password?</h1>
                            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Remember your password?

                                <Link to={'/login'}>
                                    <li className="nav-item">
                                        <a className="btn" aria-current="page">
                                            login
                                        </a>
                                    </li>
                                </Link>
                            </p>
                        </div> */}

                        <div class="mt-2">
                            <form onSubmit={handleSubmit} >
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Enter number</label>
                                    <input
                                        class="form-control"
                                        type="text"
                                        name='mobile'
                                        value={forgot.mobile}
                                        onChange={(e) => handlechange(e)}
                                    />

                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Password</label>
                                    <input
                                        class="form-control"
                                        type="text"
                                        name='newpassword'
                                        value={forgot.password}
                                        onChange={(e) => handlechange(e)}
                                    />

                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Confirm Password</label>
                                    <input
                                        class="form-control"
                                        type="text"
                                        name='confirmpassword'
                                        value={forgot.confirmpassword}
                                        onChange={(e) => handlechange(e)}
                                    />

                                </div>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                <button type="submit" className="btn btn-primary mt-4">
                                    {loading ? 'Loading...' : 'Confirm'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>


            </main>
        </div>
    )
}

export default Resetpassword