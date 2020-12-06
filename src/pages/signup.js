import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/core";
import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";
import { fireAuth } from "../firebase";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const onSubmitSignup = (event) => {
    event.preventDefault();
    setIsLoading(true);

    fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        Router.push("/");
      })
      .catch((err) => {
        setIsLoading(false);
        toast({
          title: "Uhh...",
          position: "bottom-left",
          description: err.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        console.log(err);
      });
  };

  return (
    <Flex w="full" h="full" minH="100vh" align="center" justify="center">
      <Box border="2px solid" w="lg" borderColor="cyan.300" rounded={12} p={8}>
        <Heading fontSize="2xl">Signup here</Heading>
        <form onSubmit={onSubmitSignup} action="submit">
          <Stack spacing={4} mt={8}>
            <Input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Your email"
              isRequired
              type="email"
            />
            <Input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Your password"
              isRequired
              type="password"
            />
            <Button
              isLoading={isLoading}
              type="submit"
              w="full"
              variant="solid"
              variantColor="cyan"
            >
              Sign up
            </Button>
            <Link href="/login">
              <Button w="full" variant="link" variantColor="cyan">
                Login
              </Button>
            </Link>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
}
