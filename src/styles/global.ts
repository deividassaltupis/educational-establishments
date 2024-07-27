import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'SF Pro Display';
        src: url('/fonts/sf-pro-display/SFPRO_DISPLAY_REGULAR.OTF') format('opentype');
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: 'SF Pro Display';
        src: url('/fonts/sf-pro-display/SFPRO_DISPLAY_MEDIUM.OTF') format('opentype');
        font-weight: 500;
        font-style: normal;
    }

    @font-face {
        font-family: 'SF Pro Display';
        src: url('/fonts/sf-pro-display/SFPRO_DISPLAY_BOLD.OTF') format('opentype');
        font-weight: 700;
        font-style: normal;
    }

    @font-face {
        font-family: 'SF Pro Display';
        src: url('/fonts/sf-pro-display/SFPRO_DISPLAY_LIGHT_ITALIC.OTF') format('opentype');
        font-weight: 400;
        font-style: italic;
    }

    @font-face {
        font-family: 'SF Pro Display';
        src: url('/fonts/sf-pro-display/SFPRO_DISPLAY_SEMI_BOLD_ITALIC.OTF') format('opentype');
        font-weight: 500;
        font-style: italic;
    }

    @font-face {
        font-family: 'SF Pro Display';
        src: url('/fonts/sf-pro-display/SFPRO_DISPLAY_HEAVY_ITALIC.OTF') format('opentype');
        font-weight: 700;
        font-style: italic;
    }

    body {
        font-family: 'SF Pro Display', Arial, sans-serif;
    }
`
