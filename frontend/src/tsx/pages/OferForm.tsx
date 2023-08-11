import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import { debounce } from "@mui/material/utils";

const GOOGLE_MAPS_API_KEY = "1a131e0344644c73a225e9108721c750"; // Replace with your API key

function countCharacters(input) {
    var len = input.value.length;
    return len;
  }
  

function loadScript(src, position, id) {
    if (!position) {
        return;
    }

    const script = document.createElement("script");
    script.setAttribute("async", "");
    script.setAttribute("id", id);
    script.src = src;
    position.appendChild(script);
}

const autocompleteService = { current: null };

interface MainTextMatchedSubstrings {
    offset: number;
    length: number;
}
interface StructuredFormatting {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
    description: string;
    structured_formatting: StructuredFormatting;
}

export default function OferForm() {
    const [value, setValue] = React.useState<PlaceType | null>(null);
    const [inputValue, setInputValue] = React.useState("");
    const [options, setOptions] = React.useState<readonly PlaceType[]>([]);
    const loaded = React.useRef(false);

    if (typeof window !== "undefined" && !loaded.current) {
        if (!document.querySelector("#google-maps")) {
            loadScript(
                `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
                document.querySelector("head"),
                "google-maps"
            );
        }

        loaded.current = true;
    }

    const fetch = React.useMemo(
        () =>
            debounce(
                (
                    request: { input: string },
                    callback: (results?: readonly PlaceType[]) => void
                ) => {
                    (autocompleteService.current as any).getPlacePredictions(
                        request,
                        callback
                    );
                },
                400
            ),
        []
    );

    React.useEffect(() => {
        let active = true;

        if (!autocompleteService.current && (window as any).google) {
            autocompleteService.current = new (
                window as any
            ).google.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return undefined;
        }

        if (inputValue === "") {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
            if (active) {
                let newOptions: readonly PlaceType[] = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <div
                style={{
                    backgroundColor: "#F2F2F2",
                    padding: "20px",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <TextField
          id="filled-basic"
          label="Title"
          variant="filled"
          style={{ width: "51ch", marginBottom: "10px" }}
          inputProps={{ maxLength: 45 }}
          helperText={`${countCharacters.length}/45 caracteres`}
        />
{/* <TextField
          id="filled-basic"
          label="Title"
          variant="filled"
          style={{ width: "51ch", marginBottom: "10px" }}
          inputProps={{ maxLength: 45 }}
          helperText={`${countCharacters(input)}/45 caracteres`}

function countCharacters(input) {
    var len = input.value.length;
    return len;
  }
  /> */}
                <div style={{ display: "flex" }}>
                    <TextField
                        id="filled-basic"
                        label="Filled"
                        variant="filled"
                        style={{ width: "25ch", marginRight: "10px" }}
                    />
                    <TextField
                        id="filled-basic"
                        label="Filled"
                        variant="filled"
                        style={{ width: "25ch" }}
                    />
                </div>
                <div style={{ display: "flex" }}>
                    <Autocomplete
                        id="google-map-demo"
                        sx={{
                            width: "25ch",
                            marginTop: "10px",
                            marginRight: "10px",
                        }}
                        getOptionLabel={(option) =>
                            typeof option === "string" ? option : option.description
                        }
                        filterOptions={(x) => x}
                        options={options}
                        autoComplete
                        includeInputInList
                        filterSelectedOptions
                        value={value}
                        noOptionsText="Sin localizacion"
                        onChange={(event: any, newValue: PlaceType | null) => {
                            setOptions(newValue ? [newValue, ...options] : options);
                            setValue(newValue);
                        }}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Add a location"
                                variant="filled"
                                fullWidth
                            /> // Cambiar el variant a "filled"
                        )}
                        renderOption={(props, option) => {
                            const matches =
                                option.structured_formatting.main_text_matched_substrings || [];

                            const parts = parse(
                                option.structured_formatting.main_text,
                                matches.map((match: any) => [
                                    match.offset,
                                    match.offset + match.length,
                                ])
                            );

                            return (
                                <li {...props}>
                                    <Grid container alignItems="center">
                                        <Grid item sx={{ display: "flex", width: 44 }}>
                                            <LocationOnIcon sx={{ color: "text.secondary" }} />
                                        </Grid>
                                        <Grid
                                            item
                                            sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
                                        >
                                            {parts.map((part, index) => (
                                                <Box
                                                    key={index}
                                                    component="span"
                                                    sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                                                >
                                                    {part.text}
                                                </Box>
                                            ))}
                                            <Typography variant="body2" color="text.secondary">
                                                {option.structured_formatting.secondary_text}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </li>
                            );
                        }}
                    />
                    <TextField
                        id="filled-basic"
                        label="Filled"
                        variant="filled"
                        style={{ width: '25ch', marginBottom: '10px' }}
                        sx={{
                            width: "25ch",
                            marginTop: "10px",
                        }}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <div style={{ visibility: 'hidden', width: '25ch', marginRight: '10px' }}>
                        <TextField
                            id="filled-basic"
                            label="none"
                            variant="filled"
                            style={{ width: '100%' }}
                        />
                    </div>
                    <TextField
                        id="filled-basic"
                        label="Filled"
                        variant="filled"
                        style={{ width: '25ch', marginBottom: '10px' }}
                    />
                </div>
                <TextField
                    id="filled-multiline-flexible"
                    label="Multiline"
                    multiline
                    maxRows={4}
                    variant="filled"
                    inputProps={{ maxLength: 256 }}
                    helperText={`${inputValue.length}/256 caracteres`}
                />
            </div>
        </div>
    );
}
