 import { Box, Button } from "@chakra-ui/react";

import { CentererBox, LoginApp } from "../modules/wrappers";

import { LoginHeader } from "../modules/components";

export default function SignOptions() {
  return (
      <CentererBox>
        <LoginApp>
          <LoginHeader />

          <Box mt={2} p={4} width="100%" borderWidth="1px" borderRadius="lg">
            <Box paddingY={2} width="100%">
              <Button
                width="100%"
                onClick={(event) => (window.location.href = "/login")}
              >
                Login
              </Button>
            </Box>
            <Box paddingY={2} width="100%">
              <Button
                width="100%"
                onClick={(event) => (window.location.href = "/register")}
                colorScheme="green"
              >
                Cadastrar-se
              </Button>
            </Box>
          </Box>
        </LoginApp>
      </CentererBox>
  );
}
