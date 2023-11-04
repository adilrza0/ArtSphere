import { Link as RouteLink, useNavigate } from "react-router-dom"
import { Box, Stack, Image, Input, InputGroup, InputRightElement, Button, IconButton, Link as ChakraLink, Icon } from "@chakra-ui/react"
import { useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { BsMoonStars, BsSun } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/action";

const Navbar = () => {
    const [search, setSearch] = useState("");
    const [theme, setTheme] = useState("dark");
    const navigate = useNavigate();
    const isAuth = useSelector((store) => store.authReducer.isAuth);
    const dispatch = useDispatch();
    const changeTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    const handleLogout = () => {
        logout(dispatch);
    }

    return <Box w={"100%"} bgColor={theme === "dark" ? "#15191E" : "#dddddd"} color={theme === "dark" ? "white" : "black"}>
        <Stack w={"90%"} m={"auto"} direction={"row"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"1"}>
            {/* <ChakraLink to="/" as={RouteLink}> */}
            <Image src="https://firebasestorage.googleapis.com/v0/b/festive-crayon.appspot.com/o/Posts%2FCraft_Ideas1-removebg.png029b92d9-75e9-48d1-b100-5b790f007a6c?alt=media&token=b496407b-289a-45d6-952d-9bb82d176b81" alt="logo" objectFit={"cover"} w={"10%"} _hover={{ cursor: "pointer" }} onClick={() => { navigate("/") }} />
            {/* </ChakraLink> */}
            <InputGroup w={"30%"}>
                <Input value={search} placeholder="Search" borderRadius={"none"} focusBorderColor="#8FDBA7" _hover={{ borderColor: "none" }} onChange={(e) => setSearch(e.target.value)} />
                <InputRightElement >
                    <IconButton icon={<SearchIcon />} size={"sm"} p={"1"} bgColor={"#8FDBA7"} _hover={{ bgColor: "none" }} />
                </InputRightElement>
            </InputGroup>
            <Box display={"flex"} justifyContent={"space-between"} w={"16%"} alignItems={"center"}>
                <Icon as={theme === "dark" ? BsSun : BsMoonStars} fontSize={"xl"} onClick={changeTheme} />
                <Button bgColor="#FF7F50" color={"white"} _hover={{ backgroundColor: "#FF7F50" }}>
                    <ChakraLink as={RouteLink} style={{ textDecoration: "none", fontSize: "xl" }}>Subscribe</ChakraLink>
                </Button>
                {
                    isAuth ?
                        (
                            <Button bgColor="#FF7F50" color={"white"} onClick={handleLogout} _hover={{ backgroundColor: "#FF7F50" }}>
                                Logout
                            </Button>
                        ) : (<ChakraLink to="/login" as={RouteLink} style={{ textDecoration: "none" }} _hover={{ color: "#8FDBA7" }}>Login</ChakraLink>)
                }
            </Box>
        </Stack>
    </Box>
}
export default Navbar;