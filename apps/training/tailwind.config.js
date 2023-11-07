const tailwindConfig = require("ui/tailwind.config");

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
      },
    },
  },
  ...tailwindConfig,
};
