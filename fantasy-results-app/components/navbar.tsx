'use client';

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

const Links = [
    { label: "Home", href: "/" },
    { label: "Overall Leaderboard", href: "/overall" },
    { label: "Scoring", href: "/scoring" },
];

export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box bg="blue.800" px={4} color="yellow.400">
            <Flex h={16} alignItems="center" justifyContent="space-between">
                {/* Logo / Brand */}
                <Box fontWeight="bold" fontSize="xl">
                    Fantasy Golf Competition
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
                                key={link}
                                px={2}
                                py={1}
                                rounded="md"
                                _hover={{ bg: "blue.700" }}
                                href={`/${link.toLowerCase()}`}
                            >
                                {link}
                            </Link>
                        ))}
                    </Stack>
                </Box>
            )}
        </Box>
    );
}
