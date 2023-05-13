/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    colors: {
      current: "currentColor",
      transparent: "transparent",
      white: "#FFFFFF",
      offwhite: {
        1: "#F8F8F8",
        2: "#F9F9F9",
        3: "#FDFDFD",
      },
      gray: {
        1: "#2F2F2F",
        2: "#515151",
        3: "#A5A5A5",
        4: "#D5D5D5",
        5: "#F5F5F5",
        6: "#F9F9F9",
        7: "#FFFFFF",
      },
      darken: {
        1: "rgba(0, 0, 0, 0.1)",
        2: "rgba(0, 0, 0, 0.2)",
        3: "rgba(0, 0, 0, 0.3)",
        4: "rgba(0, 0, 0, 0.4)",
        5: "rgba(0, 0, 0, 0.5)",
        6: "rgba(0, 0, 0, 0.6)",
        7: "rgba(0, 0, 0, 0.7)",
        8: "rgba(0, 0, 0, 0.8)",
        9: "rgba(0, 0, 0, 0.9)",
      },
      black: "#000000",
      dark: "#1D2144",
      primary: "#34B27B",
      yellow: "#FBB040",
      emerald: "#54f05B",
      blue: "#3B82F6",
      purple: "#8B5CF6",
      "body-color": "#959CB1",

      dark: "#1D2144",
      blackblack: "#000000",
      paymentborder: "#E8E8E8",
      paymentmid: "#FAFAFA",
      paymenttext: "#666666",
      paymentboxborder: "#EAEAEA",

      pblines: "#D7DDE4",
      pbiconhover: "#E4E9EC",
      pbsecondbg: "#F8F9FA",
      pbgreytext: "#A0A6AC",
      pbblack: "#16161A",
      pbslash: "#D5D8DB",

      pbblackbtnhover: "#2C2C30",
      pbwhitebtnhover: "#EDF0F3",
      pbsearchselect: "#D7DDE4",
      
      sheettile: "#F4F4F4"
    },
    screens: {
      xs: "450px",
      // => @media (min-width: 450px) { ... }

      sm: "575px",
      // => @media (min-width: 576px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "992px",
      // => @media (min-width: 992px) { ... }

      xl: "1200px",
      // => @media (min-width: 1200px) { ... }

      "2xl": "1400px",
      // => @media (min-width: 1400px) { ... }
    },
    extend: {
      boxShadow: {
        signUp: "0px 5px 10px rgba(4, 10, 34, 0.2)",
        one: "0px 2px 3px rgba(7, 7, 77, 0.05)",
        sticky: "inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)",
      },
      maxWidth: {
        '120': '550px',
      },
      maxHeight: {
        '120': '600px',
      },
      colors: {
        "sheet-count-value": {
          1: "#654335",
          2: "#34B27B",
          3: "#54f05B",
          4: "#FBB040",
          5: "#34B27B",
          6: "#54f05B",
          7: "#FBB040",
          8: "#34B27B",
          9: "#54f05B",
          10: "#FBB040",
        },
      },
    },
  },
  plugins: [],
};