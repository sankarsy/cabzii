import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        mobile: '',
        password: ''
    })

    const handlechange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleregister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('')
        try {
            const response = await axios.post('http://localhost:8000/userCreate', user)
            if (response.data.status === 1) {
                navigate('/login');
            }
            else {
                setError(response.data.message);
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='container'>
            <p>Register</p>
            <form onSubmit={handleregister} >
                <div class="form-group col col-md-3 ">
                    <label for="exampleInputEmail1">First Name</label>
                    <input
                        class="form-control"
                        type="text"
                        name='firstname'
                        value={user.firstname}
                        onChange={(e) => handlechange(e)}
                    />

                    <label for="exampleInputEmail1">last Name</label>
                    <input
                        class="form-control"
                        type="text"
                        name='lastname'
                        value={user.lastname}
                        onChange={(e) => handlechange(e)}
                    />

                    <label for="exampleInputEmail1">mobile</label>
                    <input
                        class="form-control"
                        type="text"
                        name='mobile'
                        value={user.mobile}
                        onChange={(e) => handlechange(e)}
                    />

                    <label for="exampleInputEmail1">password</label>
                    <input
                        class="form-control"
                        type="text"
                        name='password'
                        value={user.password}
                        onChange={(e) => handlechange(e)}
                    />

                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" className="btn btn-primary mt-4">
                    {loading ? 'Loading...' : 'Register'}
                </button>
            </form>
        </div>
    )
}

export default Register