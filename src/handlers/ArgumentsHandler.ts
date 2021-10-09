import type {
  Argument,
  ArgumentError,
  ArgumentResponse,
} from "$types/arguments";
import type { Translation } from "$types/langs";
import { format } from "util";
export class ArgumentsHandler {
  private pingRegex: RegExp = /<|>|!|@|#|&|\"|\'/gim;
  public handle(
    params: string[],
    expectedParams: Argument[],
    commandName: string,
    translation: Translation
  ): ArgumentResponse {
    let returnValue: ArgumentResponse = { state: true, params: {} };

    expectedParams.forEach((expected, index) => {
      if (returnValue.state) {
        const status = this.checkParam(
          params,
          index,
          expected,
          commandName,
          translation
        );
        status.state
          ? (returnValue.params[expected.name] = status.params)
          : (returnValue = status);
      }
    });
    return returnValue;
  }

  private checkParam(
    params: string[],
    index: number,
    expected: Argument,
    command: string,
    translation: Translation
  ): ArgumentResponse {
    const invalid = translation.arguments.invalid;

    let argName: string;
    if (expected.generic) {
      argName = translation.arguments.generic[expected.name];
    } else {
      argName = translation.commands[command][expected.name];
    }

    if (!params[index] && expected.required) {
      return {
        state: false,
        message: format(translation.arguments.missing, argName),
      };
    }
    switch (expected.type) {
      case "STRING":
        break;
      case "INTEGER":
        if (isNaN(parseInt(params[index]))) {
          return {
            state: false,
            message: format(invalid, argName),
          };
        }
        break;
      case "USER":
      case "CHANNEL":
        const formatted = params[index].replace(this.pingRegex, "");
        if (formatted.length !== 18) {
          return {
            state: false,
            message: format(invalid, argName),
          };
        }
        params[index] = formatted;
        break;
      case "TIME":
        // TODO Add time parsing
        break;
      case "FULLTEXT":
        const fulltext = params.slice(index, params.length).join(" ");
        return {
          state: true,
          params: fulltext,
        };
    }

    return { state: true, params: params[index] } as ArgumentResponse;
  }
}

/*const type = expected.type ?? "STRING";
      if (returnValue.state) {
        switch (type) {
          case "STRING":
            if (!params[index]) {
              if (expected.required) {
                returnValue = {
                  state: false,
                  message: ""
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
      */
