export type Lang = "en-US" | "fr-Fr";

export type Translation = {
  name: string;
  code: string;
  common: {
    success: string;
    error: string;
  };
  language: {
    description: string;
    applied: string;
  };
  authorizations: {};
  permissions: {
    missingPermissions: string;
    error: string;
    "268435456": string;
  };
  status: {};
  commands: {};
  categories: {};
  moderation: {
    highestUse: string;
    modHigher: string;
    ban: {
      success: string;
      alreadyBanned: string;
      failed: string;
    };
    unban: {
      notFound: string;
      success: string;
    };
    kick: {
      success: string;
      failed: string;
    };
    mute: {
      success: string;
      failed: string;
      alreadyHasMute: string;
    };
    unmute: {
      notFound: string;
      success: string;
      alreadyRemoved: string;
      failed: string;
      restoreRoles: string;
    };
    warn: {
      success: string;
      failed: string;
    };
    unwarn: {
      warnNotFound: string;
      success: string;
    };
    warns: {
      title: string;
      empty: string;
      description: string;
    };
  };
  tickets: {
    types: {
      admin: string;
      reason: string;
      endsOn: string;
      ticket: string;
      issuedAt: string;
      duration: string;
    };
  };
};
