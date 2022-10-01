import { CommandDefinition } from '../lib/command';
import Logger from '../lib/logger';
import { ping } from './utils/ping';
import { faq } from './support/faq'
import { rules } from './moderation/rules'

const commands: CommandDefinition[] = [
    ping,
    faq,
    rules,

];

const commandsObject: { [k: string]: CommandDefinition } = {};

for (const def of commands) {
    for (const name of (typeof def.name === 'string' ? [def.name] : def.name)) {
        if (commandsObject[name]) {
            Logger.warn(`Duplicate command/alias inserted: ${name}`);
        }
        commandsObject[name] = def;
    }
}

export default commandsObject;
