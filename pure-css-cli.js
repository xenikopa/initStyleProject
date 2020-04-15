"use strict";
const fs = require('fs');
const pipe = (...funcs) => v => {
  return funcs.reduce((res, func) => {
    return func(res);
  }, v);
};


let createTemplate = (name, callback) => 
  fs.writeFile(`src/html/${name}.html`, `${name} is created!`, callback(`src/html/${name}.html`))

let createStyles = (name, callback) => 
  fs.writeFile(`src/css/${name}.scss`, '', callback(`src/css/${name}.scss`));


let appendToIndex = (name) => {
  let indexPath = 'src/html/index.html';
  
  let readCallback = (err, data) => {
    if (err) { 
      console.error(err);
      process.exit(1);
    }

    let getHtml = (anchor) => (name) => `
    <div class='list-item'>
      //= ${name}.html
    </div>
    ${anchor}
`
    pipe(
      anchor => ({ anchor, html: getHtml(anchor)(name) }),
      ({anchor, html}) =>  data.replace(anchor, html),
      html => void fs.writeFile(indexPath, html, callbackFiles())
    )('<!-- next-item -->');
  }


  fs.readFile(indexPath, 'utf8', readCallback);
}


let callbackFiles = (path) => (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  if (path !== undefined) {
    console.log(`${path} is created successfully.`);
  } else {
    console.log('Successfull!')
  }
};

let showHelp = () => void console.log(`
Usage: 
  - npm run g [arguments] 
  - npm run generate [arguments] 
  - node pure-css-cli.js [arguments]

Arguments: 
  help, h     output usage information
  file-name   set new HTML and SCSS file name. Example: 'npm run generate example'.
`);

let getHelp = pipe(
  argv => argv.findIndex(x => x === 'help' || x === 'h'),
  index => {
      if (index === -1) { return; }
      showHelp();
      process.exit(0);
  }
);

let isValidName = (name) => name !== undefined && name.length > 0 && !new RegExp(/\./g).test(name);


void function() {
    let argv = process.argv.slice(2);
    getHelp(argv);
    pipe(
      name => isValidName(name) ? name : null,
      name => {
        createTemplate(name, callbackFiles), 
        createStyles(name, callbackFiles),
        appendToIndex(name)
      }
    )(argv[0])
}()