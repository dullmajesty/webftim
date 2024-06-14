import { useState, useEffect } from 'react';
import { Paper, Box, Avatar, Typography } from "@mui/material";
import { useUser } from "../contexts/UserContext";
import supabase from "../Services/Supabase";

export default function Users() {
    const { user, loading } = useUser();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (loading || !user) return;

            try {
                const { data, error } = await supabase
                    .from('users')
                    .select('*')
                    .eq('email', user.email)
                    .single();

                if (error) {
                    throw error;
                }

                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error.message);
                setError(error);
            }
        };

        fetchUserData();
    }, [user, loading]);

    // Handle loading state and errors
    if (loading) {
        return <div>Loading...</div>; // or a loading indicator
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Display error message
    }

    // Ensure user is defined before rendering user-specific data
    if (!user || !userData) {
        return <div>User data not available.</div>;
    }

    // Render user data once loaded
    return (
        <Paper style={{ padding: '20px', marginTop: '20px' }}>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar 
                    src={userData.profile_picture} 
                    alt={userData.name || 'User'} // Provide default alt text
                    style={{ width: 100, height: 100, marginBottom: '20px' }}
                />
                <Typography variant="h4" style={{ textTransform: 'capitalize', marginBottom: '10px' }}>
                    {userData.name ? `${userData.name}'s Account` : 'User Account'}
                </Typography>
                <Typography variant="h6" color="textSecondary" style={{ marginBottom: '10px' }}>
                    {userData.email}
                </Typography>
                {userData.bio && (
                    <Typography variant="body1" style={{ textAlign: 'center' }}>
                        {userData.bio}
                    </Typography>
                )}
            </Box>
        </Paper>
    );
}
