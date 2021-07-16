const addRoleToUser = function(message, roleName) {
    let role = message.guild.roles.cache.find(r => r.name === roleName);
    let member = message.member;
    member.roles.add(role);
}

exports.addRoleToUser = addRoleToUser;