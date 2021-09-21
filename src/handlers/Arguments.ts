import type {
  Argument,
  ArgumentError,
  ArgumentResponse,
} from "./arguments-types";

export class ArgumentsHandler {
  private pingRegex: RegExp = /<|>|!|@|#|\"|\'/gim;
  public handle(
    params: string[],
    expectedParams: Argument[],
    commandName: string
  ): ArgumentResponse {
    let returnValue: ArgumentResponse = { state: true, params: [] };

    expectedParams.forEach((expected, index) => {
      const type = expected.type ?? "STRING";
      if (returnValue.state) {
        switch (type) {
          case "STRING":
            if (!params[index]) {
              if (expected.required) {
                returnValue = {
                  state: false,
                  message: this.returnErrorMessage(
                    expected,
                    {
                      type: "MISSING",
                    } as ArgumentError,
                    commandName
                  ),
                };
              }
            } else {
              returnValue.params[expected.name] = params[index];
            }
            break;
          case "USER":
            if (!params[index]) {
              if (expected.required) {
                returnValue = {
                  state: false,
                  message: this.returnErrorMessage(
                    expected,
                    {
                      type: "MISSING",
                    } as ArgumentError,
                    commandName
                  ),
                };
              }
            } else if (!params[index].match(/^\<@!*\d{18}\>$/gm)) {
              if (!params[index].match(/^\d{18}$/gm)) {
                returnValue = {
                  state: false,
                  message: this.returnErrorMessage(
                    expected,
                    {
                      type: "INVALID",
                    } as ArgumentError,
                    commandName
                  ),
                };
              }
            } else {
              returnValue.params[expected.name] = params[index].replace(
                this.pingRegex,
                ""
              );
            }
            break;
          case "FULLTEXT":
            if (!params[index]) {
              if (expected.required) {
                returnValue = {
                  state: false,
                  message: this.returnErrorMessage(
                    expected,
                    {
                      type: "MISSING",
                    } as ArgumentError,
                    commandName
                  ),
                };
              }
            } else {
              returnValue.params[expected.name] = params[index];
            }
            break;
        }
      }
    });

    return returnValue;
  }

  private returnErrorMessage(
    expected: Argument,
    { type }: ArgumentError,
    commandName: string
  ): string {
    // TODO: Add support for server specific languages
    const serverLang: string = "en-us"; // Temporary lang, remove when server db config is implemented
    let value: string = "";

    switch (type) {
      case "MISSING":
        switch (serverLang) {
          case "en-us":
            value = "Missing required parameter: ";
            break;
          case "fr-fr":
            value = "Paramètre obligatoire manquant: ";
            break;
        }
        break;
      case "INVALID":
        switch (serverLang) {
          case "en-us":
            value = "Invalid parameter: ";
            break;
          case "fr-fr":
            value = "Paramètre invalide: ";
            break;
        }
        break;
    }
    return `${value}${this.getTranslation(
      expected.name,
      commandName,
      serverLang
    )}`;
  }

  private getTranslation(
    key: string,
    commandName: string,
    serverLang: string
  ): string {
    // TODO : Add support for server specific languages
    let value: string = "";
    switch (serverLang) {
      case "en-us":
        switch (`${commandName}#${key}`) {
          case `${commandName}#user`:
            value = "User";
            break;
          case `${commandName}#title`:
            value = "Title";
            break;
          case `${commandName}#content`:
            value = "Content";
            break;
          case `${commandName}#prefix`:
            value = "Prefix";
            break;
        }
        break;
      case "fr-fr":
        switch (key) {
          case "ping#user":
            value = "Utilisateur";
            break;
          case "ping#title":
            value = "Titre";
            break;
          case "ping#content":
            value = "Contenu";
            break;
          case `${commandName}#prefix`:
            value = "Préfixe";
            break;
        }
        break;
    }
    return value;
  }
}
