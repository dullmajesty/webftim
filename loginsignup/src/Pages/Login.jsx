import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from '../Services/Supabase';
import LoginIcon from "@mui/icons-material/Login";
import placeholderImage from '../assets/loginlogo.jpg';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Something went wrong");

    const navigate = useNavigate();

    const validate = () => {
        if (email.trim() === "" || password.trim() === "") {
            setIsError(true);
            setErrorMessage("All fields required");
            return false;
        }
        return true;
    }

    const login = async () => {
        if (!validate()) return;

        let { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if (error !== null) {
            setIsError(true);
            setErrorMessage(error.message);
            return
        }

        if (data !== null) {
            navigate("/dashboard");
        }
    }

    return (
        <div style={{ width: 1440, height: 1024, background: '#009DD1', position: 'relative' }}>
            {/* Blue gradient background */}
            <div style={{ width: 636, height: 607, left: 431, top: 201, position: 'absolute', background: 'linear-gradient(180deg, white 0%, #15609F 87%)', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}></div>
            {/* White login box */}
            <div style={{ width: 636, height: 607, left: 419, top: 191, position: 'relative', background: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
                {/* Content inside the white box */}
                <div style={{ padding: '180px' }}>
                    {/* Login heading */}
                    <div style={{ fontSize: '30px', fontFamily: 'Roboto', fontWeight: '600', color: '#009DD1', marginBottom: '70px', textAlign:'center' }}>Log In</div>
                    {/* Email input */}
                    <div style={{ marginBottom: '20px' }}>
                        <input
                            type="text"
                            style={{ width: '100%', height: '40px', borderRadius: '5px', border: `1px solid ${isError ? 'red' : '#ccc'}`, paddingLeft: '10px' }}
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {isError && <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>All fields required</div>}
                    </div>
                    {/* Password input */}
                    <div style={{ marginBottom: '20px' }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            style={{ width: '100%', height: '40px', borderRadius: '5px', border: `1px solid ${isError ? 'red' : '#ccc'}`, paddingLeft: '10px' }}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {isError && <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>All fields required</div>}
                    </div>
                    {/* Log in button */}
                    <div style={{ marginBottom: '20px' }}>
                        <button
                            style={{ width: '105%', height: '40px', borderRadius: '5px', background: '#15609F', color: 'white', border: 'none', cursor: 'pointer' }}
                            onClick={login}
                        >
                            Log in
                            <LoginIcon style={{ marginLeft: '5px', }} />
                        </button>
                    </div>
                    {/* Forgot password link */}
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <Link to="/forgot-password" style={{ textDecoration: 'none', color: 'black', fontSize: '12px' }}>Forgot Password?</Link>
                    </div>
                    {/* Error message */}
                    {isError &&
                        <div style={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>{errorMessage}</div>
                    }
                </div>
            </div>
            {/* Placeholder image */}
            <img style={{ width: '340px', height: '132px', left: '567px', top: '250px', position: 'absolute' }} src={placeholderImage} alt="Placeholder" />
        </div>
    );
}
