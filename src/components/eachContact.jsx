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
import firebaseDb from "../firebase";

export default function EachContact({ contact, id, ...rest }) {
  const { name, email, phone, address } = contact;
  const [contactName, setContactName] = useState(name);
  const [contactEmail, setContactEmail] = useState(email);
  const [contactPhone, setContactPhone] = useState(phone);
  const [contactAddress, setContactAddress] = useState(address);

  const [isEditingContactName, setIsEditingContactName] = useState(false);
  const [isEditingContactEmail, setIsEditingContactEmail] = useState(false);
  const [isEditingContactPhone, setIsEditingContactPhone] = useState(false);
  const [isEditingContactAddress, setIsEditingContactAddress] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setContactName(name);
    setContactEmail(email);
    setContactPhone(phone);
    setContactAddress(address);
  }, [contact]);

  const handleEditSubmit = (event) => {
    event.preventDefault();
    setIsEditingContactName(false);
    setIsEditingContactEmail(false);
    setIsEditingContactPhone(false);
    setIsEditingContactAddress(false);
    let editedObject = {
      name: contactName,
      email: contactEmail,
      phone: contactPhone,
      address: contactAddress,
    };
    firebaseDb
      .child(`contacts/${id}`)
      .set(editedObject, (err) => err && console.log(err));
  };
  const handleDeleteContact = () => {
    firebaseDb.child(`contacts/${id}`).remove((err) => err && console.log(err));
  };

  return (
    <Stack {...rest} isInline justify="space-between" align="center">
      <Stack spacing={3}>
        {isEditingContactName ? (
          <Box>
            <form onSubmit={handleEditSubmit}>
              <Input
                onBlur={() => setIsEditingContactName(false)}
                size="lg"
                ref={inputRef}
                isRequired
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Change Contact Name"
              />
            </form>
          </Box>
        ) : (
          <Heading
            onClick={() => {
              inputRef.current?.focus();
              setIsEditingContactName(true);
            }}
            fontSize="2xl"
            fontWeight="bold"
          >
            {contactName}
          </Heading>
        )}

        <List spacing={3}>
          {isEditingContactEmail ? (
            <Box>
              <form onSubmit={handleEditSubmit}>
                <Input
                  onBlur={() => setIsEditingContactEmail(false)}
                  size="md"
                  w="xs"
                  mb={3}
                  ref={inputRef}
                  isRequired
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="Change Contact Email"
                />
              </form>
            </Box>
          ) : (
            <ListItem
              onClick={() => {
                inputRef.current?.focus();
                setIsEditingContactEmail(true);
              }}
              onClick={() => setIsEditingContactEmail(true)}
            >
              <ListIcon icon="email" color="cyan.300" />
              {contactEmail}
            </ListItem>
          )}

          {isEditingContactPhone ? (
            <Box>
              <form onSubmit={handleEditSubmit}>
                <Input
                  onBlur={() => setIsEditingContactPhone(false)}
                  size="md"
                  w="xs"
                  mb={3}
                  type="number"
                  ref={inputRef}
                  isRequired
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="Change Contact Phone"
                />
              </form>
            </Box>
          ) : (
            <ListItem
              onClick={() => {
                inputRef.current?.focus();
                setIsEditingContactPhone(true);
              }}
              onClick={() => setIsEditingContactPhone(true)}
            >
              <ListIcon icon="phone" color="cyan.300" />
              {contactPhone}
            </ListItem>
          )}

          {isEditingContactAddress ? (
            <Box>
              <form onSubmit={handleEditSubmit}>
                <Input
                  onBlur={() => setIsEditingContactAddress(false)}
                  size="md"
                  w="xs"
                  mb={3}
                  ref={inputRef}
                  isRequired
                  value={contactAddress}
                  onChange={(e) => setContactAddress(e.target.value)}
                  placeholder="Change Contact Address"
                />
              </form>
            </Box>
          ) : (
            <ListItem
              onClick={() => {
                inputRef.current?.focus();
                setIsEditingContactAddress(true);
              }}
              onClick={() => setIsEditingContactAddress(true)}
            >
              <ListIcon icon="at-sign" color="cyan.300" />
              {contactAddress}
            </ListItem>
          )}
        </List>
      </Stack>
      <Box>
        <IconButton
          variant="ghost"
          variantColor="cyan"
          aria-label="Remove contact"
          icon="close"
          onClick={handleDeleteContact}
        />
      </Box>
    </Stack>
  );
}
