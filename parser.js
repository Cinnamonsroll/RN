function parse(input) {
  if (typeof input !== "string") throw new TypeError("The 'input' argument must be a string.");

  const jsonOutput = {}, len = input.length + 1;
  let parsing = "", current = [], settingValue = false;

  for (let i = 0; i < len; i++) {
    const char = input[i];
    if (char === ";") {
      for (const currentToken of current)
        jsonOutput[currentToken] =
          parsing.includes("(") && parsing.includes(")")
            ? JSON.parse(`{${parsing.replaceAll("(", "").replaceAll(")", "").trim()}}`)
            : parsing
              .replace(/\*.*\*/g, (w_) => (w = w_.replaceAll("*", ""), w.endsWith("^") ? w.slice(0, -1).toUpperCase() : w))
              .replace(/:.*:/g, (w_) => (w = w_.replaceAll(":", ""), w.endsWith("^") ? jsonOutput[w.slice(0, -1)].toUpperCase() : jsonOutput[w]))
              .replaceAll('"', "").trim();

      current = [];
      settingValue = false;
    }

    switch (char) {
      case " ":
      case void 0:
        if (settingValue) parsing += " ";
        else parsing = "";
        break;
      case "{":
        break;
      case "}":
        if (!settingValue) current.push(parsing);
        parsing = "";
        break;
      case "=": settingValue = true; break;
      default: parsing += char;
    }
  }

  return jsonOutput;
}
