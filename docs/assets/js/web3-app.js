/*jshint esversion: 8 */
// default Account: 0x08427F4196800c59c925cb1D0c1BcfcB759f13C6

App = {
  account: '',
  address: '0x7f36566ec1bcecd538f5dda833e09e16f36a59b3',
  contract: '',
  options: {
    from: this.account
  },

  init: async function(run) {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      console.log("Metamask Unavailable");
      return;
    }
    await ethereum.enable();
    return App.init_contract(run);
  },

  getBalance: async function() {
    return await promisify(cb => web3.eth.getBalance(App.account, cb));
  },

  init_contract: function(run) {
    $.getJSON( "../build/payMusician.json", function( jsonInterface ) {
      //console.log(jsonInterface);
      App.contract = web3.eth.contract(jsonInterface.abi).at(App.address);
      App.account = web3.eth.defaultAccount;
      App.options.from = web3.eth.defaultAccount;
      console.log(App.contract);
      run();
    });
  },

  addProject: async function(name, hash, collaborators) {
    console.log("Register Web3 Project");
    await promisify(cb => App.contract.addProject(name, hash, collaborators, App.options, cb));
  },

  payProject: async function(hash, payee, amount) {
    options = {
      from: App.account,
      value: eth_to_wei(amount)
    };
    await promisify(cb => App.contract.payProject(hash, payee, options, cb));
  },

  getProject: async function(hash) {
    console.log("Get Web3 Project ");
    return await promisify(cb => App.contract.getProject(hash, App.options, cb));
  },

  getHash: async function(name) {
    console.log("Get Web3 Project ");
    return await promisify(cb => App.contract.getHash(name, App.options, cb));
  }

};

// Util to make async calls into promises
promisify= (inner) =>
    new Promise((resolve, reject) =>
        inner((err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    );

function wei_to_eth(wei) {
  return wei / 1000000000000000000;
}

function eth_to_wei(eth) {
  return eth * 1000000000000000000;
}

function formatPrice(wei) {
  return 'Ξ' + wei;
}
