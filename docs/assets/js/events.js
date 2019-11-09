/*jshint esversion: 8 */

Events = {
  listenPay: async function(run) {
    filter = { onwer: App.account};
    additionalFilter = {fromBlock: 0, toBlock: 'latest'};
    payEvent = App.contract.pay(filter, additionalFilter);
    payEvent.watch(function(error, result){
     if (!error){
       console.log("Transfer Event:");
       console.log(result);
       run(result);
     }
    });
  }
};
