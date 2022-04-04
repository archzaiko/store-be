# Run server

## In the root directory

1. Run Docker Compose DB server: `npm run start:docker`
2. Run app server: `start:dev`

## Issues

### Paths (`compilerOptions.paths`) resolving

- `ts-node` ([docs](https://typestrong.org/ts-node/docs/paths))

  1. install the `tsconfig-paths` package
  2. define the `require` config option for the `ts-node` (`tsconfig.json`):

```JSON
{
  "ts-node": {
    "require": ["tsconfig-paths/register"]
  }
}
```

- `ts-node-dev` (hot reload): add the `--require tsconfig-paths/register` option to the npm script command for watching
