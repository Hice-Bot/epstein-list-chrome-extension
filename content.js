/**
 * Epstein List Highlighter — Content Script
 *
 * Walks the DOM for text nodes, wraps any occurrence of a listed name in a
 * red-bordered clickable span linking to the Wikipedia article section.
 */

(() => {
    "use strict";

    const WIKI_BASE =
        "https://en.wikipedia.org/wiki/List_of_people_named_in_the_Epstein_files#";

    // Tags whose children we should never touch
    const SKIP_TAGS = new Set([
        "SCRIPT", "STYLE", "TEXTAREA", "INPUT", "SELECT",
        "CODE", "PRE", "NOSCRIPT", "IFRAME", "SVG",
    ]);

    // Class applied to highlighted names
    const HL_CLASS = "epstein-highlight";

    /* ── Build a single regex that matches any name ──────────── */

    // Sort longest-first so "Jean-Luc Brunel" matches before a hypothetical
    // shorter substring.
    const sortedNames = [...EPSTEIN_LIST].sort(
        (a, b) => b.name.length - a.name.length
    );

    // Escape special regex chars in names (handles accented chars, hyphens, etc.)
    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    // Build pattern: replace spaces with \s+ so "Bill  Clinton" or
    // "Bill\nClinton" still matches.
    const pattern = new RegExp(
        "(" +
        sortedNames
            .map((e) => escapeRegex(e.name).replace(/\\ /g, "\\s+"))
            .join("|") +
        ")",
        "gi"
    );

    // Quick lookup: normalised name → anchor
    // Normalise by lowercasing + collapsing whitespace
    const anchorMap = new Map();
    for (const entry of EPSTEIN_LIST) {
        anchorMap.set(entry.name.toLowerCase(), entry.anchor);
    }

    /** Return the anchor for a matched string (handles multi-space / newline) */
    function lookupAnchor(matchedText) {
        const key = matchedText.replace(/\s+/g, " ").trim().toLowerCase();
        return anchorMap.get(key);
    }

    /* ── Highlight a single text node ────────────────────────── */

    function highlightTextNode(textNode) {
        const text = textNode.nodeValue;
        if (!pattern.test(text)) return;
        pattern.lastIndex = 0; // reset after .test()

        const frag = document.createDocumentFragment();
        let lastIndex = 0;
        let match;

        while ((match = pattern.exec(text)) !== null) {
            // Text before the match
            if (match.index > lastIndex) {
                frag.appendChild(
                    document.createTextNode(text.slice(lastIndex, match.index))
                );
            }

            const matchedName = match[1];
            const anchor = lookupAnchor(matchedName);
            const url = WIKI_BASE + anchor;

            // Use <span> instead of <a> to avoid invalid nested-link HTML
            const span = document.createElement("span");
            span.className = HL_CLASS;
            span.textContent = matchedName;
            span.title = "Named in the Epstein files — click for details";
            span.dataset.epsteinUrl = url;
            span.setAttribute("role", "link");
            span.style.cursor = "pointer";

            // Open Wikipedia section on click
            span.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(url, "_blank", "noopener,noreferrer");
            });

            frag.appendChild(span);
            lastIndex = pattern.lastIndex;
        }

        // Remaining text after last match
        if (lastIndex < text.length) {
            frag.appendChild(document.createTextNode(text.slice(lastIndex)));
        }

        textNode.parentNode.replaceChild(frag, textNode);
    }

    /* ── Walk & process a subtree ────────────────────────────── */

    function processSubtree(root) {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode(node) {
                const parent = node.parentElement;
                if (!parent) return NodeFilter.FILTER_REJECT;
                if (SKIP_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
                // Skip if this node is inside an already-highlighted span
                if (parent.closest("." + HL_CLASS)) return NodeFilter.FILTER_REJECT;
                // Skip empty / whitespace-only nodes
                if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
                return NodeFilter.FILTER_ACCEPT;
            },
        });

        const textNodes = [];
        while (walker.nextNode()) textNodes.push(walker.currentNode);

        for (const tn of textNodes) {
            highlightTextNode(tn);
        }
    }

    /* ── Initial scan ────────────────────────────────────────── */

    processSubtree(document.body);

    /* ── Observe dynamic changes (SPA / infinite scroll) ─────── */

    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (
                    node.nodeType === Node.ELEMENT_NODE &&
                    !SKIP_TAGS.has(node.tagName) &&
                    !node.classList?.contains(HL_CLASS)
                ) {
                    processSubtree(node);
                }
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
