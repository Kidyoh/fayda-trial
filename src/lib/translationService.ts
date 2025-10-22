class TranslationService {
  private apiUrl = "https://translate.googleapis.com/translate_a/single";

  async translateText(text: string, targetLanguage: string): Promise<string> {
    try {
      // Use the free Google Translate API (similar to WordPress plugins)
      const response = await fetch(
        `${this.apiUrl}?client=gtx&sl=en&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(text)}`,
      );

      if (!response.ok) {
        throw new Error("Translation request failed");
      }

      const data = await response.json();
      // The response format is: [[["translated text", "original text", null, null, 0]], null, "en"]
      return data[0][0][0];
    } catch (error) {
      console.error("Translation error:", error);
      throw error;
    }
  }

  async translatePage(targetLanguage: string): Promise<void> {
    try {
      console.log("Starting page translation to:", targetLanguage);

      // Check if page is already translated to this language
      const currentLang = this.getCurrentLanguage();
      if (currentLang === targetLanguage) {
        console.log("Page is already translated to", targetLanguage);
        return;
      }

      // Get all text nodes on the page
      const textNodes = this.getAllTextNodes(document.body);

      // Filter out script, style, and other non-visible elements
      const visibleTextNodes = textNodes.filter((node) => {
        const element = node.parentElement;
        if (!element) return false;

        // Skip elements that are typically not translated
        const tagName = element.tagName.toLowerCase();
        if (["script", "style", "noscript", "code", "pre"].includes(tagName))
          return false;

        // Skip elements with translate="no" attribute
        if (element.getAttribute("translate") === "no") return false;

        // Skip input placeholders and other form attributes
        if (
          element.hasAttribute("placeholder") ||
          element.hasAttribute("title") ||
          element.hasAttribute("alt")
        ) {
          return false;
        }

        // Skip elements that are already translated (have data-original-text attribute)
        if (element.hasAttribute("data-translated")) {
          return false;
        }

        return true;
      });

      console.log(`Found ${visibleTextNodes.length} text nodes to translate`);

      // Mark elements as being translated to prevent double translation
      visibleTextNodes.forEach((node) => {
        if (node.parentElement) {
          node.parentElement.setAttribute("data-translating", "true");
        }
      });

      // Translate text nodes in batches to avoid rate limits
      const batchSize = 5; // Smaller batches for free API
      for (let i = 0; i < visibleTextNodes.length; i += batchSize) {
        const batch = visibleTextNodes.slice(i, i + batchSize);
        const translatePromises = batch.map(async (node) => {
          const text = node.textContent?.trim();
          if (text && text.length > 0 && text.length < 5000) {
            // Limit text length
            try {
              // Store original text before translating (only if not already stored)
              if (
                node.parentElement &&
                !node.parentElement.hasAttribute("data-original-text")
              ) {
                node.parentElement.setAttribute("data-original-text", text);
              }

              const translatedText = await this.translateText(
                text,
                targetLanguage,
              );
              node.textContent = translatedText;

              // Mark as translated
              if (node.parentElement) {
                node.parentElement.setAttribute(
                  "data-translated",
                  targetLanguage,
                );
                node.parentElement.removeAttribute("data-translating");
              }
            } catch (error) {
              console.error("Failed to translate text:", text, error);
              // Remove translating flag on error
              if (node.parentElement) {
                node.parentElement.removeAttribute("data-translating");
              }
            }
          }
        });

        await Promise.all(translatePromises);

        // Add delay between batches to respect rate limits
        if (i + batchSize < visibleTextNodes.length) {
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
      }

      console.log("Page translation completed");

      // Store the current language
      localStorage.setItem("pageLanguage", targetLanguage);
    } catch (error) {
      console.error("Page translation failed:", error);
      throw error;
    }
  }

  resetPage(): void {
    console.log("Resetting page to original language");

    // Restore original text without reloading
    const translatedElements = document.querySelectorAll(
      "[data-original-text]",
    );
    translatedElements.forEach((element) => {
      const originalText = element.getAttribute("data-original-text");
      if (originalText) {
        // Find the first text node in this element and restore its text
        const textNodes = this.getAllTextNodes(element as Element);
        if (textNodes.length > 0) {
          textNodes[0].textContent = originalText;
        }
      }

      // Clean up attributes
      element.removeAttribute("data-original-text");
      element.removeAttribute("data-translated");
      element.removeAttribute("data-translating");
    });

    // Clear localStorage
    localStorage.removeItem("pageLanguage");

    console.log("Page reset to original language without reloading");
  }

  getCurrentLanguage(): string {
    return localStorage.getItem("pageLanguage") || "en";
  }

  private getAllTextNodes(element: Element): Text[] {
    const textNodes: Text[] = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        // Accept text nodes that have non-whitespace content
        return node.textContent?.trim()
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_SKIP;
      },
    });

    let node;
    while ((node = walker.nextNode())) {
      textNodes.push(node as Text);
    }

    return textNodes;
  }
}

export const translationService = new TranslationService();
