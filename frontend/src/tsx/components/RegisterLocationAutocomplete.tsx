import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import loadGoogleMapsApiClient from '../../../../lib/googleApiClient';

interface RegisterLocationAutocompleteProps {
    onSelect: (location: string) => void;
    onLocationChange: (location: string) => void;
    selectedLocation: string;
} 

const RegisterLocationAutocomplete: React.FC<RegisterLocationAutocompleteProps> = ({ onSelect, onLocationChange }) => {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<string[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, newInputValue: string) => {
        setInputValue(newInputValue);
        // Here, you can call the onLocationChange callback
        onLocationChange(newInputValue);
    };

    useEffect(() => {
        let active = true;

        if (!inputValue || inputValue.trim().length <= 3) {
            return undefined;
        }

        const fetchSuggestions = async () => {
            const google = await loadGoogleMapsApiClient();

            const autocompleteService = new google.maps.places.AutocompleteService();
            autocompleteService.getPlacePredictions(
                {
                    input: inputValue,
                    componentRestrictions: {
                        country: 'es', // 'es' is the country code for Spain
                    },
                },
                (predictions: google.maps.places.AutocompletePrediction[], status: google.maps.places.PlacesServiceStatus) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK && active) {
                        setOptions(predictions.map((prediction) => prediction.description));
                    }
                }
            );
        };

        fetchSuggestions();

        return () => {
            active = false;
        };
    }, [inputValue]);

    return (
        <Autocomplete
            id="location-autocomplete"
            freeSolo
            options={options}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            onSelect={(event, newValue) => {
                if (newValue) {
                    onSelect(newValue);
                    onLocationChange(newValue);
                    // You don't need to set the formData location here
                }
            }}
            renderInput={(params) => 
                <TextField {...params} 
                    autoComplete="given-name"
                    name="address"
                    fullWidth
                    id="address"
                    label="Direccion"
                    autoFocus
                />}
            style={{ width: "100%" }}
            fullWidth
        />
    );
};

export default RegisterLocationAutocomplete;
