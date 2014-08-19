var request = require('request'),
    async = require('async'),
    fs = require('fs');

var email_address = '**Your Zendesk login email**',
    password = '**Your Zendesk Password**',
    ticket_url = 'https://**YOUR ZENDESK TICKET URL**/api/v2/tickets/:ticket_id/comments.json';
    
/** Fired off of a previous ticket json dump needs polishing
var obj = JSON.parse(fs.readFileSync('tickets_zendesk.json', 'utf8'));
var clone_of_obj = JSON.parse(fs.readFileSync('tickets_zendesk.json', 'utf8'));
**/
var output = [];

console.log(obj.results.length);  

obj.results.forEach(function(el, idx){
  console.log(el.id, idx);
  getDetails(idx, el);
});



function getDetails(idx,el) {

  var options = {
    url: ticket_url.replace(':ticket_id', el.id),
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      'user': email_address,
      'pass': password
    }
  };

  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      el.comments = info;
      fs.writeFileSync('./details/'+el.id+'_ticket_comment.json', JSON.stringify(el));
    } else {
      console.log(error);
    }
  });
}