const https = require('https');

const url = "https://serpapi.com/search.json?engine=google_translate&q=bonjour+tout+le+monde&source=fr&target=en&api_key=5431d10dff6086977061091d1cd94e728d6a13d73babb0ee3d30796d0758bf91";

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log(JSON.stringify(JSON.parse(data), null, 2));
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
