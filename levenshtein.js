// Compute the edit distance between the two given strings
// https://en.wikibooks.org/wiki/Algorithm_Implementation/Strings/Levenshtein_distance#C.2B.2B
function levenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    var matrix = [];

    // increment along the first column of each row
    var i;
    for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    // increment each column in the first row
    var j;
    for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) == a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                    Math.min(matrix[i][j - 1] + 1, // insertion
                        matrix[i - 1][j] + 1)); // deletion
            }
        }
    }

    return matrix[b.length][a.length];
}

// input misspelled word
var input = 'i nuud an';

// array of words to check against
var words = ['i need a loan', 'what is a loan?', 'loan is cool', 'online home loans', 'loan purpose', 'property', 'salary', 'investment property'];

// no shortest distance found, yet
var shortest = -1;

// loop through words to find the closest
var lev,
    word;
for (var i = 0; i < words.length; i++) {
    word = words[i];

    // calculate the distance between the input word,
    // and the current word
    lev = levenshtein(input, word);

    // check for an exact match
    if (lev == 0) {
        // closest word is this one (exact match)
        var closest = word;
        shortest = 0;

        // break out of the loop; we've found an exact match
        break;
    }

    // if this distance is less than the next found shortest
    // distance, OR if a next shortest word has not yet been found
    if (lev <= shortest || shortest < 0) {
        // set the closest match, and shortest distance
        closest = word;
        shortest = lev;
    }
}

console.log('Input word: ' + input);
if (shortest == 0) {
    console.log('Exact match found: ' + closest);
} else {
    console.log('Did you mean: ' + closest + '?');
}
