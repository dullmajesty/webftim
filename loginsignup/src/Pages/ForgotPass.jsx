import { Container, Box, Paper, TextField, Button, Typography, Link } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom"; // Importing RouterLink alias
import supabase from '../Services/Supabase';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleResetPassword = async () => {
        try {
            const { data, error } = await supabase.auth.resetPasswordForEmail(email);

            if (error) {
                setErrorMessage(error.message);
            } else {
                setIsSuccess(true);
            }
        } catch (error) {
            setErrorMessage("Something went wrong");
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Container maxWidth="xs" component={Paper} sx={{
                p: 1,
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '27%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
            }}>
                <Typography variant="h6" sx={{ p: 1 }}> Forgot Password </Typography>
                {isSuccess ? (
                    <Typography variant="body1" sx={{ p: 1 }}>
                        Please check your email for password reset instructions.
                    </Typography>
                ) : (
                    <>
                        <Typography variant="body1" sx={{ p: 1 }}>
                            Enter your email address and we'll send you a link to reset your password.
                        </Typography>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ p: 1 }}
                        />
                        {errorMessage && (
                            <Typography color="error" align="center" sx={{ p: 1 }}>
                                {errorMessage}
                            </Typography>
                        )}
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleResetPassword}
                            sx={{ p: 1, backgroundColor: 'black' }}
                        >
                            Reset Password
                        </Button>
                    </>
                )}
                <Typography variant="body2" sx={{ p: 1 }}>
                    {/* Using RouterLink for navigation */}
                    <Link component={RouterLink} to="/" underline="hover">Back to Login</Link>
                </Typography>
            </Container>
        </Box>
    );
}
