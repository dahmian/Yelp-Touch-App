function search(terms, callback) {

  alert(terms);
  var accessor = {
    consumerSecret: auth.consumerSecret,
    tokenSecret: auth.accessTokenSecret
  };

  parameters = [
    ["term", terms],
    ["ll", "33.777010600000004,-107.9136227"],
    ["callback", "cb"],
    ["oauth_consumer_key", auth.consumerKey],
    ["oauth_consumer_secret", auth.consumerSecret],
    ["oauth_token", auth.accessToken],
    ["oauth_signature_method", "HMAC-SHA1"]
  ];

  var message = { 
    action: "http://api.yelp.com/v2/search",
    method: "GET",
    parameters: parameters 
  };

  OAuth.setTimestampAndNonce(message);
  OAuth.SignatureMethod.sign(message, accessor);

  var parameterMap = OAuth.getParameterMap(message.parameters);
  parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)

  $.ajax({
    url: message.action,
    data: parameterMap,
    cache: true,
    dataType: "jsonp",
    jsonpCallback: "cb",
    success: callback 
  });
  return false;
}
