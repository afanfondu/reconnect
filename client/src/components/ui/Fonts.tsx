import { Global } from '@emotion/react'

export const Fonts = () => (
  <Global
    styles={`
      /* poppins */
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
      }
      `}
  />
)
