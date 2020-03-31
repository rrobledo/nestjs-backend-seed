import * as casual from 'casual';
import * as loadtest from 'loadtest';
import { HttpService } from '@nestjs/common';
import configuration from './configuration';


let LOAD = configuration().load;
let SET_LOAD = configuration().set_load;
let REQUESTS = configuration().requests;
const ONLY_QUERY = configuration().only_query;
const CONCURRENCY = configuration().concurrency;

const URL_ITEMS = "http://localhost:3000/items";
const RUNS = LOAD.length;
let _runs = 0;
let times: Array<string> = [];
let percentiles: Array<string> = [];
let printData: Array<string> = [];
let printPercentiles: Array<string> = [];
let httpService = new HttpService();
let itemIds: Array<string> = [];

  function _afterEach(error:any, results: any) {
    if (error)
      return console.error(`Got an error: ${error}`);
    else if(results) {
      console.log(`LoadTest run successfully: ` +
      `\n- Total Errors: ${results.totalErrors}` +
      `\n- Total Requests: ${results.totalRequests}` +
      `\n- Total Time Seconds: ${results.totalTimeSeconds}` +
      `\n- Total Percentiles: ${JSON.stringify(results.percentiles)}` +
      `\n- Total RPS: ${results.rps}` +
      `\n- Total Mean Latency Ms: ${results.meanLatencyMs}` +
      `\n- Total Min Latency Ms: ${results.minLatencyMs}` +
      `\n- Total Max Latency Ms: ${results.maxLatencyMs}`);

      times.push(String(results.totalTimeSeconds).replace('.', ','));
      percentiles.push(results.percentiles['90']);
    }
  };

  function _postItems(done) {
    if(ONLY_QUERY) {
      done();
      return;
    }
    console.log("Post Items");
    itemIds = [];
      
    let options: loadtest.LoadTestOptions = {
      url: URL_ITEMS,
      method: 'POST',
      concurrency: CONCURRENCY,
      maxRequests: REQUESTS[_runs],
      requestGenerator: (params, opt, client, callback) => {
        
        let options = _getOptionsForItems();
        opt.headers = options.headers;
        opt.body = options.body;
        
        const request = client(opt, callback);
        request.write(JSON.stringify(opt.body));
        return request;
      }
    };

    loadtest.loadTest(options, (error, results) => {
      _afterEach(error, results);
      done();
    });
  }

  function _setLoad(done) {
    if(!SET_LOAD) {
      done();
      return;
    }
  }

  function _getOptionsForItems(){
    itemIds.push(casual.uuid);
        
    return {  
      headers:  {
        "Content-Type": "application/json"
      },
      body: {
        "id": itemIds[itemIds.length - 1],
        "type": "PERSON",
        "firstName": casual.first_name,
        "lastName": casual.last_name,
        "address": casual.address
      }
    };
  }
  
  function test() {
    console.log('Running Performance Tests with the following configuration:');
    console.log(configuration());

    function runtests () {
      _setLoad(function() {
        _postItems(function () {
          _runs++;
          if(_runs < RUNS) {
            runtests();
          }
          else {
            let printMessage = "";
            printData.forEach((element) => {
              printMessage += element;
            });
            console.log(printMessage);

            printMessage = "";
            printPercentiles.forEach((element) => {
              printMessage += element;
            });
            console.log(printMessage);
          } 
        });
      });      
    };
    
    printData.push(`\nrequests\tload\tconcurrency\ttime_query`);
    printPercentiles.push(`\nrequests\tload\tconcurrency\t90_perc_time_query`);
    runtests();
  };
  test();
