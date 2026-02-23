const numberOfPasswordsElement = document.getElementById("numberOfPasswords");
const includeSpecialCharsElement = document.getElementById(
  "includeSpecialChars",
);
const includeNumberElement = document.getElementById("includeNumber");

const generateButton = document.getElementById("generateButton");
const passwordDisplay = document.getElementById("passwordDisplay");

// for Gobbledegook style passwords, we need to combine most buckets into one array
const allWordsBucket = adjectiveBucket.concat(
  adverbBucket,
  nounBucket,
  prepositionBucket,
  temporalBucket,
  verbBucket,
  articleBucket,
);

function getRandomWordFromBucket(bucket) {
  return bucket[Math.floor(Math.random() * bucket.length)];
}

function toVerb(verb) {
  const lastChar = verb.charAt(verb.length - 1);
  const secondLastChar = verb.charAt(verb.length - 2);
  if (lastChar == "y" && !["a", "e", "i", "o", "u"].includes(secondLastChar)) {
    return verb.substring(0, verb.length - 1) + "ies";
  } else if (
    verb.endsWith("s") ||
    verb.endsWith("x") ||
    verb.endsWith("z") ||
    verb.endsWith("ch") ||
    verb.endsWith("sh")
  ) {
    return verb + "es";
  } else {
    return verb + "s";
  }
}

function toGerund(verb) {
  const lastChar = verb.charAt(verb.length - 1);
  const secondLastChar = verb.charAt(verb.length - 2);
  const thirdLastChar = verb.charAt(verb.length - 3);
  if (lastChar == "e" && secondLastChar != "e") {
    return verb.substring(0, verb.length - 1) + "ing";
  } else if (lastChar == "e" && secondLastChar == "i") {
    return verb.substring(0, verb.length - 2) + "ying";
  } else if (
    [
      "q",
      "w",
      "r",
      "t",
      "p",
      "s",
      "d",
      "f",
      "g",
      "h",
      "k",
      "l",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
    ].includes(lastChar) &&
    ["a", "e", "i", "o", "u"].includes(secondLastChar) &&
    !["a", "e", "i", "o", "u"].includes(thirdLastChar)
  ) {
    return verb + lastChar + "ing";
  } else {
    return verb + "ing";
  }
}

function capitalize(sentence) {
  return sentence.substring(0, 1).toUpperCase() + sentence.substring(1);
}

function generatePassword(includeSpecialChars, includeNumber) {
  let specialCharIncluded = false;
  let numberIncluded = false;
  let password = "";
  let seperator =
    seperatorBucket[Math.floor(Math.random() * seperatorBucket.length)];
  let capitals = false;

  function processWord(word) {
    if (capitals) {
      word = capitalize(word);
    }
    if (includeSpecialChars && !specialCharIncluded && Math.random() < 0.3) {
      word +=
        specialCharBucket[Math.floor(Math.random() * specialCharBucket.length)];
      specialCharIncluded = true;
    }
    if (includeNumber && !numberIncluded && Math.random() < 0.3) {
      word += numberBucket[Math.floor(Math.random() * numberBucket.length)];
      numberIncluded = true;
    }
    return word;
  }

  const passwordStyle = Math.floor(Math.random() * 4);
  if (passwordStyle === 0) {
    // Style Gobbledegook
    let capitals = Math.random() < 0.5;
    let length = Math.floor(Math.random() * 3) + 5;
    for (let i = 0; i < length; i++) {
      if (i != 0) {
        // add seperator between words, but not to the start of the password
        password += seperator;
      }
      let randomWord = getRandomWordFromBucket(allWordsBucket);
      password += processWord(randomWord);
    }
  } else if (passwordStyle === 1) {
    // Style Quick Brown Fox
    password +=
      processWord(capitalize(getRandomWordFromBucket(articleBucket))) +
      seperator;
    if (Math.random() < 0.6) {
      password +=
        processWord(getRandomWordFromBucket(adjectiveBucket)) + seperator;
    }
    password += processWord(getRandomWordFromBucket(nounBucket)) + seperator;
    if (Math.random() < 0.6) {
      password +=
        processWord(getRandomWordFromBucket(adverbBucket)) + seperator;
    }
    password +=
      processWord(toVerb(getRandomWordFromBucket(verbBucket))) + seperator;
    password +=
      processWord(getRandomWordFromBucket(prepositionBucket)) + seperator;
    password += processWord(getRandomWordFromBucket(articleBucket)) + seperator;
    if (Math.random() < 0.6) {
      password +=
        processWord(getRandomWordFromBucket(adjectiveBucket)) + seperator;
    }
    password += processWord(getRandomWordFromBucket(nounBucket));
  } else if (passwordStyle === 2) {
    // Style saga
    password +=
      processWord(capitalize(getRandomWordFromBucket(articleBucket))) +
      seperator;
    if (Math.random() < 0.6) {
      password +=
        processWord(getRandomWordFromBucket(adjectiveBucket)) + seperator;
    }
    if (Math.random() < 0.6) {
      password +=
        processWord(toGerund(getRandomWordFromBucket(verbBucket))) + seperator;
    }
    password += processWord(getRandomWordFromBucket(nounBucket)) + seperator;
    password += processWord(getRandomWordFromBucket(adverbBucket)) + seperator;
    password += processWord(toVerb(getRandomWordFromBucket(verbBucket)));
  } else {
    // Style saying
    password +=
      processWord(capitalize(getRandomWordFromBucket(articleBucket))) +
      seperator;
    if (Math.random() < 0.6) {
      password +=
        processWord(getRandomWordFromBucket(adjectiveBucket)) + seperator;
    }
    password += processWord(getRandomWordFromBucket(nounBucket)) + seperator;
    password +=
      processWord(toVerb(getRandomWordFromBucket(verbBucket))) + seperator;
    password +=
      processWord(getRandomWordFromBucket(temporalBucket)) + seperator;
    if (Math.random() < 0.6) {
      password +=
        processWord(getRandomWordFromBucket(articleBucket)) + seperator;
    }
    password += processWord(getRandomWordFromBucket(nounBucket)) + seperator;
    password += processWord(toVerb(getRandomWordFromBucket(verbBucket)));
  }

  // add numbers and specials at the end of the password, if they haven't been included yet
  if (includeNumber && !numberIncluded) {
    password += numberBucket[Math.floor(Math.random() * numberBucket.length)];
  }
  if (includeSpecialChars && !specialCharIncluded) {
    password +=
      specialCharBucket[Math.floor(Math.random() * specialCharBucket.length)];
  }
  return password;
}

function generatePasswords() {
  passwordDisplay.innerHTML = "";
  const numberOfPasswords = parseInt(numberOfPasswordsElement.value);
  const includeSpecialChars = includeSpecialCharsElement.checked;
  const includeNumber = includeNumberElement.checked;
  for (let i = 0; i < numberOfPasswords; i++) {
    const password = generatePassword(includeSpecialChars, includeNumber);
    const passwordElement = document.createElement("p");
    passwordElement.textContent = password;
    passwordDisplay.appendChild(passwordElement);
  }
}

generateButton.addEventListener("click", function (event) {
  event.preventDefault();
  generatePasswords();
});

generatePasswords();
