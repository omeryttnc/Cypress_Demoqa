const { defineConfig } = require("cypress");


const mysql = require('mysql')

function queryTestDb(query, config) {

  const connection = mysql.createConnection(config.env.db)

  connection.connect()

  return new Promise((resolve, reject) => {

    connection.query(query, (error, result) => {

      if (error) reject(error)
      else {
        connection.end()
        return resolve(result)
      }
    })
  })
}



module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  hideXHR: true,

  viewportWidth: 1280,
  viewportHeight: 720,



  e2e: {
    watchForFileChanges: false,
    baseUrl: "https://test.urbanicfarm.com/",



    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);


      on('task',{queryDb: query=> {return queryTestDb(query,config)}})


    },
  },


  env: {
    baseUrl: "https://test.urbanicfarm.com/",

    db: {

      host: "127.0.0.1",
      port:3306,
      user: "sqluser",
      password: "password",
      database: "school"

    }

  }


});
