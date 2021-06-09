#!/usr/bin/env node
let fs = require('fs')
let path = require('path')

if (fs.existsSync(path.join('build', '200.html'))) {
  try {
    fs.rmdirSync(path.join('build', '200.html'), { recursive: true })
  } catch (error) {}
}

let code = fs.readFileSync(path.join('build', 'index.html'))
fs.writeFileSync(path.join('build', '200.html'), code)
