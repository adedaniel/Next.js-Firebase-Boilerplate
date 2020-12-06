import React, { useState } from "react";
import { Box, Input, Heading, Stack, Button } from "@chakra-ui/core";
export default function UserForm({ addUser }) {
  const initialState = {
    name: "",
    phone: "",
    email: "",
  };
  const [values, setValues] = useState(initialState);
  const { email, name, phone } = values;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    addUser(values);
    setValues(initialState);
  };
  return (
    <Box top={4} pos="sticky" h="full" w="sm">
      <Heading>Enter your user here</Heading>
      <form onSubmit={handleSubmit} autoCorrect="on" action="submit">
        <Stack spacing={6} mt={8}>
          <Input
            value={name}
            onChange={(event) => handleChange(event)}
            isRequired
            placeholder="Full Name"
            name="name"
          />
          <Input
            value={email}
            onChange={(event) => handleChange(event)}
            isRequired
            placeholder="Email address"
            name="email"
            type="email"
          />
          <Input
            value={phone}
            onChange={(event) => handleChange(event)}
            isRequired
            placeholder="Mobile"
            name="phone"
            type="tel"
          />

          <Button type="submit" variant="outline" variantColor="cyan">
            Done (or just press enter)
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
