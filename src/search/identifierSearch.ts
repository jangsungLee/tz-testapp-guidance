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

type IdentifierCharacter = {
  value: string;
  boundary: boolean;
};

function identifierCharacters(value: string): IdentifierCharacter[] {
  const source = value.replace(omittedArgumentsPattern, '');
  const characters: IdentifierCharacter[] = [];

  for (let index = 0; index < source.length; index += 1) {
    const current = source[index];
    if (!/[a-z0-9]/i.test(current)) {
      continue;
    }

    const previous = source[index - 1] ?? '';
    characters.push({
      value: current.toLowerCase(),
      boundary:
        index === 0 ||
        !/[a-z0-9]/i.test(previous) ||
        (/[A-Z]/.test(current) && /[a-z0-9]/.test(previous)) ||
        (/\d/.test(current) && /[a-z]/i.test(previous)),
    });
  }

  return characters;
}

export function scoreIdentifierMatch(query: string, identifier: string): number | null {
  const queryCharacters = query.toLowerCase().replace(/[^a-z0-9]/g, '');
  const candidate = identifierCharacters(identifier);
  const candidateText = candidate.map((character) => character.value).join('');

  if (queryCharacters.length < 2 || queryCharacters.length > candidate.length) {
    return null;
  }
  if (queryCharacters === candidateText) {
    return 1000;
  }
  if (candidateText.startsWith(queryCharacters)) {
    return 600 + (queryCharacters.length / candidate.length) * 100;
  }

  let scores = candidate.map((character, index) =>
    character.value === queryCharacters[0]
      ? 10 + (character.boundary ? 14 : 0) + Math.max(0, 12 - index * 2)
      : Number.NEGATIVE_INFINITY,
  );

  for (let queryIndex = 1; queryIndex < queryCharacters.length; queryIndex += 1) {
    const nextScores = candidate.map(() => Number.NEGATIVE_INFINITY);
    for (let candidateIndex = 0; candidateIndex < candidate.length; candidateIndex += 1) {
      if (candidate[candidateIndex].value !== queryCharacters[queryIndex]) {
        continue;
      }
      for (let previousIndex = 0; previousIndex < candidateIndex; previousIndex += 1) {
        if (!Number.isFinite(scores[previousIndex])) {
          continue;
        }
        const gap = candidateIndex - previousIndex - 1;
        const score =
          scores[previousIndex] +
          10 +
          (candidate[candidateIndex].boundary ? 14 : 0) +
          (gap === 0 ? 9 : -gap * 1.5);
        nextScores[candidateIndex] = Math.max(nextScores[candidateIndex], score);
      }
    }
    scores = nextScores;
  }

  const best = Math.max(...scores);
  if (!Number.isFinite(best)) {
    return null;
  }

  return best + (queryCharacters.length / candidate.length) * 40 - (candidate.length - queryCharacters.length) * 0.2;
}
