# Workerize + Webpack with Web Workers: ~~Working~~ Demo

The aim is to get some code with an inlined web worker, which works when you build it, but also when you serve it.

The demo runs a standard JS interval counter, which is interrupted when you run an expensive process, but not when you run the same expensive process via a web worker, which runs it in a different CPU thread.

## Development
```
npm start
```

## Production (app)
```
npm run build
```
This will place the built app in `/dist`.

## Production (library)
```
npm run lib
```
This will place the built library in `/lib`.

## Demo library import
Build production library and test importing into a new production app:
```
npm run import
```
This will place the built app in `/demo`.