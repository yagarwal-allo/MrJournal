import { z } from 'zod';

const USER_JOURNAL: string[] = []

const addLogTool = {
  description: `Adds the log to the user's journal.`,
  parameters: z.object({
    log: z.string().describe('The task or thought or log user is trying to journal'),
  }),
  execute: async ({ log }: { log: any }) => {
    USER_JOURNAL.push(log)
    return USER_JOURNAL
  }
}

const listLogsTool = {
  description: `Lists the log in the user's journal.`,
  parameters: z.object({}),
  execute: async ({ }) => {
    return USER_JOURNAL
  }
}

export const tools = {
  addLog: addLogTool,
  listLogs: listLogsTool
}