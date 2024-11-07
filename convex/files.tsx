import {v} from 'convex/values';
import { mutation, query } from './_generated/server';

export const createFile = mutation({
    args:{
        fileName: v.string(),
        teamId: v.string(),
        createdBy: v.string()
    },

    handler: async (ctx, args) => {
        return await ctx.db.insert('files', args);
    }
})