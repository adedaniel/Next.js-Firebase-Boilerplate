import { Box, Flex, Heading, Stack } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import EachUser from "../components/eachUser";
import UserForm from "../components/userForm";
import { fireStore } from "../firebase";

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // const fetchData = async () => {
    //   const data = await (
    //     await fireStore.collection("users").get()
    //   ).docs.map((user) => ({ ...user.data(), id: user.id }));
    //   setUsers(data);
    // };
    // fetchData();
    return fireStore.collection("users").onSnapshot((snapshot) => {
      const usersData = [];
      snapshot.forEach((user) =>
        usersData.push({ ...user.data(), id: user.id })
      );
      setUsers(usersData);
    });
  }, []);

  const addUser = (user) => {
    console.log(user);
    fireStore.collection("users").add(user);
  };
  return (
    <Box>
      <Flex flexWrap="wrap" mt={24} justify="space-around">
        <>
          <UserForm addUser={addUser} />
          <Box w="md">
            <Heading>View your users here</Heading>
            <Stack pb={12} spacing={10} mt={8}>
              {users.map((user) => (
                <EachUser key={user.id} id={user.id} user={user} />
              ))}
            </Stack>
          </Box>
        </>
      </Flex>
    </Box>
  );
}
