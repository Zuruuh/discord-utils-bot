import type { Translation } from "$types/langs";

export const Language = {
  name: "English",
  code: "en-US",
  common: {
    success: "Success",
    error:
      "An unexpected error has occured :head_bandage: \n Please report it using the ``report`` command, thanks :smile:",
  },
  language: {
    description: "",
    applied: "",
  },
  authorizations: {},
  permissions: {
    missingBotPermissions:
      "Seems like the bot doesn't have the required permissions.",
    missingPermissions:
      "Cannot perform this action :confused:\nYou are missing the following permissions:",
    error:
      "No translation(s) were/was found for this/these translations :frowning:",
    "268435456": "Manage Roles",
  },
  arguments: {
    missing: 'Required parameter "%s" is missing',
    invalid: 'Parameter "%s" is invalid',
    generic: {
      user: "User",
    },
  },
  status: {},
  commands: {},
  categories: {},
  moderation: {
    highestUse:
      "You cannot use this command on a user who has higher privileges than you *(or has same permissions)*",
    modHigher:
      "This sanction has been attributed by a moderator whose privileges are higher than yours. You cannot modify or remove it.",
    ban: {
      success: "User %s has been successfully banned",
      alreadyBanned: "User %s is already banned !",
      failed: "Cannot ban this user :head_bandage:.",
    },
    unban: {
      notFound:
        "This user is not banned from the server. Would you like to remediate to it ? :smirk:",
      success: "%s has been unbanned !",
    },
    kick: {
      success: "User %s has been successfully kicked from the server",
      failed: "Cannot kick this user :head_bandage:.",
    },
    mute: {
      success: "User %s has been successfully muted.",
      failed: "Cannot mute this user :head_bandage:.",
      alreadyHasMute: "User %s is already muted !",
    },
    unmute: {
      notFound: "This user is not muted.",
      success: "User %s has been muted!",
      alreadyRemoved:
        'User %s is already unmuted. Seems like his "Muted" role has been removed manually.',
      failed: "Cannot unmute this user :head_bandage:.",
      restoreRoles: "Should his/her roles be restored ?",
    },
    warn: {
      success: "User %s has been successfully warned !",
      failed: "Cannot warn this user.",
    },
    unwarn: {
      warnNotFound: "Couldn't find a warning with this id",
      success: "This warn has been successfully removed",
    },
    warns: {
      title: "%s's warns (%s/%s)",
      empty: "User has never been warned",
      description: "*Total warnings: `%s`*",
    },
  },
  tickets: {
    types: {
      admin: "Mod:",
      endsOn: "Ends on:",
      reason: "Reason:",
      ticket: "Ticket:",
      issuedAt: "Issued At:",
      duration: "Duration:",
    },
  },
} as Translation;
