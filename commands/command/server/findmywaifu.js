module.exports = {
  commands: ['findmywaifu',
    'fmw'],
  expectedArgs: '<function> <name-waifu>',
  minArgs: '1',
  enable: false,
  callback: (msg, args, text) => {
    console.log(args[0])

    switch (args[0]) {
      case 'add':
        // code
        break;
    }
    
  }
}