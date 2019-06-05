jQuery(document).ready(function() {
    console.log('document.ready');
  // TODO: implementation
  $.getJSON( "ajax/test.json", function( data ) {
    console.log(data);
    const labels = [];
    const items = [];
    $.each( data, function( key, val ) {
      labels.push(key);
      items.push(val);
    });
    console.log(items);
    genChart(items, labels);
  });
});

function genChart(data, labels){
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
            data: data
        }]
    },

    // Configuration options go here
    options: {}
  });
}
console.log('script.ready');