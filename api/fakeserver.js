// Fake server to simulate API responses.

(function() {

  sinon.FakeXMLHttpRequest.useFilters = true;
  sinon.log = console.log.bind(console);

  var overrideOffline = true;

  var server = sinon.fakeServer.create();

  server.autoRespond = true;
  server.autoRespondAfter = 5;  // Increase this to model server latency

  sinon.FakeXMLHttpRequest.addFilter(function(method, url, async, username, password) {
    // return truthy iff url does not start '/api/'
    var matchesApiUrl = /^\/api\//.test(url);
    if (matchesApiUrl) {
      console.log('Sinon request caught: ' + method + ' ' + url);
    }

    return !matchesApiUrl;
  });

  // parseQueryString takes a callback and returns a function that calls the callback after having parsed the query params into an object
  var parseQueryString = function(queryString) {
    // Convert a query string to an object hash of key/value pairs
    // Any duplicated keys will be overwritten
    var queries = {};
    var queryArr = queryString.split('&');
    var i, len, q;

    for (i = 0, len = queryArr.length; i < len; i ++) {
      q = queryArr[i].split('=');
      queries[q[0]] = q[1];
    }

    return queries;
  };

  // respondWith takes arguments similar to $.ajax:
  // type: an HTTP verb (e.g. GET, POST)
  // url: the url to match (e.g. /api/animals.json)
  // contentType: the content type of the returned data (e.g. application/json)
  // headers: an object containing the headers returned by the fake server
  // status: the status code to return (e.g. 200). Optional; defaults to 200.
  // responseText: either the string returned by the fake server, or a function
  // if responseText is a function, it takes the request and must return an object. The returned object must contain responseText and may contain status, contentType and headers.
  var respondWith = function(options) {

    server.respondWith(options.type, options.url, function() {
      var xhr = arguments[0];
      var status, headers, body;

      if(!overrideOffline && !navigator.onLine) {
        status = 404;
        body = "";

      } else {
        body = options.body;

        if(typeof body === 'function') {
          // Call the function, to return the responseText.
          body = body.apply(this, Array.prototype.slice.apply(arguments));
        }

        if (typeof body !== 'string') {
          body = JSON.stringify(body);
        }
      }

      // Send the response
      status = options.status || 200;

      headers = options.headers || {};
      headers.contentType = 'application/json';

      console.log("Sinon: sending response: ", status, headers, body);

      xhr.respond(status, headers, body);

    });
  };


  /************** RESPONSES GO HERE **************/

  var animals = {
    'lion': {
      "name": "Lion",
      "description": "The lion (Panthera leo) is one of the four big cats in the genus Panthera, and a member of the family Felidae. With some males exceeding 250 kg (550 lb) in weight,[4] it is the second-largest living cat after the tiger. Wild lions currently exist in Sub-Saharan Africa and in Asia with an endangered remnant population in Gir Forest National Park in India, having disappeared from North Africa and Southwest Asia in historic times. Until the late Pleistocene, about 10,000 years ago, the lion was the most widespread large land mammal after humans. They were found in most of Africa, across Eurasia from western Europe to India, and in the Americas from the Yukon to Peru.[5] The lion is a vulnerable species, having seen a possibly irreversible population decline of thirty to fifty percent over the past two decades in its African range.[2] Lion populations are untenable outside designated reserves and national parks. Although the cause of the decline is not fully understood, habitat loss and conflicts with humans are currently the greatest causes of concern. Within Africa, the West African lion population is particularly endangered.",
      "img":"http://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Lion_waiting_in_Namibia.jpg/250px-Lion_waiting_in_Namibia.jpg"
    },
    'honey-badger': {
      "name": "Honey Badger",
      "description": "The honey badger (Mellivora capensis), also known as the ratel, is a species of mustelid native to Africa, Southwest Asia, and the Indian Subcontinent. Despite its name, the honey badger does not closely resemble other badger species, instead it bears more anatomical similarities to weasels. It is classed as Least Concern by the IUCN owing to its extensive range and general environmental adaptations. It is primarily a carnivorous species, and has few natural predators because of its thick skin and ferocious defensive abilities.",
      "img": "http://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Honey_badger.jpg/220px-Honey_badger.jpg"
    },
    'elephant': {
      "name": "Elephant",
      "description": "Elephants are large land mammals in two extant genera of the family Elephantidae: Elephas and Loxodonta, with the third genus Mammuthus extinct.[1] Three species of elephant are recognized: the African bush elephant, the African forest elephant and the Indian or Asian elephant;[2] although some group the two African species into one[3] and some researchers also postulate the existence of a fourth species in West Africa.[4] All other species and genera of Elephantidae are extinct. Most have been extinct since the last ice age, although dwarf forms of mammoths might have survived as late as 2,000 BCE.[5] Elephants and other Elephantidae were once classified with other thick-skinned animals in a now invalid order, Pachydermata.",
      "img": "http://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/180px-African_Bush_Elephant.jpg"
    },
    'black-rhino': {
      "name": "Black Rhinoceros",
      "description": "The black rhinoceros (Diceros bicornis) is a large, thick-skinned herbivore having one or two upright horns on the nasal bridge. Rhinoceros may refer to either black or white rhinoceros. Among Big Five game hunters, the black rhinoceroses are preferred, although it is now critically endangered.",
      "img":"http://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Black_rhinos_in_crater.jpg/320px-Black_rhinos_in_crater.jpg"
    },
    'cape-buffalo': {
      "name": "Cape Buffalo",
      "description": "The African or Cape buffalo (Syncerus caffer) is a large horned bovid. Buffalo are sometimes reported to kill more people in Africa than any other animal, although the same claim is also made of hippos and crocodiles.[6] It is considered the most dangerous of the Big Five, reportedly causing the most hunter deaths, with wounded animals reported to ambush and attack pursuers.",
      "img":"http://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/African_Buffalo.JPG/320px-African_Buffalo.JPG"
    },
    'leopard': {
      "name": "Leopard",
      "description": "The leopard (Panthera pardus) is a large, carnivorous feline having either tawny fur with dark rosette-like markings or black fur. Of the Big Five, it is most difficult to acquire hunting licenses for leopards. The leopard is sometimes considered the most difficult of the Big Five to hunt because of their nocturnal and secretive nature. They are wary of humans and will take flight in the face of danger. The leopard is solitary by nature, and is most active between sunset and sunrise, although it may hunt during the day in some areas. Leopards can be found in the savanna grasslands, brush land and forested areas in Africa.",
      "img": "http://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Leopard_africa.jpg/360px-Leopard_africa.jpg"
    }
  };

  respondWith({
    type: 'GET',
    url: '/api/animals',
    status: 200,
    body: function(xhr, id) {
      var n, a = [];
      for (n in animals) {
        if (animals.hasOwnProperty(n)) {
          a.push({
            'id': n,
            'name': animals[n].name
          });
        }
      }
      return a;
    }
  });

  respondWith({
    type: 'GET',
    url: /\/api\/animals\/(.+)/,
    status: 200,
    body: function(xhr, id) {
      return animals[id];
    }
  });

  // Example of query string parsing
  respondWith({
    type: 'GET',
    url: /\/api\/search\?(.*)/,
    status: 200,
    body: function(xhr, query) {
      // Expecting '/api/search?name=lion'
      var resp;
      query = parseQueryString(query);
      if (query.name) {
        resp = animals[query.name];
      }

      if (!resp) {
        resp = { error: "Could not find animal." };
      }

      return resp;
    }
  });

})();
