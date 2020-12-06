import { Box, Flex } from "@chakra-ui/core";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import ContactForm from "../components/contactForm";
import ContactView from "../components/contactView";
import firebaseDb, { fireAuth } from "../firebase";

export default function Index() {
  const [contacts, setContacts] = useState({});
  const [user, setUser] = useState({});
  useEffect(() => {
    fireAuth.onAuthStateChanged((user) => {
      if (user) {
        console.log("user found");
        setUser(user);
      } else {
        console.log("no user");
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    firebaseDb.child("contacts").on("value", (snapshot) => {
      snapshot.val();
      if (snapshot.val()) {
        setContacts({ ...snapshot.val() });
      } else {
        setContacts({});
      }
    });
  }, []);

  const addContact = (contact) => {
    firebaseDb
      .child("contacts")
      .push(contact, (err) => err && console.log(err));
  };
  const onLogout = () => {
    fireAuth.signOut();
  };

  useEffect(() => {
    !user && Router.push("/login");
  }, [user]);

  return (
    <Box>
      <Flex flexWrap="wrap" mt={24} justify="space-around">
        <>
          <ContactForm onLogout={onLogout} addContact={addContact} />
          <ContactView contacts={contacts} />
        </>
      </Flex>
    </Box>
  );
}
