import { Box, Button, Heading, Input, Stack } from "@chakra-ui/core";
import React, { useState } from "react";
export default function ContactForm({ addContact, onLogout }) {
  const initialState = {
    name: "",
    phone: "",
    email: "",
    address: "",
  };
  const [values, setValues] = useState(initialState);
  const { address, email, name, phone } = values;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    addContact(values);
    setValues(initialState);
  };
  return (
    <Box top={4} pos="sticky" h="full" w="sm">
      <Heading>Enter your stuff here</Heading>
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
          <Input
            value={address}
            onChange={(event) => handleChange(event)}
            isRequired
            placeholder="House Address"
            name="address"
          />
          <Button type="submit" variant="outline" variantColor="cyan">
            Done (or just press enter)
          </Button>
        </Stack>
      </form>

      <Box mt={24}>
        <Button onClick={() => onLogout()} variant="ghost" variantColor="cyan">
          Logout
        </Button>
      </Box>
    </Box>
  );
}
