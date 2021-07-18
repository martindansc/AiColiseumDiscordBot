let info = `
Current competition: **AiColisuem 2021**

**Schedule**
July 16th, 14:00: Game release. We'll upload the rules and documentation.
July 17th, 13:59: Submission deadline for the 24h Challenge.
July 17th, 20:00: Stream of the 24h Challenge.
July 25th, 23:59: Submission deadline for the Sprint Tournament.
July 26th, 19:00: Stream of the Sprint Tournament.
August 1st, 23:59: Submission deadline for the Eduard Khil Tournament.
August 2nd, 19:00: Stream of the Eduard Khil Tournament.
August 8th, 23:59: Submission deadline for the Final Tournament.
August 9th, 19:00: Stream of the Final Tournament.

More info here: https://www.coliseum.ai/aicoliseum2021?lang=en&tournament=aic2021`;

module.exports = {
    name: 'info',
    description: 'Shows current relevant information',
    execute: (message) => {
        message.reply(info);
    }
};