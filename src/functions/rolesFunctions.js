const getRoleByName = async function(guild, roleName) {
    let role = guild.roles.cache.find(r => r.name === roleName);
    return role;
}

const addRoleToUser = async function(member, guild, roleName) {
    let role = await getRoleByName(guild, roleName);
    await member.roles.add(role);
}

const userHasRole = async function(member, guild, roleName) {
    let role = await getRoleByName(guild, roleName);
    await member.roles.has(role);
}

const removeRole = async function(member, role) {
    await member.roles.remove(role);
}

const getUserRoles =  async function(member) {
    await member.fetch();
    return member.roles.cache;
}

/* data
    name: String
    color: String
*/
const createRole = async function(guild, data) {
    let role = await getRoleByName(guild, data.name);
    if(!role) {
        await guild.roles.create({
            data
        });
        role = await getRoleByName(guild, data.name);
    }
    return role;
}

exports.addRoleToUser = addRoleToUser;
exports.createRole = createRole;
exports.getRoleByName = getRoleByName;
exports.userHasRole = userHasRole;
exports.removeRole = removeRole;
exports.getUserRoles = getUserRoles;