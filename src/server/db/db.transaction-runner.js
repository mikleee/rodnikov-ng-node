const db = require('./db');


async function withTransaction(fn) {
    const session = await (await db).startSession();
    const result = await session.withTransaction(async () => {
        return await fn();
    });
    await session.endSession();
    return result;
}

module.exports = withTransaction