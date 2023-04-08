const { defineConfig } = require("cypress");
const fs = require('fs');

module.exports = defineConfig({
  e2e: {
    baseUrl:"https://www.saucedemo.com/",
    specPattern:"./cypress/e2e/Saucelab/*.js",
    testIsolation: false,
    reporter: 'cypress-mochawesome-reporter',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on('task',{
        checkAscending({arr}){
          if(typeof arr[0] === 'string'){
            for(let i=0;i<arr.length-1;i++){
              if(arr[i].localeCompare(arr[i+1]) > 0) return false;
            }
            return true;
          }else{
            for(let i=0;i<arr.length-1;i++){
              if(arr[i] > arr[i+1]) return false;
            }
            return true;
          }
          
        }
      });

      on('task',{
        checkDescending({arr}){
          if(typeof arr[0] === 'string'){
            for(let i=0;i<arr.length-1;i++){
              if(arr[i].localeCompare(arr[i+1]) < 0) return false;
            }
            return true;
          }else{
            for(let i=0;i<arr.length-1;i++){
              if(arr[i] < arr[i+1]) return false;
            }
            return true;

          }
          
        }
      });

      on('task',{
        writeFile({path, data}){
          fs.writeFileSync(path,data);
          return true;
        }
      })

    },
  },
});
