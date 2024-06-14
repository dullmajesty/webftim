import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function AddPatientDialog({ open, onClose }) {
    const [step, setStep] = useState(1);

    const handleProceed = () => {
        setStep(step + 1);
    };

    const handleClose = () => {
        setStep(1); // Reset to step 1 when closing the dialog
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogContent>
                <Box sx={{ padding: 2 }}>
                    <Box
                        sx={{
                            width: '100%',
                            height: 'auto',
                            background: 'white',
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                            p: 3,
                            borderRadius: 2,
                        }}
                    >
                        <Typography
                            sx={{
                                color: 'black',
                                fontSize: 32,
                                fontFamily: 'Roboto',
                                fontWeight: '700',
                                wordWrap: 'break-word',
                            }}
                        >
                            {step === 1 ? 'Add Patient' : 'Add Patient'}
                        </Typography>
                        <Box
                            sx={{
                                width: '100%',
                                height: 60,
                                background:
                                    'linear-gradient(90deg, #009DD1 24%, #00506B 100%)',
                                my: 2,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                sx={{
                                    color: 'white',
                                    fontSize: 24,
                                    fontFamily: 'Roboto',
                                    fontWeight: '400',
                                    wordWrap: 'break-word',
                                    paddingLeft: 2,
                                }}
                            >
                                {step === 1 ? 'Patient Information' : 'Next-Of-Kin Details'}
                            </Typography>
                        </Box>

                        {step === 1 && (
                            <PatientInformation handleProceed={handleProceed} />
                        )}

                        {step === 2 && (
                            <NextOfKinDetails handleProceed={handleProceed} onClose={handleClose} />
                        )}

                        {/* Common Cancel Button */}
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
}

// Separate components for each step
function PatientInformation({ handleProceed }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Patient Information Fields */}
            <TextField fullWidth variant="outlined" size="small" label="First Name" />
            <TextField fullWidth variant="outlined" size="small" label="Last Name" />
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                select
                label="Sex"
                defaultValue="Male"
            >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
            </TextField>
            <TextField fullWidth variant="outlined" size="small" label="Address" />
            <TextField fullWidth variant="outlined" size="small" label="Telephone Number" />
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                type="date"
                label="Date of Birth"
                InputLabelProps={{ shrink: true }}
            />
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                select
                label="Marital Status"
                defaultValue="Single"
            >
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Married">Married</MenuItem>
                <MenuItem value="Divorced">Divorced</MenuItem>
                <MenuItem value="Widowed">Widowed</MenuItem>
            </TextField>
            
            {/* Proceed Button */}
            <Box
                sx={{
                    width: 133,
                    height: 41,
                    background: '#009DD1',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    borderRadius: 5,
                    mt: 3,
                    textAlign: 'center',
                    lineHeight: '4px',
                    cursor: 'pointer',
                }}
                onClick={handleProceed}
            >
                <Typography
                    sx={{
                        color: 'white',
                        fontSize: 20,
                        fontFamily: 'Roboto',
                        fontWeight: '700',
                        wordWrap: 'break-word',
                        mx: 'auto',
                        margin: '5px'
                        
                    }}
                >
                    Proceed
                </Typography>
            </Box>
        </Box>
    );
}

function NextOfKinDetails({ handleProceed, onClose }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Next-Of-Kin Information Fields */}
            <TextField fullWidth variant="outlined" size="small" label="First Name" />
            <TextField fullWidth variant="outlined" size="small" label="Last Name" />
            <TextField fullWidth variant="outlined" size="small" label="Relationship" />
            <TextField fullWidth variant="outlined" size="small" label="Address" />
            <TextField fullWidth variant="outlined" size="small" label="Telephone Number" />
            
            {/* Local Doctor Referral */}
            <Typography
                sx={{
                    color: 'White',
                    fontSize: 24,
                    fontFamily: 'Roboto',
                    fontWeight: '400',
                    background:
                        'linear-gradient(90deg, #009DD1 24%, #00506B 100%)',
                    wordWrap: 'break-word',
                        width: '100%',
                        height: 60,
                        my: 2,
                        display: 'flex',
                        alignItems: 'center',
                        padding: 2
                }}
            >
                Local Doctor Referral
            </Typography>
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                select
                label="Select the doctor who referred the patient"
            >
                <MenuItem value="Doctor 1">Doctor 1</MenuItem>
                <MenuItem value="Doctor 2">Doctor 2</MenuItem>
                <MenuItem value="Doctor 3">Doctor 3</MenuItem>
            </TextField>
            <Typography
                sx={{ color: 'black', fontSize: 16, mt: 1 }}
            >
                Doctor not listed? <a href="#add-new-doctor" style={{ color: '#009DD1' }}>Click here</a> to add new local doctor
            </Typography>
            
            {/* Proceed Button */}
            <Box
                sx={{
                    width: 135,
                    height: 41,
                    background: '#009DD1',
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    borderRadius: 5,
                    mt: 3,
                    textAlign: 'center',
                    lineHeight: '41px',
                    cursor: 'pointer',
                }}
                onClick={onClose} // Here we use onClose to close the dialog after completing step 2
            >
                <Typography
                    sx={{
                        color: 'white',
                        fontSize: 20,
                        fontFamily: 'Roboto',
                        fontWeight: '700',
                        wordWrap: 'break-word',
                        mx: 'auto',
                        margin: '5px'
                        
                    }}
                >
                    Add Patient
                </Typography>
            </Box>
        </Box>
    );
}