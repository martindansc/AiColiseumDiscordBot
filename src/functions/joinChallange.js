const { addRoleToUser, createRole, getUserRoles, removeRole } = require('./rolesFunctions');
const Config = require('../config');

const joinChallange = async function (member, guild, competition) {

    if(competition !== 'AiChallange' && competition !== 'AiColiseum') {
        throw 'Invalid competition:' + competition;
    }

    const yearCompetition = competition + Config.currentYear;

    let yearCompetitionRole =  {
        name: yearCompetition
    }
    yearCompetitionRole.color = competition == 'AiColiseum' ? 'BLUE' : 'GREEN'

    await createRole(guild, yearCompetitionRole);
    await addRoleToUser(member, guild, yearCompetition);

    let mainCompetitionRole =  {
        name: competition
    }
    mainCompetitionRole.color = yearCompetitionRole.color;

    await createRole(guild, mainCompetitionRole);
    await addRoleToUser(member, guild, competition);
}

const leaveChallange = async function(member, guild) {
    const userRoles = await getUserRoles(member);
    for(const [roleId, userRole] of userRoles) {
        if(userRole.name.startsWith('AiChallange') || userRole.name.startsWith('AiColiseum')) {
            await removeRole(member, userRole);
        }
    }
}

exports.joinChallange = joinChallange;
exports.leaveChallange = leaveChallange;