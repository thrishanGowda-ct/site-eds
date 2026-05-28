/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-landing.js
  function parse(element, { document }) {
    const heading = element.querySelector("h1.h1-heading, h1, h2");
    const description = element.querySelector("p.subheading, p");
    const ctaLinks = Array.from(
      element.querySelectorAll(".button-group a.button, a.button")
    );
    const images = Array.from(
      element.querySelectorAll(".grid-layout img.cover-image, img.cover-image, img")
    );
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (description) contentCell.push(description);
    if (ctaLinks.length > 0) contentCell.push(...ctaLinks);
    const imageCell = [];
    if (images.length > 0) imageCell.push(...images);
    const cells = [];
    if (imageCell.length > 0) {
      cells.push([contentCell, imageCell]);
    } else {
      cells.push(contentCell);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-landing", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-teaser.js
  function parse2(element, { document }) {
    const columns = element.querySelectorAll(":scope > div");
    const imageCol = columns[0];
    const image = imageCol ? imageCol.querySelector("img.cover-image, img") : null;
    const contentCol = columns[1];
    const breadcrumbs = contentCol ? contentCol.querySelector(".breadcrumbs") : null;
    const heading = contentCol ? contentCol.querySelector("h2.h2-heading, h2, h1, h3") : null;
    const metaContainer = contentCol ? contentCol.querySelectorAll(":scope > div > div") : [];
    const contentCell = [];
    if (breadcrumbs) contentCell.push(breadcrumbs);
    if (heading) contentCell.push(heading);
    metaContainer.forEach((meta) => {
      contentCell.push(meta);
    });
    const cells = [];
    const imageCell = [];
    if (image) imageCell.push(image);
    cells.push([imageCell, contentCell]);
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-teaser", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-gallery.js
  function parse3(element, { document }) {
    const cardItems = element.querySelectorAll(":scope > .utility-aspect-1x1, :scope > div > img.cover-image");
    const cells = [];
    cardItems.forEach((item) => {
      const img = item.tagName === "IMG" ? item : item.querySelector("img.cover-image, img");
      if (img) {
        cells.push([img]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-gallery", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-testimonial.js
  function parse4(element, { document }) {
    const cells = [];
    const tabPanes = element.querySelectorAll(".tab-pane");
    const tabButtons = element.querySelectorAll("button.tab-menu-link");
    tabPanes.forEach((pane, index) => {
      const labelCell = [];
      const correspondingButton = tabButtons[index];
      if (correspondingButton) {
        const avatarImg = correspondingButton.querySelector(".avatar img, img.cover-image");
        if (avatarImg) {
          const img = document.createElement("img");
          img.src = avatarImg.src;
          img.alt = avatarImg.alt || "";
          labelCell.push(img);
        }
        const nameEl = correspondingButton.querySelector(".paragraph-sm strong, strong");
        if (nameEl) {
          const p = document.createElement("p");
          const strong = document.createElement("strong");
          strong.textContent = nameEl.textContent.trim();
          p.appendChild(strong);
          labelCell.push(p);
        }
        const roleEls = correspondingButton.querySelectorAll(".paragraph-sm");
        if (roleEls.length > 1) {
          const p = document.createElement("p");
          p.textContent = roleEls[1].textContent.trim();
          labelCell.push(p);
        }
      }
      const contentCell = [];
      const contentImg = pane.querySelector(".grid-layout > div:first-child img, img.cover-image");
      if (contentImg) {
        const img = document.createElement("img");
        img.src = contentImg.src;
        img.alt = contentImg.alt || "";
        contentCell.push(img);
      }
      const paneName = pane.querySelector(".paragraph-xl strong, .grid-layout > div:nth-child(2) strong");
      if (paneName) {
        const p = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = paneName.textContent.trim();
        p.appendChild(strong);
        contentCell.push(p);
      }
      const paneRoleContainer = pane.querySelector(".paragraph-xl.utility-margin-bottom-0");
      if (paneRoleContainer) {
        const roleDiv = paneRoleContainer.parentElement ? paneRoleContainer.parentElement.querySelector("div:not(.paragraph-xl)") : null;
        if (roleDiv && !roleDiv.classList.contains("paragraph-xl")) {
          const p = document.createElement("p");
          p.textContent = roleDiv.textContent.trim();
          contentCell.push(p);
        }
      }
      const quote = pane.querySelector("p.paragraph-xl");
      if (quote) {
        const p = document.createElement("p");
        p.textContent = quote.textContent.trim();
        contentCell.push(p);
      }
      cells.push([labelCell, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs-testimonial", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse5(element, { document }) {
    const cards = element.querySelectorAll("a.article-card, a.card-link");
    const cells = [];
    cards.forEach((card) => {
      const img = card.querySelector(".article-card-image img, img.cover-image");
      const tag = card.querySelector(".article-card-meta .tag, .tag");
      const date = card.querySelector(".article-card-meta .paragraph-sm, .article-card-meta span:last-child");
      const heading = card.querySelector("h3, h4, .h4-heading, .article-card-body h3");
      const imageCell = [];
      if (img) {
        imageCell.push(img);
      }
      const bodyCell = [];
      if (heading) {
        const link = document.createElement("a");
        link.href = card.href;
        link.textContent = heading.textContent;
        const h = document.createElement("h3");
        h.appendChild(link);
        bodyCell.push(h);
      }
      if (tag) {
        const tagEl = document.createElement("p");
        const em = document.createElement("em");
        em.textContent = tag.textContent;
        tagEl.appendChild(em);
        bodyCell.push(tagEl);
      }
      if (date) {
        const dateEl = document.createElement("p");
        dateEl.textContent = date.textContent;
        bodyCell.push(dateEl);
      }
      if (imageCell.length > 0 || bodyCell.length > 0) {
        cells.push([imageCell, bodyCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-faq.js
  function parse6(element, { document }) {
    const faqItems = element.querySelectorAll("details.faq-item, details");
    const cells = [];
    faqItems.forEach((item) => {
      const questionSpan = item.querySelector("summary .faq-question span, summary span, summary");
      const questionText = questionSpan ? questionSpan.textContent.trim() : "";
      const answerDiv = item.querySelector(".faq-answer, div:not(summary)");
      const answerParagraphs = answerDiv ? Array.from(answerDiv.querySelectorAll("p, li, div")) : [];
      if (questionText) {
        const heading = document.createElement("h3");
        heading.textContent = questionText;
        const cellContent = [heading];
        if (answerParagraphs.length > 0) {
          answerParagraphs.forEach((p) => {
            cellContent.push(p);
          });
        } else if (answerDiv) {
          const p = document.createElement("p");
          p.textContent = answerDiv.textContent.trim();
          cellContent.push(p);
        }
        cells.push(cellContent);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "accordion-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-banner.js
  function parse7(element, { document }) {
    const bgImage = element.querySelector('img.cover-image, img[class*="cover"], img[class*="overlay"]');
    const heading = element.querySelector('.card-body h2, .card-body h1, h2.h1-heading, h1, h2, h3, [class*="heading"]');
    const description = element.querySelector('.card-body p.subheading, .card-body p, p.subheading, p[class*="subtitle"], p[class*="description"]');
    const ctaLinks = Array.from(
      element.querySelectorAll('.button-group a, a.button, a.inverse-button, a[class*="cta"]')
    );
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    const contentContainer = document.createElement("div");
    if (heading) contentContainer.appendChild(heading);
    if (description) contentContainer.appendChild(description);
    if (ctaLinks.length > 0) {
      const linkContainer = document.createElement("p");
      ctaLinks.forEach((link) => {
        linkContainer.appendChild(link);
      });
      contentContainer.appendChild(linkContainer);
    }
    if (contentContainer.children.length > 0) {
      cells.push([contentContainer]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/wknd-trendsetters-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [".skip-link"]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".navbar",
        "footer",
        ".breadcrumbs"
      ]);
      WebImporter.DOMUtils.remove(element, ["noscript", "link"]);
    }
  }

  // tools/importer/transformers/wknd-trendsetters-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const sections = payload && payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const document = element.ownerDocument;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.append(sectionMetadata);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-landing": parse,
    "columns-teaser": parse2,
    "cards-gallery": parse3,
    "tabs-testimonial": parse4,
    "cards-article": parse5,
    "accordion-faq": parse6,
    "hero-banner": parse7
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Homepage template with hero, featured content, and call-to-action sections",
    urls: [
      "https://wknd-trendsetters.site/"
    ],
    blocks: [
      {
        name: "hero-landing",
        instances: ["header.secondary-section .grid-layout"]
      },
      {
        name: "columns-teaser",
        instances: ["main > section:nth-child(2) .grid-layout"]
      },
      {
        name: "cards-gallery",
        instances: [".grid-layout.desktop-4-column.grid-gap-sm"]
      },
      {
        name: "tabs-testimonial",
        instances: [".tabs-wrapper"]
      },
      {
        name: "cards-article",
        instances: [".grid-layout.desktop-4-column.grid-gap-md"]
      },
      {
        name: "accordion-faq",
        instances: [".faq-list"]
      },
      {
        name: "hero-banner",
        instances: ["section.inverse-section .utility-position-relative"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Landing",
        selector: "main > header.secondary-section",
        style: null,
        blocks: ["hero-landing"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Featured Article Teaser",
        selector: "main > section:nth-child(2)",
        style: null,
        blocks: ["columns-teaser"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Image Gallery",
        selector: "main > section:nth-child(3)",
        style: "grey",
        blocks: ["cards-gallery"],
        defaultContent: [".utility-text-align-center h2", ".utility-text-align-center .paragraph-lg"]
      },
      {
        id: "section-4",
        name: "Testimonials",
        selector: "main > section:nth-child(4)",
        style: null,
        blocks: ["tabs-testimonial"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Latest Articles",
        selector: "main > section:nth-child(5)",
        style: "grey",
        blocks: ["cards-article"],
        defaultContent: [".utility-text-align-center h2", ".utility-text-align-center .paragraph-lg"]
      },
      {
        id: "section-6",
        name: "FAQ",
        selector: "main > section:nth-child(6)",
        style: null,
        blocks: ["accordion-faq"],
        defaultContent: ["main > section:nth-child(6) h2", "main > section:nth-child(6) .subheading"]
      },
      {
        id: "section-7",
        name: "CTA Banner",
        selector: "section.inverse-section",
        style: null,
        blocks: ["hero-banner"],
        defaultContent: []
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path: path || "/index",
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
