module.exports = {
  // content: ['./components/*.{tsx}'],
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: ["nativewind/babel"],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
};
