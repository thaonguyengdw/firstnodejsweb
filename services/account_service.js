var passwordHash = require("password-hash");
var Promise = require("bluebird");
var models = require("../models");
var log4js = require("log4js");
var logger = log4js.getLogger("account-service");
var utils = require("../utils/utils");
exports.register = function (data) {
  logger.debug("register: ", data);
  var promise = new Promise(function (resolve, reject) {
    var password = data.password;
    var passwordHashed = passwordHash.generate(password);
    var userobj = {
      first_name: data.first_name,
      last_name: data.last_name,
      avatar: data.avatar,
      email: data.email,
      phone_number: data.phone_number,
      password: passwordHashed,
      status: true,
    };
    models.User.create(userobj)
      .then(function (userCreated) {
        resolve(utils.ResponseSuccess(userCreated));
      })
      .catch(function (error) {
        logger.error(error);
        reject(utils.ResponseError(error));
      });
  });
  return promise;
};

exports.login = function (data) {
  logger.debug("login", data);
  var result = { login: true };

  var promise = new Promise(function (resolve, reject) {
    var inputpassword = data.password;
    var inputemail = data.email;
    models.User.findOne({
      where: {
        email: inputemail,
        status: true
      },
    })
      .then(function (user) {
        if (user != null) {
          var hashedPassword = user.password;
          var verified = passwordHash.verify(inputpassword, hashedPassword);
          if (verified == true) {
            result.success = true;
            resolve(result);
          } else {
            result.success = false;
            resolve(result);
          }
        } else {
          result.success = false;
          resolve(result);
        }
      })
      .catch(function (error) {
        reject(error);
      });
  });
  return promise;
};

exports.users = function () {
  // logger.debug('listuser', data);
  var result = { listuser: true };
  var promise = new Promise(function (resolve, reject) {
    models.User.findAll({})
      .then(function (users) {
        console.log("User", users);
        if (users != null) {
          result.success = true;
          result["users"] = users;
          resolve(result);
        } else {
          result.success = false;
          resolve(result);
        }
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
        // console.log(error);
      });
  });
  return promise;
};

exports.detailuser = function (user_id) {
  var result = { detailuser: true };
  var promise = new Promise(function (resolve, reject) {
    models.User.findOne({
      where: { id: user_id },
    })
      .then(function (user) {    
        resolve({ data: user });
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
  return promise;
};

exports.edituser = function (user_id, data) {
  var result = { edituser: true };
  var promise = new Promise(function (resolve, reject) {
    models.User.findOne({
      where: { id: user_id },
    })
      .then(function (user) {
        if (user != null) {
          //update user data here
          const newHashPassword = passwordHash.generate(data.password);
          const newUser = {
            ...data,
            password: newHashPassword,
          };
          models.User.update(newUser, {
            where: { id: user_id },
          })
          .then(function (user) {
            resolve({ data: user });
          });
        } else {
          reject(null);
        }
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });

  return promise;
};

exports.userdelete = function (user_id) {
console.log('userdelete:', user_id);
  var promise = new Promise(function (resolve, reject) {
    models.User.destroy({
      where: { id: user_id },
    })
      .then(function (user) {
        resolve(utils.ResponseSuccess(user));
      })
      .catch(function (error) {
        console.log(error);
        reject(utils.ResponseError(error));
      });
  });
  return promise;
}; 

exports.deactivate = function(user_id) {
  var promise = new Promise(function (resolve, reject){
    models.User.findOne({
      where: {id: user_id},
    })
    .then(function (user){
      const updatedUser = {
        status: false,
      }
      models.User.update(updatedUser, {
        where: {id: user_id},
      })
      .then(function (user){
        resolve(user);
      })
      .catch(function(err){
        console.log(err);
        reject(err);
      })
    });
  });
  return promise;
};

exports.activate = function(user_id){
  var promise = new Promise(function( resolve, reject){
    models.User.findOne({
      where: {id: user_id},
    })
    .then( function (user) {
      const updatedUser = {
        status: true,
      }
      models.User.update(updatedUser,{ 
        where: {id: user_id}
      })
      .then(function(user){
        resolve(user);
      })
      .catch(function(err){
        console.log(err);
        reject(err);
      })
    });
  });
  return promise;
};


