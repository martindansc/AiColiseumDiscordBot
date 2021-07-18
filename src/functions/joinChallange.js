const { addRoleToUser, createRole, getUserRoles, removeRole } = require('./rolesFunctions');
const {sendDm} = require('./../functions/reply')
const Config = require('../config');

const joinChallange = async function (member, guild, competition) {

    if(competition == 'easterEgg') {
        await createRole(guild, {name: 'EasterEggHunterHunter', color: 'DARK_PURPLE'});
        await addRoleToUser(member, guild, 'EasterEggHunterHunter');
        return;
    }

    if(competition !== 'AIChallange' && competition !== 'AIColiseum') {
        throw 'Invalid competition:' + competition;
    }

    const yearCompetition = competition + Config.currentYear;

    let yearCompetitionRole =  {
        name: yearCompetition
    }
    yearCompetitionRole.color = competition == 'AIColiseum' ? 'BLUE' : 'GREEN'

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
        if(userRole.name.startsWith('AIChallange') || userRole.name.startsWith('AIColiseum')) {
            await removeRole(member, userRole);
        }
    }
}

exports.joinChallange = joinChallange;
exports.leaveChallange = leaveChallange;