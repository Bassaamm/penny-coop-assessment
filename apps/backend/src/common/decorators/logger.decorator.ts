import { Logger } from '@nestjs/common';

export interface LogMessageOptions {
  debug?: boolean;
  logError?: boolean;
}

export function LogMessage(
  template: string,
  { debug = false, logError = true }: LogMessageOptions = {}
): MethodDecorator {
  const compiledPaths: {
    placeholder: string;
    index: number;
    path: string[];
  }[] = [];
  const regex = /\{(\d+)(\.[\w.]+)?\}/g;
  let match;

  while ((match = regex.exec(template)) !== null) {
    const placeholder = match[0];
    const index = parseInt(match[1], 10);
    const path = match[2] ? match[2].slice(1).split('.') : [];
    compiledPaths.push({ placeholder, index, path });
  }

  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const logger: Logger = this.logger || new Logger(target.constructor.name);

      let message = template;
      for (const { placeholder, index, path } of compiledPaths) {
        const argument = args[index];

        const resolvedValue = path.reduce((acc, prop) => acc?.[prop], argument);
        const replacement = JSON.stringify(
          resolvedValue !== undefined ? resolvedValue : 'null'
        );

        message = message.replace(placeholder, replacement);
      }

      if (debug) {
        logger.debug(message);
      } else {
        logger.log(message);
      }

      if (!logError) return await originalMethod.apply(this, args);
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        logger.error(
          `Error in ${String(propertyKey)}: ${JSON.stringify(error)}`,
          error
        );
        throw error;
      }
    };

    return descriptor;
  };
}
