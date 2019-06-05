jQuery(document).ready(function() {
    console.log('document.ready');
  // TODO: implementation
  $.getJSON( "ajax/test.json", function( data ) {
    const items = [];
    $.each( data, function( key, val ) {
      items.push( "<li id='" + key + "'>" + val + "</li>" );
    });

    $( "<ul/>", {
      "class": "my-new-list",
      html: items.join( "" )
    }).appendTo( "body" );
  });
});
console.log('script.ready');