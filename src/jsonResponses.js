const users = {};


const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

// function to respond without json body
// takes request, response and status code
const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// return user object as JSON
const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };
  respondJSON(request, response, 200, responseJSON);
};

const getUsersMeta = (request,response)=>{
  respondJSONMeta(request, response, 200);
}

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };
  respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) =>{
    respondJSONMeta(request,response,404);
}

// function to add a user from a POST body
const addUser = (request, response, body) => {
  // default json message
  const responseJSON = {
    message: 'Name and age are both required.',
  };


  if (!body.name || !body.age) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  // default status code to 201 created
  let responseCode = 201;

  // if that user's name already exists in our object
  // then switch to a 204 updated status
  if (users[body.name]) {
    responseCode = 204;
  } else {
    // otherwise create an object with that name
    users[body.name] = {};
  }

  // add or update fields for this user name
  users[body.name].name = body.name;
  users[body.name].age = body.age;


  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};



const updateUser = (request,response)=>{
  const newUser = {
    createdAt: Date.now(),
  };

  // modifying our dummy object
  // just indexing by time for now
  users[newUser.createdAt] = newUser;

  //return a 201 created status
  return respondJSON(request, response, 201, newUser);
}

// public exports
module.exports = {
    getUsers,
    getUsersMeta,
    addUser,
    notFoundMeta,
    notFound,
};
