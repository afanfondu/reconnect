import { Global } from '@emotion/react'

export const Scrollbar = () => (
  <Global
    styles={`
      *::-webkit-scrollbar {
        width: 7px;
      }

      *::-webkit-scrollbar-track {
        background-color: transparent;
      }

      *::-webkit-scrollbar-thumb {
        background-color: rgba(155, 155, 155, 0.5);
        border-radius: 20px;
        border: transparent;
      }

      *::-webkit-scrollbar-thumb:hover {
        background-color: rgba(155, 155, 155, 0.7);
      }
    `}
  />
)
