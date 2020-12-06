import { Box, Heading, Stack } from "@chakra-ui/core";
import React from "react";
import EachContact from "./eachContact";

export default function ContactView({ contacts }) {
  return (
    <Box w="md">
      <Heading>View your stuff here</Heading>
      <Stack pb={12} spacing={10} mt={8}>
        {Object.keys(contacts).map((id) => (
          <EachContact key={id} id={id} contact={contacts[id]} />
        ))}
      </Stack>
    </Box>
  );
}
