const https = require("https")
const http = require("http")


class TigerGraphConnection {


  constructor(host = "127.0.1.1", graph = "c360", username = "tigergraph", password = "tigergraph", secret="", token="", useCert=false) {
    this.HOST = host;
    this.GRAPH = graph;
    this.USERNAME = username;
    this.PASSWORD = password;
    this.SECRET = secret;
    this.TOKEN = token;
	
    this.USECERT = useCert;
  }

  
  async  echo()  {
    let p = new Promise((resolve, reject) => {
          const options = {
            hostname: `${this.HOST}`,
            port: 9000,
            path: `/echo/${this.GRAPH}`, 
            method: 'GET'
            ,
            headers: {
              'Authorization': `Bearer ${this.TOKEN}`
            }
          }
          

          let req = null;
          if (this.USECERT == true) {
              req =  https.request(options,async res => {
              let data = '';
              res.on('data', chunk => {
                data += chunk;
              });
              res.on('end', () => {
                console.log(data);
                resolve(JSON.parse(data));
              });
            });
          }
          else
          {
              req =  http.request(options,async  res =>  {
              let data = '';
              res.on('data', chunk => {
                data += chunk;
              });
              res.on('end', () => {
                console.log(data);
                resolve(JSON.parse(data));

              });
            });
          }
          req.on('error', error => {
            reject(error);
          });
          req.end();
        });
    return await p;
  }


   /**
   *
   * @param {String} vertex_type
   * @param {String} vertex_id
   * @param {JSON} attributes
   * @param {function} callback
   */
  async upsertVertex(vertex_type, vertex_id, attributes) {
    let p = new Promise((resolve, reject) => {
      let postData = {};
      postData["vertices"] = {};
      postData["vertices"][vertex_type] = {};
      postData["vertices"][vertex_type][vertex_id] = attributes;
      postData = JSON.stringify(postData);
      const options = {
        hostname: `${this.HOST}`,
        port: 9000,
        path: `/graph/${this.GRAPH}`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.TOKEN}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': postData.length
        }
      };
      if (this.USECERT == true) {
            const req = https.request(options, res => {
              console.log(`statusCode: ${res.statusCode}`);
              let data = '';
              res.on('data', chunk => {
                data += chunk;
              });
              res.on('end', async () => {
                // if (JSON.parse(data)["error"]) {
                //   console.error(JSON.parse(data)["message"]);
                // } else {
                  return resolve(JSON.parse(data));
                // }
              });
              res.on('error', (err) => {
                reject(err);
              })
            });
            req.on('error', error => {
              reject(error);
            });
            req.write(postData);
            req.end();
          }
          else
          {
            const req = http.request(options, res => {
              console.log(`statusCode: ${res.statusCode}`);
              let data = '';
              res.on('data', chunk => {
                data += chunk;
              });
              res.on('end', async () => {
                  return resolve(JSON.parse(data));
              });
              res.on('error', (err) => {
                reject(err);
              })
            });
            req.on('error', error => {
              reject(error);
            });
            req.write(postData);
            req.end();
          }
      
    });
    return await p;
  }


   /**
   *
   * @param {String} source_vertex_type
   * @param {String} source_vertex_id
   * @param {String} edge_type
   * @param {String} target_vertex_type
   * @param {String} target_vertex_id
   * @param {JSON} attributes
   * 
   */
  async upsertEdge(source_vertex_type,source_vertex_id,edge_type,target_vertex_type, target_vertex_id, attributes){
    let p = new Promise((resolve, reject) => {
      let postData = {};
      postData["edges"] = {};
      postData["edges"][source_vertex_type] = {};
      postData["edges"][source_vertex_type][source_vertex_id] = {};
      postData["edges"][source_vertex_type][source_vertex_id][edge_type] = {};
      postData["edges"][source_vertex_type][source_vertex_id][edge_type][target_vertex_type] = {};
      postData["edges"][source_vertex_type][source_vertex_id][edge_type][target_vertex_type][target_vertex_id] = attributes;
      
      postData = JSON.stringify(postData);
      const options = {
        hostname: `${this.HOST}`,
        port: 9000,
        path: `/graph/${this.GRAPH}`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.TOKEN}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': postData.length
        }
      };
      if (this.USECERT == true) {
            const req = https.request(options, res => {
              console.log(`statusCode: ${res.statusCode}`);
              let data = '';
              res.on('data', chunk => {
                data += chunk;
              });
              res.on('end', async () => {
                // if (JSON.parse(data)["error"]) {
                //   console.error(JSON.parse(data)["message"]);
                // } else {
                  return resolve(JSON.parse(data));
                // }
              });
              res.on('error', (err) => {
                reject(err);
              })
            });
            req.on('error', error => {
              reject(error);
            });
            req.write(postData);
            req.end();
          }
          else
          {
            const req = http.request(options, res => {
              console.log(`statusCode: ${res.statusCode}`);
              let data = '';
              res.on('data', chunk => {
                data += chunk;
              });
              res.on('end', async () => {
                  return resolve(JSON.parse(data));
              });
              res.on('error', (err) => {
                reject(err);
              })
            });
            req.on('error', error => {
              reject(error);
            });
            req.write(postData);
            req.end();
          }
      
    });
    return await p;
  }



  statistic(seconds = 60, callback = (ans) => { console.log(ans); }) {
    if (seconds > 60 || seconds < 0) {
      console.error("Seconds must be between 0-60 inclusive.")
    } else {
      const options = {
        hostname: this.HOST,
        port: 9000,
        path: `/statistics/${this.GRAPH}?seconds=${seconds}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.TOKEN}`
        }
      }
      const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
        let data = '';
        res.on('data', chunk => {
          data += chunk;
        });
        res.on('end', async () => {
          return callback(JSON.parse(data));
        });
      });
      req.on('error', error => {
        console.error(error);
      });
      req.end();
    }
  }


  getEndpoints(callback = (ans) => { console.log(ans); }) {
    const options = {
      hostname: this.HOST,
      port: 9000,
      path: '/endpoints',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.TOKEN}`
      }
    }
    const req = https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)
      let data = '';
      res.on('data', chunk => {
        data += chunk;
      });
      res.on('end', async () => {
        return callback(JSON.parse(data));
      });
    });
    req.on('error', error => {
      console.error(error);
    });
    req.end();
  }

  version(callback = (ans) => { console.log(ans); }) {
    const options = {
      hostname: this.HOST,
      port: 9000,
      path: '/version',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.TOKEN}`
      }
    }
    const req = https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)
      let data = '';
      res.on('data', chunk => {
        data += chunk;
      });
      res.on('end', async () => {
        return callback(data);
      });
    });
    req.on('error', error => {
      console.error(error);
    });
    req.end();
  }

  /**
   * VERTICES
   */

  /**
   * 
   * @param {String} vertex 
   * @param {function} callback 
   */
  getVertices(vertex = "_", callback = (ans) => { console.log(ans); }) {
    const options = {
      hostname: `${this.HOST}`,
      port: 9000,
      path: `/graph/${this.GRAPH}/vertices/${vertex}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.TOKEN}`
      }
    };
    const req = https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)
      let data = '';
      res.on('data', chunk => {
        data += chunk;
      });
      res.on('end', async () => {
        if (JSON.parse(data)["error"]) {
          console.error(JSON.parse(data)["message"]);
        } else {
          return callback(JSON.parse(data)["results"]);
        }
      });
      res.on('error', (err) => {
        console.log(err);
      })
    });
    req.on('error', error => {
      console.error(error);
    });
    req.end();
  }

  /**
   * EDGES
   */

  /**
   * 
   * @param {String} vertex_type 
   * @param {String} vertex_id 
   * @param {String} edge 
   * @param {function} callback 
   */
  getEdges(vertex_type, vertex_id, edge = "_", callback = (ans) => { console.log(ans); }) {
    const options = {
      hostname: `${this.HOST}`,
      port: 9000,
      path: `/graph/${this.GRAPH}/edges/${vertex_type}/${vertex_id}/${edge}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.TOKEN}`
      }
    };
    const req = https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)
      let data = '';
      res.on('data', chunk => {
        data += chunk;
      });
      res.on('end', async () => {
        if (JSON.parse(data)["error"]) {
          console.error(JSON.parse(data)["message"]);
        } else {
          return callback(JSON.parse(data)["results"]);
        }
      });
      res.on('error', (err) => {
        console.log(err);
      })
    });
    req.on('error', error => {
      console.error(error);
    });
    req.end();
  }


  /**
   * QUERIES
   */


  showProcessesList(callback = (ans) => { console.log(ans); }) {
    const options = {
      hostname: `${this.HOST}`,
      port: 9000,
      path: `/showprocesslist`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.TOKEN}`
      }
    };
    const req = https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)
      let data = '';
      res.on('data', chunk => {
        data += chunk;
      });
      res.on('end', async () => {
        return callback(JSON.parse(data));
      });
      res.on('error', (err) => {
        console.log(err);
      })
    });
    req.on('error', error => {
      console.error(error);
    });
    req.end();
  }

  abortQuery(requestid = ["all"], callback = (ans) => { console.log(ans); }) {
    const options = {
      hostname: `${this.HOST}`,
      port: 9000,
      path: `/abortquery/${this.GRAPH}?requestid=${requestid.join("&")}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.TOKEN}`
      }
    };
    const req = https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)
      let data = '';
      res.on('data', chunk => {
        data += chunk;
      });
      res.on('end', async () => {
        return callback(JSON.parse(data));
      });
      res.on('error', (err) => {
        console.log(err);
      })
    });
    req.on('error', error => {
      console.error(error);
    });
    req.end();
  }

  // done
  async runQuery(queryname = "MyQuery", parameters = {}) {
    let p = new Promise((resolve, reject) => {

    let endpoints = `/query/${this.GRAPH}/${queryname}`;
    if (parameters != {}) {
      endpoints += "?";
      let c = 0;
      for (let i in parameters) {
        // console.log(i);
        endpoints += `${i}=${parameters[i]}&`;
      }
    }
    endpoints = endpoints.slice(0, -1);
    // console.log(endpoints);
    const options = {
      hostname: `${this.HOST}`,
      port: 9000,
      path: endpoints,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.TOKEN}`
      }
    };
    const req = https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)
      let data = '';
      res.on('data', chunk => {
        data += chunk;
      });
      res.on('end', async () => {
        if (JSON.parse(data)["error"]) {
          console.error(JSON.parse(data)["message"]);
          reject(JSON.parse(data)["message"]);
        } else {
          resolve(JSON.parse(data)["results"]);
        }
      });
      res.on('error', (err) => {
        console.log(err);
        reject(err);
      })
    });
    req.on('error', error => {
      console.error(error);
      reject(error);
    });
    req.end();
  });
  return await p;
  }

}

module.exports = TigerGraphConnection;
