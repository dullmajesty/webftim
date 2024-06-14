import { Container, Paper, Typography, Box } from "@mui/material";

export default function ConfirmationPage() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Container maxWidth="xs" component={Paper} sx={{
                p: 4,
                textAlign: 'center',
            }}>
                <Typography variant="h6" sx={{ mb: 2 }}> Confirmation Email Sent </Typography>
                <Typography variant="body1">
                    Please check your email for confirmation. 
                </Typography>
            </Container>
        </Box>
    );
}
