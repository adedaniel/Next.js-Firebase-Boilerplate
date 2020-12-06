import {
  Box,
  Heading,
  IconButton,
  Input,
  List,
  ListIcon,
  ListItem,
  Stack,
} from "@chakra-ui/core";
import React, { useEffect, useRef, useState } from "react";
import { fireStore } from "../firebase";

export default function EachUser({ user, id, ...rest }) {
  const { name, email, phone } = user;
  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);
  const [userPhone, setUserPhone] = useState(phone);

  const [isEditingUserName, setIsEditingUserName] = useState(false);
  const [isEditingUserEmail, setIsEditingUserEmail] = useState(false);
  const [isEditingUserPhone, setIsEditingUserPhone] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setUserName(name);
    setUserEmail(email);
    setUserPhone(phone);
  }, [user]);

  const handleEditSubmit = (event) => {
    event.preventDefault();
    setIsEditingUserName(false);
    setIsEditingUserEmail(false);
    setIsEditingUserPhone(false);
    let editedObject = {
      name: userName,
      email: userEmail,
      phone: userPhone,
    };
    fireStore.collection("users").doc(`${id}`).set(editedObject);
  };
  const handleDeleteUser = () => {
    fireStore.collection("users").doc(`${id}`).delete();
  };

  return (
    <Stack {...rest} isInline justify="space-between" align="center">
      <Stack spacing={3}>
        {isEditingUserName ? (
          <Box>
            <form onSubmit={handleEditSubmit}>
              <Input
                onBlur={() => setIsEditingUserName(false)}
                size="lg"
                ref={inputRef}
                isRequired
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Change User Name"
              />
            </form>
          </Box>
        ) : (
          <Heading
            onClick={() => {
              inputRef.current?.focus();
              setIsEditingUserName(true);
            }}
            fontSize="2xl"
            fontWeight="bold"
          >
            {userName}
          </Heading>
        )}

        <List spacing={3}>
          {isEditingUserEmail ? (
            <Box>
              <form onSubmit={handleEditSubmit}>
                <Input
                  onBlur={() => setIsEditingUserEmail(false)}
                  size="md"
                  w="xs"
                  mb={3}
                  ref={inputRef}
                  isRequired
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Change User Email"
                />
              </form>
            </Box>
          ) : (
            <ListItem
              onClick={() => {
                inputRef.current?.focus();
                setIsEditingUserEmail(true);
              }}
              onClick={() => setIsEditingUserEmail(true)}
            >
              <ListIcon icon="email" color="cyan.300" />
              {userEmail}
            </ListItem>
          )}

          {isEditingUserPhone ? (
            <Box>
              <form onSubmit={handleEditSubmit}>
                <Input
                  onBlur={() => setIsEditingUserPhone(false)}
                  size="md"
                  w="xs"
                  mb={3}
                  // type="number"
                  ref={inputRef}
                  isRequired
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder="Change User Phone"
                />
              </form>
            </Box>
          ) : (
            <ListItem
              onClick={() => {
                inputRef.current?.focus();
                setIsEditingUserPhone(true);
              }}
              onClick={() => setIsEditingUserPhone(true)}
            >
              <ListIcon icon="phone" color="cyan.300" />
              {userPhone}
            </ListItem>
          )}
        </List>
      </Stack>
      <Box>
        <IconButton
          variant="ghost"
          variantColor="cyan"
          aria-label="Remove user"
          icon="close"
          onClick={handleDeleteUser}
        />
      </Box>
    </Stack>
  );
}
