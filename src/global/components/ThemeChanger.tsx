import { useColorMode, useColorModeValue, IconButton } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export function ThemeChanger() {
    const { toggleColorMode } = useColorMode();
    const themeText = useColorModeValue("dark", "light");
    const SwitchThemeIcon = useColorModeValue(MoonIcon, SunIcon);
    return (
        <IconButton
            icon={<SwitchThemeIcon />}
            onClick={toggleColorMode}
            aria-label={`Switch to ${themeText} mode`}
        />
    )
};