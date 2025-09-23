import type { Preview } from "@storybook/react";
import "../src/styles/globals.css";

// Make MDX components available globally
import { Meta, Primary, Stories } from "@storybook/addon-docs";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },

    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#0f172a",
        },
        {
          name: "prismora",
          value: "#ff432e",
        },
      ],
    },

    docs: {
      toc: true,
    },

    layout: "centered",

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: ["light", "dark"],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;

// Increase height of code blocks in Docs ("Show code") via injected styles
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
  .sbdocs .docblock-source { max-height: 720px !important; }
  .sbdocs .docblock-source pre, .sbdocs .docblock-source code { max-height: 720px !important; }
  .sbdocs .docblock-source code { font-size: 13px; }
  `;
  document.head.appendChild(style);
}
