import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: '../aurora-core/build/swagger.json',
  output: `./src/api`,
  plugins: [
    '@hey-api/schemas',
    '@hey-api/services',
    {
      enums: 'typescript',
      name: '@hey-api/types'
    }
  ]
});
