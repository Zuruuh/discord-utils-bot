import type { Translation } from "$types/langs";

export const Language = {
  name: "Français",
  code: "fr-FR",
  common: {
    success: "Opération réalisée avec succès !",
    error:
      "Une erreur inconnue est survenue :head_bandage: \n Merci de signaler le bug avec la commande ``report`` le plus rapidement possible :)",
  },
  language: {
    description: "",
    applied: "",
  },
  authorizations: {},
  permissions: {
    missingBotPermissions:
      "Il semblerai que le bot n'ai pas les permissions nécessaires",
    missingPermissions:
      "Impossible d'exécuter cette action :confused:\nIl vous manque les permissions suivantes:",
    error:
      "Aucune traduction n'est disponible pour cette/ces permission(s) pour le moment :frowning:",
    "268435456": "Gestion des rôles",
  },
  arguments: {
    missing: "L'argument %s est manquant",
    invalid: "Le paramètre %s est invalide",
    generic: {
      user: "Utilisateur",
    },
  },
  status: {},
  commands: {},
  categories: {},
  moderation: {
    highestUse:
      "Vous ne pouvez pas utiliser cette commande sur un membre du même rang *(ou supérieur)* que vous !",
    modHigher:
      "Cette sanction à été donnée par un de vos supérieur. Vous ne pouvez donc pas la modifier ou la lever.",
    ban: {
      success: "L'utilisateur %s a été correctement banni",
      alreadyBanned:
        "L'utilisateur %s est déjà banni !\nId du Ticket en question: ``%s``",
      failed: "Impossible de bannir cet utilisateur :head_bandage:.",
    },
    unban: {
      notFound: "Cet utilisateur n'est pas banni.",
      success: "%s a été débanni !",
    },
    kick: {
      success:
        "L'utilisateur %s a été correctement exclu de ce serveur.\n\n**Ticket**: ``%s``\n**Modérateur**: ``%s``\n**Raison**: ``%s``",
      failed: "Impossible d'exclure cet utilisateur :head_bandage:.",
    },
    mute: {
      success:
        "L'utilisateur %s a été correctement mis en muet.\n\n**Ticket**: ``%s``\n**Modérateur**: ``%s``\n**Raison**: ``%s``\n**Durée**: ``%s``",
      failed: "Impossible de mettre cet utilisateur en muet :head_bandage:.",
      alreadyHasMute: "L'utilisateur %s est déjà muet !\n\n**Ticket**: ``%s``",
    },
    unmute: {
      notFound: "Cet utilisateur n'est pas muet.",
      success: "L'utilisateur %s à été rendu muet !",
      alreadyRemoved:
        "L'utilisateur %s n'est déjà plus muet. Il semblerais que son rôle \"Muet\" ai été retiré manuellement",
      failed:
        "Impossible de rendre la parole à cet utilisateur :head_bandage:.",
      restoreRoles: "",
    },
    warn: {
      success:
        "L'utilisateur %s à été correctement averti !\n\n**Ticket**: ``%s``\n**Modérateur**: %s\n**Raison**: ``%s``\n**Date**: ``%s``",
      failed: "Impossible d'avertir cet utilisateur.",
    },
    unwarn: {
      warnNotFound: "Aucun avertissement ne correspond à cet identifiant",
      success: "Cet avertissement à été correctement supprimé",
    },
    warns: {
      title: "Liste des avertissements de %s (%s/%s)",
      empty: "Cet utilisateur n'a jamais été averti",
      description: "*Total d'avertissements: `%s`*",
    },
  },
  tickets: {
    types: {
      reason: "Raison:",
      ticket: "Ticket:",
      duration: "Durée:",
      admin: "Modérateur:",
      endsOn: "Expire le:",
      issuedAt: "Effectué le:",
    },
  },
} as Translation;
