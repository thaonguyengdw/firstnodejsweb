exports.ResponseSuccess = function (data = null, message = null) {
    if (data == null)
        return {
            "success": true
        };
    else
    //console.log(data);
        return {
            "success": true,
            "data": data,
            "message": message
        };
}

exports.ResponseError = function (error = null, errorMessage) {

    return {
        "success": false,
        message: errorMessage,
        data: error
    }

}

exports.BuildRenderData = function(req, data){
    var sessionObject = buildSessionData(req);
    data["session"] = sessionObject;
    return data;
}

exports.BuildSessionData = buildSessionData;

function buildSessionData(req){
    var sessionObject = {};
    var session = req.session;
    var is_admin = false;
    var is_editor = false;
    if(session.roles !=null && session.roles){
        var roles = session.roles;
        roles.forEach(role => {
            if(role == 'Admin'){
                is_admin = true;
            }
            if(role == 'Editor'){
                is_editor = true;
            }
        });
        sessionObject["is_admin"] = is_admin;
        sessionObject["is_editor"] = is_editor;
        return sessionObject;
    }
}

exports.clone = function (obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}