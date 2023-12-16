
import { Link as RouteLink, useNavigate } from "react-router-dom"
import { Box, VStack, Stack, Image, Input, InputGroup, InputRightElement, Button, IconButton, Link as ChakraLink, Icon, HStack ,Menu,MenuButton , MenuItem, MenuList, } from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { BsMoonStars, BsSun } from "react-icons/bs"
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout, themeChange } from "../Redux/action";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { HamburgerIcon, AddIcon, WarningIcon,ChevronDownIcon } from '@chakra-ui/icons'

const Navbar = () => {
    const [search, setSearch] = useState("");

    const theme = useSelector((store) => store.authReducer.theme);
    // const avatar = useSelector((store) => store.authReducer.avatar);
    const avatar = localStorage.getItem("avatar");
    // const username = useSelector((store) => store.authReducer.userName);
    const username = localStorage.getItem("userName");
    // const subscription = useSelector((store) => store.authReducer.subscription);
    const subscription = localStorage.getItem("subscription");
    // const [isAuth, setIsAuth] = useState(localStorage.getItem("token"));
    const isAuth = useSelector((store) => store.authReducer.isAuth);



    const navigate = useNavigate();
    // const [isAuth, setIsAuth] = useState(false);
    // const isAuthRef = useRef(isAuth);

    // useEffect(() => {
    //     setIsAuth(localStorage.getItem("isAuth"));
    // }, [isAuth]);

    const dispatch = useDispatch();
    const changeTheme = () => {
        themeChange(dispatch)
    }
    const handleLogout = () => {
        logout(dispatch);
    }

    const handleSearch = () => {
        console.log("handle search invoked");
        axios.get(`https://gifted-kit-cow.cyclic.app/admin/search?title=${search}`)
            .then((res) => {
                console.log(res.data);
                localStorage.setItem("searchResult", JSON.stringify(res.data));
                if (search.length > 0) {
                    navigate("/search");
                }
            })
            .catch((err) => console.log(err.message));
    }

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            handleSearch();
        }, 1000);

        if (search.length === 0) {
            navigate("/");
        }

        return () => {
            clearTimeout(debounceTimer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    // useEffect(() => {
    //     let isAuth = localStorage.getItem("isAuth");
    //     if (isAuth === undefined) {

    //     }
    //     else {
    //         if (isAuth === "false") {

    //         }
    //         else
    //         {

    //         }
    //     }
    // }, []);

    return <Box w={"100%"} bgColor={theme === "dark" ? "#15191E" : "#edf2f7"} color={theme === "dark" ? "white" : "black"}>
        <Stack w={"90%"} m={"auto"} direction={"row"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={"1"}>
            <Image src="https://firebasestorage.googleapis.com/v0/b/festive-crayon.appspot.com/o/Posts%2FCraft_Ideas1-removebg.png029b92d9-75e9-48d1-b100-5b790f007a6c?alt=media&token=b496407b-289a-45d6-952d-9bb82d176b81" alt="logo" objectFit={"cover"} w={"10%"} _hover={{ cursor: "pointer" }} onClick={() => { navigate("/") }} />
            <InputGroup w={"40%"}>
                <Input value={search} placeholder="Search" borderRadius={"8px"} focusBorderColor="#8FDBA7" outline={"unstyled"} borderColor={theme === "dark" ? "white" : "black"} _hover={{ borderColor: "none" }} onChange={(e) => {
                    if (e.target.value === "") {
                        setSearch(e.target.value);
                        localStorage.setItem("searchKey", JSON.stringify(search));
                        navigate("/");
                    }
                    else {
                        setSearch(e.target.value);
                        localStorage.setItem("searchKey", JSON.stringify(search));
                    }
                }} /*style={{ outline: "2px solid blue" }}*/ />
                <InputRightElement onClick={handleSearch}>
                    <IconButton icon={<SearchIcon />} size={"sm"} p={"1"} bgColor={"#8FDBA7"} _hover={{ bgColor: "none" }} />
                </InputRightElement>
            </InputGroup>
            <Box display={"flex"} justifyContent={"space-around"} gap="1.5rem" alignItems={"center"}>
                <Icon as={theme === "dark" ? BsSun : BsMoonStars} fontSize={"xl"} onClick={() => changeTheme(dispatch)} />
                <ChakraLink to="/arts" color={theme === "dark" ? "white" : "black"} as={RouteLink} style={{ textDecoration: "none", color: "coral" }} _hover={{ color: "#8FDBA7" }} fontSize="2xl">Arts</ChakraLink>
                {
                    isAuth ?
                        (
                            <VStack  spacing="1rem">

                                <PROFILE>
                                <Box className="profile" fontSize="lg">{username}</Box>
                                <Image src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA8cTn1-RRcQ_T4-cf40vYi4sjFEADIdog1TqwvXO3kw&s"} borderRadius='full' boxSize='55px'></Image>
                                <ICONBOX className="profile"><Link to="/upload"><FaPlus fontSize="1.5rem" color={theme === "dark" ? "white" : "black"} /></Link></ICONBOX>
                                {
                                    subscription === "basic" ? (
                                        <Button className="profile" bgColor="#FF7F50" color={"white"} _hover={{ backgroundColor: "#91D9A8", color: "black" }} onClick={() => { navigate("/plans") }}>
                                            Subscribe
                                        </Button>
                                    ) : subscription === "premium" ? (
                                        <Button className="profile" bgColor="#FF7F50" color={"white"} _hover={{ backgroundColor: "#91D9A8", color: "black" }} onClick={() => { navigate("/plans") }}>
                                            Upgrade
                                        </Button>
                                    ) : ""
                                }

                                <Button className="profile" bgColor="#FF7F50" color="white" _hover={{ backgroundColor: "#91D9A8", color: "black" }} onClick={handleLogout}>Logout</Button>
                                </PROFILE>
                                
                                
                                <DIV className="menu">
                                <Menu  >
                                    {({ isOpen }) => (
                                        <>
                                        <MenuButton isActive={isOpen} as={Button} rightIcon={<HamburgerIcon />}>
                                        
                                           
                                        </MenuButton>
                                        <MenuList bgColor={theme === "dark" ? "#15191E" : "#f7edee"} color={theme === "dark" ? "white" : "black"}>
                                            <MenuItem bgColor={theme === "dark" ? "#15191E" : "#edf2f7"} color={theme === "dark" ? "white" : "black"}> <ICONBOX><Link to="/upload"><FaPlus fontSize="1.5rem" color={theme === "dark" ? "white" : "black"} /></Link></ICONBOX></MenuItem>
                                            <MenuItem bgColor={theme === "dark" ? "#15191E" : "#edf2f7"} color={theme === "dark" ? "white" : "black"} onClick={() => alert('Kagebunshin')}>
                                                {
                                                    subscription === "basic" ? (
                                                        <Button bgColor="#FF7F50" color={"white"} _hover={{ backgroundColor: "#91D9A8", color: "coral" }} onClick={() => { navigate("/plans") }}>
                                                            Subscribe
                                                        </Button>
                                                    ) : subscription === "premium" ? (
                                                        <Button bgColor="#FF7F50" color={"white"} _hover={{ backgroundColor: "#91D9A8", color: "coral" }} onClick={() => { navigate("/plans") }}>
                                                            Upgrade
                                                        </Button>
                                                    ) : ""
                                                }
                                            </MenuItem>
                                            <MenuItem bgColor={theme === "dark" ? "#15191E" : "#edf2f7"} color={theme === "dark" ? "white" : "black"}>
                                                <Button bgColor="#FF7F50" color="white" _hover={{ backgroundColor: "#91D9A8", color: "coral" }} onClick={handleLogout}>Logout</Button>
                                            </MenuItem>
                                        </MenuList>
                                        </>
                                    )}
                                </Menu>
                                </DIV>
                            </VStack>
                        ) : (<ChakraLink to="/login" as={RouteLink} style={{ textDecoration: "none", color: theme === "dark" ? "coral" : "blue" }} _hover={{ color: "#8FDBA7" }} fontSize="xl">Login</ChakraLink>)
                }
            </Box>
            
        </Stack>
    </Box>
}

const ICONBOX = styled.div`

&:hover{
    cursor: pointer;
}
`;

const DIV=styled.div`


display: none;

.profile{
    visibility: hidden;
}
@media only screen and (max-width: 580px){
    display: block;
}
    
`

const PROFILE=styled.div`
display: flex;
gap:10px;
@media only screen and (max-width: 580px){
    display: none;
}
    
`
export default Navbar;