'use client';
import { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    HStack,
    Link,
    IconButton,
    useDisclosure,
    Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";


export default function Navbar({ Links: Links }: { Links: { label: string; href: string }[] }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Change background after scrolling 50px
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Box bg={scrolled ? "transparent" : "blue.800"} 
            transition="background-color 0.3s ease-in-out"
            px={4} color="yellow.400" position="sticky" top={0} zIndex="sticky">
            <Flex h={16} alignItems="center" justifyContent="space-between">
                {/* Logo / Brand */}
                <Box fontWeight="bold" fontSize="xl">
                    <Link
                        px={2}
                        py={1}
                        rounded="md"
                        _hover={{ bg: "blue.700" }}
                        href="/"
                    >
                        Fantasy Golf  Competition
                    </Link>
                </Box>

                {/* Desktop Links */}
                <HStack spacing={8} alignItems="center" display={{ base: "none", md: "flex" }}>
                    {Links.map((link) => (
                        <Link
                            key={link.label}
                            px={2}
                            py={1}
                            rounded="md"
                            _hover={{ bg: "blue.700" }}
                            href={link.href}
                            isExternal={link.label === "World Power Rankings"}
                        >
                            {link.label}
                        </Link>
                    ))}

                </HStack>

                {/* Mobile Hamburger */}
                <IconButton
                    size="md"
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label="Open Menu"
                    display={{ md: "none" }}
                    onClick={isOpen ? onClose : onOpen}
                />
            </Flex>

            {/* Mobile Menu */}
            {isOpen && (
                <Box pb={4} display={{ md: "none" }}>
                    <Stack as="nav" spacing={4}>
                        {Links.map((link) => (
                            <Link
                                key={link.label}
                                px={2}
                                py={1}
                                rounded="md"
                                _hover={{ bg: "blue.700" }}
                                href={`/${link.label.toLowerCase()}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </Stack>
                </Box>
            )}
        </Box>
    );
}
