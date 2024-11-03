import eslint from '@gewis/eslint-config/eslint.common.mjs';
import react from '@gewis/eslint-config/eslint.react.mjs';
import prettier from '@gewis/eslint-config/eslint.prettier.mjs';

export default [
  ...eslint,
  ...react,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  ...prettier,
];
