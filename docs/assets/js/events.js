/*jshint esversion: 8 */
function test(a){
  return a;
}

Events = {
  listenTransfer: async function(companyAddress, run) {
    filter = {companyAddress: companyAddress};
    additionalFilter = {fromBlock: 0, toBlock: 'latest'};
    transferEvent = App.contract.transfer(filter, additionalFilter);
    transferEvent.watch(function(error, result){
     if (!error){
       console.log("Transfer Event:");
       console.log(result);
       run(result);
     }
    });
  },

  listenTransferForProvider: async function(providerAddress, run) {
    filter = {serviceProvider: providerAddress};
    additionalFilter = {fromBlock: 0, toBlock: 'latest'};
    transferEvent = App.contract.transfer(filter, additionalFilter);
    transferEvent.watch(function(error, result){
     if (!error){
       console.log("Transfer Event:");
       console.log(result);
       run(result);
     }
    });
  },

  listenClaim: async function(companyAddress, run) {
    filter = {companyAddress: companyAddress};
    additionalFilter = {fromBlock: 0, toBlock: 'latest'};
    transferEvent = App.contract.claim(filter, additionalFilter);
    transferEvent.watch(function(error, result){
     if (!error){
       console.log("Claim Event:");
       console.log(result);
       run(result);       
     }
    });
  },

  init_events: async function() {
      console.log("Events are initialised!!");
      Events.listenTransfer(App.account, test);
      Events.listenClaim(App.account, test);
  }

};
