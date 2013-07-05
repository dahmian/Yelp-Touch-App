function displayResults(data, textStats, XMLHttpRequest) {
  console.log(data);
  var formattedResults = format(data);
  var renderedResults = render(formattedResults);
  document.querySelector("#searchResults").innerHTML = renderedResults;

  function format(data) {
    data.businesses.sort(sortHighestToLowest);
    data.businesses.filter(removeClosedStores);
    data.businesses.forEach(convertDistanceMetersToMiles);
    return data;

    function sortHighestToLowest(a, b) {
      if (a.rating < b.rating) {
        return 1;
      } else if (a.rating > b.rating) {
        return -1
      } else {
        return 0
      }
    }

    function removeClosedStores(element, index, array) {
      if (element.is_closed === false) {
        return element.is_closed;
      }
    }

    function convertDistanceMetersToMiles(element, index, array) {
      var miles = element.distance * 0.000621371;
      var roundedMiles = Math.round(miles * 10) /10;
      var formattedString = roundedMiles + " miles";
      element.distance = formattedString;
    }
  }

  function render(data) {
    var compiledTemplate = Mustache.compile("{{#businesses}}<p>{{rating}} <a href={{url}}>{{name}}</a> {{distance}}</p>{{/businesses}}");
    return compiledTemplate(data);
  }
}
