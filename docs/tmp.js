function appendRow(table, data) {
      tr = document.createElement('tr')
      data.forEach(item => {
        td = document.createElement('td')
        td.appendChild(document.createTextNode(item))
        tr.appendChild(td)
      })
      table.appendChild(tr)
    }

    async function updateBalanceStats() {
      company = await App.allCompanies(App.account)
      console.log(company)
      balance = company[1]
      console.log('balance: ', balance)
      document.getElementById('balance').textContent = formatPrice(balance)      
    }

    function updateClaimsStats(claims) {
      claims = claims.map(claim => parseInt(claim['args']['budget']))
      console.log('updateClaims', claims)
      sum = claims.reduce((total, num) => total + num);
      console.log('sum', sum)
      document.getElementById('claims_amount').textContent = formatPrice(parseInt(sum))
    }

    function updateTransfersStats(transfers) {
      const _transfers = transfers.map(transfer => parseInt(transfer['event']['args']['amount']))
      console.log('updateTransfers', _transfers)
      sum = _transfers.reduce((total, num) => total + num);
      console.log('sum', sum)
      document.getElementById('spent_amount').textContent = formatPrice(sum)
    }

    function updateLineChart(claims) {
      console.log('claims', claims)
      const claimsByMonth = {};

      dataDailySalesChart = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
      };


      claims.forEach(item => {
        const startTime = item['args']['startTime']
        const month = moment.unix(startTime).format('M') - 1
        dataDailySalesChart.series[0][month] = dataDailySalesChart.series[0][month] + parseInt(item['args']['budget'])
      })        

      console.log(dataDailySalesChart)
      
      max = Math.max(...dataDailySalesChart.series[0]) + 1000

      optionsDailySalesChart = {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        low: 0,
        high: max, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 10
        },
      }

      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      md.startAnimationForLineChart(dailySalesChart);
    }

    function updatePieChart(transfers) {      
      transfersByGroup = {};
      transfers.forEach(item => {
        group = item['serviceProvider'][2]
        transfersByGroup[group] = transfersByGroup[group] || [];
        transfersByGroup[group].push(item['event'])
      })
      var data = {
        labels: [],
        series: []
      };
      for (group in transfersByGroup) {
        data.labels.push(group)
        data.series.push(transfersByGroup[group].length)
      }
      
      
      var options = {      
      };

      new Chartist.Pie('#piechart', data, options);
    }

      async function onWeb3Initialized(){
        await updateBalanceStats()

        console.log("Web3");

        console.log('account: ' + App.account)
        employees = await App.getEmployees()        
        employees = await Promise.all(employees.map(async function (employee) {
          console.log(employee)
          return {address: employee, employee: await App.allEmployees(employee)}
        }))        

        console.log(employees)

        employees.forEach((item) => {
          table = document.getElementById('table_employees')
          address = item.address
          employee = item.employee          
          appendRow(table, [employee[1], employee[2], address])          
        })        

        console.log('#employees: ' + employees.length)
        document.getElementById('employees_count').textContent = employees.length

        claims = []
        transfers = []

        Events.listenClaim(App.account, async function (claim) {          
          console.log('claim', claim)
          if (claims.filter(item => item['blockHash'] == claim['blockHash']).length > 0) {
            console.log('claim already present')
            return
          }
          claims.push(claim)
          const table = document.getElementById('table_claims')
          const args = claim['args']
          const employee = await App.allEmployees(args['employeeAddress'])
          row = [
            employee[1], 
            formatPrice(args['budget']), 
            args['city'], 
            moment.unix(args['startTime']).format('LL'), 
            moment.unix(args['endTime']).format('LL'),
            args['category']
          ]
          appendRow(table, row)          
          updateClaimsStats(claims)
          updateLineChart(claims)
        })

        Events.listenTransfer(App.account, async function (event) {
          console.log('transfer ', event)
          
          const table = document.getElementById('table_transfers')
          const args = event['args']

          serviceProvider = await App.allServiceProviders(args['serviceProvider'])          
          serviceProviderName = serviceProvider[1]
          city = serviceProvider[2]          

          transfers.push({event: event, serviceProvider: serviceProvider})

          const employee = await App.allEmployees(args['employeeAddress'])
          row = [
            employee[1],             
            formatPrice(args['amount']), 
            serviceProviderName, 
            city,
            moment.unix(args['now']).format('LLL')
          ]
          appendRow(table, row)
          updateTransfersStats(transfers)
          updatePieChart(transfers)
        })
      }