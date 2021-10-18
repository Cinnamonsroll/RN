function parse(input) {
  let jsonOutput = {},
    parsing = "",
    current = [],
    settingValue = false;
  for (let i = 0, l = input.length + 1; i < l; i++) {
    if (input[i] === ";") {
      for (let currentToken of current) {
        jsonOutput[currentToken] =
          parsing.includes(")") && parsing.includes(")")
            ? JSON.parse(
                ` {${parsing
                  .replaceAll("(", "")
                  .replaceAll(")", "")
                  .trim()} }`
              )
            : parsing
                .replace(/\*(.*)\*/gi, w =>
                  w.replaceAll("*", "").endsWith("^")
                    ? w
                        .replaceAll("*", "")
                        .slice(0, -1)
                        .toUpperCase()
                    : w.replaceAll("*", "")
                )
                .replace(/:(.*):/gi, w =>
                  w.replaceAll(":", "").endsWith("^")
                    ? jsonOutput[
                        w.replaceAll(":", "").slice(0, -1)
                      ].toUpperCase()
                    : jsonOutput[w.replaceAll(":", "")]
                )
                .replaceAll('"', "")
                .trim();
      }
      current = [];
      settingValue = false;
    }
    switch (input[i]) {
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
      case "=":
        settingValue = true;
        break;
      default:
        parsing += input[i];
        break;
    }
  }
  return jsonOutput;
}
