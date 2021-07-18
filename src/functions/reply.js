
sendDm = async function(user, message) {
    try {
        await user.send(message);
    } catch(error) {}
}

exports.sendDm = sendDm;