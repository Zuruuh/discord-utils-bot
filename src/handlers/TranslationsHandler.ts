import { resolve, join } from "path";
import { readdirSync } from "fs";
import type { Lang, Translation } from "$types/langs";

export class TranslationsHandler {
  private lang: Lang;
  private translation: Translation;
  private dir: string = "i18n";

  constructor(lang: Lang) {
    this.lang = lang;
    this.translation = this.configureLanguage();
  }

  public getTranslation() {
    return this.translation;
  }

  private configureLanguage() {
    const path = join(`${__dirname}/../${this.dir}/${this.lang}`);
    const realPath = resolve(path);
    const { Language } = require(realPath);
    return Language as Translation;
  }
}
