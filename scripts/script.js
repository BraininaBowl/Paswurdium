const numberOfPasswordsElement = document.getElementById("numberOfPasswords");
const includeSpecialCharsElement = document.getElementById(
  "includeSpecialChars",
);
const includeNumberElement = document.getElementById("includeNumber");
const forceCapitalElement = document.getElementById("forceCapital");
const specialsAtEndElement = document.getElementById("specialsAtEnd");
const languageSelectElement = document.getElementById("languageSelect");

const allWordsBucket = {};

const generateButton = document.getElementById("generateButton");
const passwordDisplay = document.getElementById("passwordDisplay");

function toVerb(verb, language) {
  const lastChar = verb.charAt(verb.length - 1);
  const secondLastChar = verb.charAt(verb.length - 2);
  if (language === "en") {
    if (
      lastChar == "y" &&
      !["a", "e", "i", "o", "u"].includes(secondLastChar)
    ) {
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
  } else if (language === "nl") {
    if (lastChar == "t") {
      return verb;
    } else if (
      ["a", "e", "i", "o", "u"].includes(lastChar) &&
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
        "c",
        "v",
        "b",
        "n",
        "m",
      ].includes(secondLastChar)
    ) {
      return verb + lastChar + "t";
    } else {
      return verb + "t";
    }
  }
}

function toGerund(verb, language) {
  const lastChar = verb.charAt(verb.length - 1);
  const secondLastChar = verb.charAt(verb.length - 2);
  const thirdLastChar = verb.charAt(verb.length - 3);
  if (language === "en") {
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
  } else if (language === "nl") {
    if (lastChar == "s") {
      verb = verb.substring(0, verb.length - 1) + "z";
    }
    if (
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
        "c",
        "v",
        "b",
        "n",
        "m",
      ].includes(lastChar) &&
      ["a", "e", "i", "o", "u"].includes(secondLastChar) &&
      thirdLastChar == secondLastChar
    ) {
      return verb.substring(0, verb.length - 2) + lastChar + "ende";
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
        "c",
        "v",
        "b",
        "n",
        "m",
      ].includes(lastChar) &&
      ["a", "e", "i", "o", "u"].includes(secondLastChar) &&
      !["a", "e", "i", "o", "u"].includes(thirdLastChar)
    ) {
      return verb + lastChar + "ende";
    } else if (["a", "e", "o", "u"].includes(lastChar)) {
      if (["a", "e", "o", "i", "u"].includes(secondLastChar)) {
        return verb + "nde";
      } else {
        return verb + lastChar + "nde";
      }
    } else {
      return verb + "ende";
    }
  }
}

function capitalize(sentence) {
  return sentence.substring(0, 1).toUpperCase() + sentence.substring(1);
}

function generatePassword(
  includeSpecialChars,
  includeNumber,
  forceCapital,
  language,
  specialsAtEnd,
) {
  let specialCharIncluded = false;
  let numberIncluded = false;
  let password = "";
  let seperator = getRandomWordFromBucket(seperatorBucket, language);
  let capitals = forceCapital;

  function getRandomWordFromBucket(bucket) {
    const array = bucket[language];
    return array[Math.floor(Math.random() * array.length)];
  }

  function processWord(word) {
    if (capitals) {
      word = capitalize(word);
    }
    if (
      includeSpecialChars &&
      !specialCharIncluded &&
      !specialsAtEnd &&
      Math.random() < 0.3
    ) {
      word += getRandomWordFromBucket(specialCharBucket, language);
      specialCharIncluded = true;
    }
    if (
      includeNumber &&
      !numberIncluded &&
      !specialsAtEnd &&
      Math.random() < 0.3
    ) {
      word += getRandomWordFromBucket(numberBucket, language);
      numberIncluded = true;
    }
    return word;
  }

  const passwordStyle = Math.floor(Math.random() * 4);
  if (passwordStyle === 0) {
    // Style Gobbledegook
    if (!forceCapital) {
      capitals = Math.random() < 0.5;
    }
    let length = Math.floor(Math.random() * 4) + 5;
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
    if (language === "en") {
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
        processWord(toVerb(getRandomWordFromBucket(verbBucket), language)) +
        seperator;
      password +=
        processWord(getRandomWordFromBucket(prepositionBucket)) + seperator;
      password +=
        processWord(getRandomWordFromBucket(articleBucket)) + seperator;
      if (Math.random() < 0.6) {
        password +=
          processWord(getRandomWordFromBucket(adjectiveBucket)) + seperator;
      }
      password += processWord(getRandomWordFromBucket(nounBucket));
    } else if (language === "nl") {
      password +=
        processWord(capitalize(getRandomWordFromBucket(articleBucket))) +
        seperator;
      if (Math.random() < 0.6) {
        password +=
          processWord(getRandomWordFromBucket(adjectiveBucket)) + seperator;
      }
      password += processWord(getRandomWordFromBucket(nounBucket)) + seperator;
      password +=
        processWord(toVerb(getRandomWordFromBucket(verbBucket), language)) +
        seperator;
      if (Math.random() < 0.6) {
        password +=
          processWord(getRandomWordFromBucket(adverbBucket)) + seperator;
      }
      password +=
        processWord(getRandomWordFromBucket(prepositionBucket)) + seperator;
      password +=
        processWord(getRandomWordFromBucket(articleBucket)) + seperator;
      if (Math.random() < 0.6) {
        password +=
          processWord(getRandomWordFromBucket(adjectiveBucket)) + seperator;
      }
      password += processWord(getRandomWordFromBucket(nounBucket));
    }
  } else if (passwordStyle === 2) {
    // Style saga
    if (language === "en") {
      password +=
        processWord(capitalize(getRandomWordFromBucket(articleBucket))) +
        seperator;
      if (Math.random() < 0.6) {
        password +=
          processWord(getRandomWordFromBucket(adjectiveBucket)) + seperator;
      }
      if (Math.random() < 0.6) {
        password +=
          processWord(toGerund(getRandomWordFromBucket(verbBucket), language)) +
          seperator;
      }
      password += processWord(getRandomWordFromBucket(nounBucket)) + seperator;
      password +=
        processWord(getRandomWordFromBucket(adverbBucket)) + seperator;
      password += processWord(
        toVerb(getRandomWordFromBucket(verbBucket), language),
      );
    } else if (language === "nl") {
      password +=
        processWord(capitalize(getRandomWordFromBucket(articleBucket))) +
        seperator;
      if (Math.random() < 0.6) {
        password +=
          processWord(getRandomWordFromBucket(adjectiveBucket)) + seperator;
      }
      if (Math.random() < 0.6) {
        password +=
          processWord(toGerund(getRandomWordFromBucket(verbBucket), language)) +
          seperator;
      }
      password += processWord(getRandomWordFromBucket(nounBucket)) + seperator;
      password +=
        processWord(toVerb(getRandomWordFromBucket(verbBucket), language)) +
        seperator;
      password += processWord(getRandomWordFromBucket(adverbBucket));
    }
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
      processWord(toVerb(getRandomWordFromBucket(verbBucket), language)) +
      seperator;
    password +=
      processWord(getRandomWordFromBucket(temporalBucket)) + seperator;
    password += processWord(getRandomWordFromBucket(articleBucket)) + seperator;
    password += processWord(getRandomWordFromBucket(nounBucket)) + seperator;
    password += processWord(
      toVerb(getRandomWordFromBucket(verbBucket), language),
    );
  }

  // add numbers and specials at the end of the password, if they haven't been included yet
  if (includeNumber && !numberIncluded) {
    password += seperator;
  }
  if (includeSpecialChars && !specialCharIncluded) {
    password += getRandomWordFromBucket(specialCharBucket, language);
  }
  if (includeNumber && !numberIncluded) {
    password += getRandomWordFromBucket(numberBucket, language);
  }
  return password;
}

function generatePasswords() {
  passwordDisplay.innerHTML = "";
  const numberOfPasswords = parseInt(numberOfPasswordsElement.value);
  const includeSpecialChars = includeSpecialCharsElement.checked;
  const includeNumber = includeNumberElement.checked;
  const forceCapital = forceCapitalElement.checked;
  const specialsAtEnd = specialsAtEndElement.checked;
  const language = languageSelectElement.value;

  // for Gobbledegook style passwords, we need to combine most buckets into one array
  allWordsBucket[language] = adjectiveBucket[language].concat(
    adverbBucket[language],
    nounBucket[language],
    prepositionBucket[language],
    temporalBucket[language],
    verbBucket[language],
    articleBucket[language],
  );

  for (let i = 0; i < numberOfPasswords; i++) {
    const password = generatePassword(
      includeSpecialChars,
      includeNumber,
      forceCapital,
      language,
      specialsAtEnd,
    );
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
