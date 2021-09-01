import {
  Input as InputBase,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";

export const Input = ({ error, label, touched, ...props }) => {
  return (
    <Box>
        <FormControl id={props.name} mt={2} minHeight={10} isRequired>
          <Box display="flex">
            <FormLabel>{label}</FormLabel>
            {touched && (
              <FormHelperText mt={0.5} textColor="#e74c3c">
                {error}
              </FormHelperText>
            )}
          </Box>
          <InputBase {...props} />
        </FormControl>
    </Box>
  );
};
