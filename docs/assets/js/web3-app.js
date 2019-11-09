/*jshint esversion: 8 */
// default Account: 0x08427F4196800c59c925cb1D0c1BcfcB759f13C6

App = {
  account: '',
  address: '0x688673f42d532277ea8ddf172e9fada75947f46d',
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

  get_balance: function(cb) {
    web3.eth.getBalance(App.account, cb);
  },

  init_contract: function(run) {
    $.getJSON( "../build/contracts/erc20.json", function( jsonInterface ) {
      //console.log(jsonInterface);
      App.contract = web3.eth.contract(jsonInterface.abi).at(App.address);
      App.account = web3.eth.defaultAccount;
      App.options.from = web3.eth.defaultAccount;
      console.log(App.contract);
      run();
    });
  },

  addCompany: async function(companyName, amount) {
    options = {
      from: App.account,
      value: amount
    };
    await promisify(cb => App.contract.addCompany(companyName, options, cb));
  },

  addEmployee: async function(empAddr, name, homeCity) {
    await promisify(cb => App.contract.addEmployee(empAddr, name, homeCity, App.options, cb));
  },

  addServiceProvider: async function(name, location, category) {
    await promisify(cb => App.contract.addServiceProvider(name, location, category, App.options, cb));
  },

  refillAccount: async function() {
    await promisify(cb => App.contract.refillAccount(App.options, cb));
  },

  addClaim: async function(employeeAddress, city, priceLimit, startTime, endTime, category) {
    await promisify(cb => App.contract.addClaim(employeeAddress, city, priceLimit, startTime, endTime, category, App.options, cb));
  },

  payServiceProvider: async function(serviceProvider, amount) {
    await promisify(cb => App.contract.payServiceProvider(serviceProvider, amount, App.options, cb));
  },

  allCompanies: async function(address){
	return promisify(cb => App.contract.allCompanies(address, App.options, cb));
	},
  allEmployees: async function(address){
	return promisify(cb => App.contract.allEmployees(address, App.options, cb));
	},
  allServiceProviders: async function(address){
	return promisify(cb => App.contract.allServiceProviders(address, App.options, cb));
	},
  allClaims: async function(address){
	return promisify(cb => App.contract.allClaims(address, App.options, cb));
  },
  getEmployees: async function() {
    return promisify(cb => App.contract.getEmployees(App.options, cb));
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
