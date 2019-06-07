jQuery(document).ready(function() {
    console.log('document.ready');
  // TODO: implementation
  $.getJSON( "ajax/test.json", function( data ) {
    console.log(data);

    genMethodChart(data.distHttpMethods);
    genReqsPerMinChart(data.reqsPerMin);
    genCodeChart(data.distHttpCodeStats);
    genSizeChart(data.distBodySize);
  });
});

function genMethodChart(data){
  const labels = Object.keys(data);
  const items = Object.values(data);
  const ctx = document.getElementById('methodChart').getContext('2d');
  const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'pie',

    // The data for our dataset
    data: {
        labels: labels,
        datasets: [{
            label: 'Distribution of HTTP-Methods',
            backgroundColor: [
              'rgb(70, 70, 70)',
              'rgb(150, 150, 150)',
              'rgb(220, 220, 220)',
              'rgb(255, 99, 72)',
              'rgb(255, 99, 52)',
              'rgb(255, 99, 32)',
              'rgb(255, 99, 12)',
              'rgb(255, 99, 0)',
              'rgb(128, 99, 132)'
            ],
            borderColor: 'rgb(255, 99, 132)',
            data: items
        }]
    },

    // Configuration options go here
    options: {}
  });
}

function genReqsPerMinChart(data){
  const labels = Object.keys(data);
  const items = Object.values(data);
  const ctx = document.getElementById('requestsPerMinuteChart').getContext('2d');
  const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: labels,
        datasets: [{
            label: 'Requests per minute',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: items
        }]
    },

    // Configuration options go here
    options: {}
  });
}

function genCodeChart(data) {
  const labels = Object.keys(data);
  const items = Object.values(data);
  const ctx = document.getElementById('responseCodeChart').getContext('2d');
  const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'pie',

    // The data for our dataset
    data: {
        labels: labels,
        datasets: [{
            label: 'Distribution of Response-Code',
            backgroundColor: [
              'rgb(70, 70, 70)',
              'rgb(150, 150, 150)',
              'rgb(220, 220, 220)',
              'rgb(255, 99, 72)',
              'rgb(255, 99, 52)',
              'rgb(255, 99, 32)',
              'rgb(255, 99, 12)',
              'rgb(255, 99, 0)',
              'rgb(128, 99, 132)',
              'rgb(0, 0, 0)'
            ],
            borderColor: 'rgb(255, 99, 132)',
            data: items
        }]
    },

    // Configuration options go here
    options: {}
  });
}

function genSizeChart(data) {
  const labels = Object.keys(data);
  const items = Object.values(data);
  const ctx = document.getElementById('documentSizeChart').getContext('2d');
  const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: labels,
        datasets: [{
            label: 'Distribution of Body-Size',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: items
        }]
    },

    // Configuration options go here
    options: {}
  });
}
