const omittedArgumentsPattern = /\s*\((?:…|\.\.\.)\)\s*$/u;

export function splitIdentifier(value: string): string[] {
  return value
    .replace(omittedArgumentsPattern, '')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

function abbreviateToken(token: string): string {
  const match = token.match(/^([a-z])[^0-9]*(\d*)$/);
  return match ? `${match[1]}${match[2]}` : token[0] ?? '';
}

export function createIdentifierAliases(...identifiers: string[]): string[] {
  const aliases = new Set<string>();

  for (const identifier of identifiers) {
    const tokens = splitIdentifier(identifier);

    for (let start = 0; start < tokens.length; start += 1) {
      const tail = tokens.slice(start);
      aliases.add(tail.join(''));
      aliases.add(tail.map(abbreviateToken).join(''));

      for (let end = start; end < tokens.length; end += 1) {
        const initials = tokens.slice(start, end).map(abbreviateToken).join('');
        const lastToken = tokens[end];

        for (let length = 1; length <= Math.min(4, lastToken.length); length += 1) {
          aliases.add(initials + lastToken.slice(0, length));
        }
      }
    }
  }

  return [...aliases].filter((alias) => alias.length >= 3);
}
