export function EventListener(params: any = {}) {
  return function <T extends { new (...args: any[]): {} }>(ctr: T) {
    const args: any[] = [];
    for (const param in params) {
      ctr.prototype[param] = params[param];
      args.push(params[param]);
    }
    return class extends ctr {
      public register() {
        const properties = Object.getOwnPropertyNames(this);
        const methods = properties.filter(
          (property) => typeof this[property] === "function"
        );
        methods.map((method) => {
          // @ts-ignore
          this.client.on(
            method,
            async (e: any | undefined) => await this[method](e)
          );
        });
      }
    };
  };
}
