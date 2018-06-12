var request = require('request');
var fs = require('fs');
var token = require('./secrets');
var owner = process.argv[2, 3];
var name = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

if (!owner || !name) {
  console.log("Please enter owner and name");
} else {

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': token
    }
  };

  request(options, function(err, res, body) {
    var result = JSON.parse(body);

    cb(err, result);
    // var paths = [];
    // for (var i = 0; i < result.length; i++) {
    //   // console.log(result[i].avatar_url);
    //   paths.push(result[i].login);
    // }
    // console.log(paths);
    // return paths;
  });
}

function downloadImageByURL(url, filePath) {
    request.get(url)
    .on('error', function(err) {
      throw err;
    })

    .on('response', function (response) {
      console.log('Downloading image...');
    })
    .on('end', function(){
      console.log('Download complete.');
    })
    .pipe(fs.createWriteStream(filePath));

}

// downloadImageByURL(avatars, paths);
// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");

getRepoContributors(owner, name, function(err, result) {
  console.log("Errors:", err);
  //var paths = [];
  //var avatars = [];
  for (var i = 0; i < result.length; i++) {
    var url = result[i].avatar_url;
    var filePath = "./avatars/"+result[i].login+".jpg";
    // console.log(result[i].avatar_url);
    //paths.push("avatar/" + result[i].login + ".jpeg");
    //avatars.push(result[i].avatar_url);
    downloadImageByURL(url, filePath);
  }
  //console.log(paths);
  //console.log(avatars);
  //return paths avatars;
  // console.log("Result:", result);
});
}