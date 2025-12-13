import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  /* Global reset styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *:before,
  *:after {
    box-sizing: border-box;
  }

  a,
  a:visited {
    text-decoration: none;
    cursor: pointer;
  }

  button,
  ._btn {
    cursor: pointer;
    outline: none;
  }

  ul li {
    list-style: none;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    font-family: "Roboto", Arial, Helvetica, sans-serif;
    color: #000000;
  }

  /* Hover effects for popups */
  ._hover01:hover {
    background-color: #33399b;
  }

  ._hover02:hover, .header__user:hover {
    color: #33399b;
  }
  ._hover02:hover::after, .header__user:hover::after {
    border-left-color: #33399b;
    border-bottom-color: #33399b;
  }

  ._hover03:hover {
    background-color: #33399b;
    color: #FFFFFF;
  }
  ._hover03:hover a {
    color: #FFFFFF;
  }

  /* Popup target display */
  .pop-user-set:target,
  .pop-exit:target,
  .pop-new-card:target,
  .pop-browse:target {
    display: block;
  }

  ._active-category {
    opacity: 1 !important;
  }

  /* Category color styles */
  ._orange {
    background-color: #FFE4C2;
    color: #FF6D00;
  }

  ._green {
    background-color: #B4FDD1;
    color: #06B16E;
  }

  ._purple {
    background-color: #E9D4FF;
    color: #9A48F1;
  }
`

export default GlobalStyle

