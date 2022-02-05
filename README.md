<p align="center">
  <img alt="The logo of React components library" src="./light_logo.svg#gh-light-mode-only" height="100">
  <img alt="The logo of React components library" src="./dark_logo.svg#gh-dark-mode-only" height="100">
</p>

<p align="center">
  <a href="https://codecov.io/gh/cergmin/components">
    <img alt="Coverage status" src="https://codecov.io/gh/cergmin/components/branch/main/graph/badge.svg?token=GLLDOYT6FW"/>
  </a>
  <a href="https://github.com/cergmin/components/actions/workflows/ci.yml">
    <img alt="Testing status" src="https://github.com/cergmin/components/actions/workflows/ci.yml/badge.svg">
  </a>
  <a href="https://components-cergmin.vercel.app/">
    <img alt="Vercel app status" src="https://vercelbadge.vercel.app/api/cergmin/components">
  </a>
</p>

## Demo
https://cergmin.github.io/components

## Tooling setup

We use Rollup to build the library and Next.js to build the documentation. You can also run Jest tests over the code.

You should use [pnpm](https://pnpm.io/) instead of npm.

Follow these steps to run the project locally:

1. Download and install [Node.js 16](https://nodejs.org/en/).
1. Install [pnpm](https://pnpm.io/) (`npm install -g pnpm`).
1. Fork [the repository](https://github.com/cergmin/components) and clone it.
1. Open root directory and run `pnpm install` to install dependencies.
1. Open **/docs** folder and run `pnpm install` again to install documentation dependencies.
1. Go back to the root.

## Scripts
`start:docs` — run next.js server with documentation<br>
`build` — build library<br>
`build:docs` — build documentation with next.js<br>
`build:examples` — build examples<br>
`build:all` — build library and examples<br>
`watch` — run library building in watch mode<br>
`watch:docs` — run documentation (next.js) in dev mode<br>
`watch:tests` — run unit testing in watch mode<br>
`test` — run unit tests<br>
`coverage` — generate coverage report<br>
`fix` — fix code with prettier, eslint and stylelint<br>

## Components
- SimpleButton
