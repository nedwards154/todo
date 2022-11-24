
exports.getDate = function() {
    let today  = new Date();

    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };

    today = today.toLocaleDateString("en-US", options)

    return today
}

exports.getDay = function() {
    let today  = new Date();

    const options = { 
        weekday: 'long', 
    };

    today = today.toLocaleDateString("en-US", options)

    return today
}    