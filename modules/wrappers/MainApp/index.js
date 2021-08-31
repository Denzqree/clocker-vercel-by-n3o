import { Box } from "@chakra-ui/react";

import { CentererBox } from "../CentererBox";

export const MainApp = ({ children }) => {
  return (
    <CentererBox>
      <Box minWidth="320px" width="640px">
        {children}
      </Box>
    </CentererBox>
  );
};
