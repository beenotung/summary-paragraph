# react-summary-paragraph-demo

Demo: https://summarize-app.surge.sh

Powered by [React](./toolkit.md)

## Purpose

This repo is setup to demonstrates how to share state across pages with redux.

## Involved

- [x] [react-router](https://www.npmjs.com/package/react-router)
  - [x] [react-router-dom](https://www.npmjs.com/package/react-router-dom)
  - [x] [connected-react-router](https://www.npmjs.com/package/connected-react-router)
  - [x] [history v4](https://www.npmjs.com/package/history/v/4.10.1)
- [x] [redux](https://www.npmjs.com/package/redux)
  - [x] [react-redux](https://www.npmjs.com/package/react-redux)
  - [x] [redux-logger](https://www.npmjs.com/package/redux-logger)
  - [x] [redux-thunk](https://www.npmjs.com/package/redux-thunk)
- [x] [Use Hooks](https://reactjs.org/docs/hooks-overview.html)
  - [x] [use-state-proxy](https://www.npmjs.com/package/use-state-proxy)
  - [x] [use-hook-form](https://www.npmjs.com/package/use-hook-form)
- [x] [Offline API Stub](./src/api/stub.ts)
- [x] CDN for demo (super easy to setup)
  - [x] [surge.sh](https://surge.sh/)

## Guideline

1. Install

```bash
npm install
```

2. Build

```bash
npm run build
```

3. Setup SPA redirect for CDN

```bash
npm run copy
```
