/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroLandingParser from './parsers/hero-landing.js';
import columnsTeaserParser from './parsers/columns-teaser.js';
import cardsGalleryParser from './parsers/cards-gallery.js';
import tabsTestimonialParser from './parsers/tabs-testimonial.js';
import cardsArticleParser from './parsers/cards-article.js';
import accordionFaqParser from './parsers/accordion-faq.js';
import heroBannerParser from './parsers/hero-banner.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/wknd-trendsetters-cleanup.js';
import sectionsTransformer from './transformers/wknd-trendsetters-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-landing': heroLandingParser,
  'columns-teaser': columnsTeaserParser,
  'cards-gallery': cardsGalleryParser,
  'tabs-testimonial': tabsTestimonialParser,
  'cards-article': cardsArticleParser,
  'accordion-faq': accordionFaqParser,
  'hero-banner': heroBannerParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  sectionsTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Homepage template with hero, featured content, and call-to-action sections',
  urls: [
    'https://wknd-trendsetters.site/'
  ],
  blocks: [
    {
      name: 'hero-landing',
      instances: ['header.secondary-section .grid-layout']
    },
    {
      name: 'columns-teaser',
      instances: ['main > section:nth-child(2) .grid-layout']
    },
    {
      name: 'cards-gallery',
      instances: ['.grid-layout.desktop-4-column.grid-gap-sm']
    },
    {
      name: 'tabs-testimonial',
      instances: ['.tabs-wrapper']
    },
    {
      name: 'cards-article',
      instances: ['.grid-layout.desktop-4-column.grid-gap-md']
    },
    {
      name: 'accordion-faq',
      instances: ['.faq-list']
    },
    {
      name: 'hero-banner',
      instances: ['section.inverse-section .utility-position-relative']
    }
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero Landing',
      selector: 'main > header.secondary-section',
      style: null,
      blocks: ['hero-landing'],
      defaultContent: []
    },
    {
      id: 'section-2',
      name: 'Featured Article Teaser',
      selector: 'main > section:nth-child(2)',
      style: null,
      blocks: ['columns-teaser'],
      defaultContent: []
    },
    {
      id: 'section-3',
      name: 'Image Gallery',
      selector: 'main > section:nth-child(3)',
      style: 'grey',
      blocks: ['cards-gallery'],
      defaultContent: ['.utility-text-align-center h2', '.utility-text-align-center .paragraph-lg']
    },
    {
      id: 'section-4',
      name: 'Testimonials',
      selector: 'main > section:nth-child(4)',
      style: null,
      blocks: ['tabs-testimonial'],
      defaultContent: []
    },
    {
      id: 'section-5',
      name: 'Latest Articles',
      selector: 'main > section:nth-child(5)',
      style: 'grey',
      blocks: ['cards-article'],
      defaultContent: ['.utility-text-align-center h2', '.utility-text-align-center .paragraph-lg']
    },
    {
      id: 'section-6',
      name: 'FAQ',
      selector: 'main > section:nth-child(6)',
      style: null,
      blocks: ['accordion-faq'],
      defaultContent: ['main > section:nth-child(6) h2', 'main > section:nth-child(6) .subheading']
    },
    {
      id: 'section-7',
      name: 'CTA Banner',
      selector: 'section.inverse-section',
      style: null,
      blocks: ['hero-banner'],
      defaultContent: []
    }
  ]
};

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach(blockDef => {
    blockDef.instances.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach(element => {
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

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach(block => {
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

    // 4. Execute afterTransform transformers (final cleanup + section breaks)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '')
    );

    return [{
      element: main,
      path: path || '/index',
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map(b => b.name),
      }
    }];
  }
};
