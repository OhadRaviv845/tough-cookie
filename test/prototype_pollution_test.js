const assert = require('assert');
const tough = require('tough-cookie');
const vows = require('vows'); // Make sure to require 'vows'

// Create a new cookie jar instance for the test
const jar = new tough.CookieJar(undefined, {
  rejectPublicSuffixes: false
});

// Define the test scenario
vows.describe('Prototype Pollution Test')
  .addBatch({
    'When setting a cookie with the domain __proto__': {
      topic: function() {
        // Attempt to pollute the prototype with a cookie
        jar.setCookieSync(
          "Slonser=polluted; Domain=__proto__; Path=/notauth",
          "https://__proto__/admin"
        );
        jar.setCookieSync(
          "Auth=Lol; Domain=google.com; Path=/notauth",
          "https://google.com/"
        );
        return {}; // return an empty object to check pollution
      },
      'should not pollute the prototype': function(topic) {
        const pollutedObject = topic;
        assert(pollutedObject["/notauth"] === undefined, 'Prototype pollution was successful');
      }
    }
  })
  .export(module);