# Vapor Demo

[![license](https://img.shields.io/hexpm/l/plug.svg?style=flat-square)](../../LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Vapor is Coveo's collection of UI styles used in Coveo Cloud Administration Console. All components and their documentation is [available here](http://vapor.surge.sh/)

## Contributing

### Build

Make sure you have both [Node.js](https://nodejs.org/)'s and [NPM](https://www.npmjs.com/package/npm)'s LTS versions installed, then install `vapor`'s dependencies.

```bash
npm install
```

### Running the project locally

```bash
# for a static build
npm run build

# or to get auto reload
npm start
```

### Testing your changes locally directly in your project

You can easily test your changes locally directly in your projects by leveraging [npm's link feature](https://docs.npmjs.com/cli/link). For the sake of the example, we'll suppose we want to use our local `vapor` changes inside `vapor-demo`.

| Step | Terminal window 1   | Terminal window 2        |
| ---- | ------------------- | ------------------------ |
| 1    | `learna bootstrap`  |                          |
| 2    | `cd packages/vapor` | `cd packages/vapor-demo` |
| 3    | `npm start`         | `npm start`              |

You can leave both terminal windows running. Changes saved in either repositories will trigger a rebuild of the local demo.

## License

Vapor Demo is distributed under [Apache 2.0 license](../../LICENSE).
