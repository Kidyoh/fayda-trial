const fs = require("fs");
const path = require("path");
const { Translate } = require("@google-cloud/translate").v2;

const translate = new Translate();

const localesDir = path.join(__dirname, "..", "locales");
const sourceLang = "en";
const targetLangs = ["am", "om", "ti"]; // Note: 'om' and 'ti' may not be supported by Google Translate

async function translateText(text, to) {
  try {
    const [translation] = await translate.translate(text, to);
    return translation;
  } catch (error) {
    console.error(`Error translating "${text}" to ${to}:`, error.message);
    return text; // Return original if error
  }
}

async function translateFile(filePath, targetLang) {
  const content = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(content);
  const translated = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string") {
      translated[key] = await translateText(value, targetLang);
    } else {
      translated[key] = value; // Keep non-strings as is
    }
  }

  return translated;
}

async function main() {
  const enDir = path.join(localesDir, sourceLang);
  const files = fs.readdirSync(enDir).filter((f) => f.endsWith(".json"));

  for (const file of files) {
    const enFilePath = path.join(enDir, file);
    console.log(`Translating ${file}...`);

    for (const lang of targetLangs) {
      const langDir = path.join(localesDir, lang);
      if (!fs.existsSync(langDir)) {
        fs.mkdirSync(langDir, { recursive: true });
      }
      const langFilePath = path.join(langDir, file);

      console.log(`  Translating to ${lang}...`);
      const translated = await translateFile(enFilePath, lang);
      fs.writeFileSync(
        langFilePath,
        JSON.stringify(translated, null, 2),
        "utf8",
      );
      console.log(`  Translated to ${lang}`);
    }
  }

  console.log("Translation completed!");
}

main().catch(console.error);
