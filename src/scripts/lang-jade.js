/**
 * @fileoverview
 * Registers a language handler for JADE.
 *
 * @author brentd and masondesu
 */

PR['registerLangHandler'](
  PR['createSimpleLexer'](
    // patterns that always start with
    // a known character.  Must have a shortcut string.
    // 
    // Shortcut is string of characters, any of which, if the first
    // character, gurantee that this pattern and only this pattern matches.
    // 
    // The third arg is deprecated, just pass it null (dumb).
    [
      // cheap trick... :(
      [PR['PR_TYPE'], /---/, null, '---'],
      
      [PR['PR_KEYWORD'], /\$[a-zA-Z-]+/, null, '$'],

      // elemets with class or id... .example or #example
      [PR['PR_ATTRIB_VALUE'], /[.#][a-zA-Z-]+/, null, '.#'],

      // double quote string
      [PR['PR_STRING'],       /^"(?:[^\\"])*(?:"|$)/, null, '"'],

      // single quote string
      [PR['PR_STRING'],       /^'(?:[^']|'')*(?:'|$)/, null, "'"],
    ],

    // allthroughStylePatterns patterns that will be tried in
    // order if the shortcut ones fail.  May have shortcuts
    [      
      // pipe string
      [PR['PR_STRING'], /^\s*\|/],

      [PR['PR_ATTRIB_VALUE'], /[.#][a-zA-Z-]+/],
      
      // tag
      [PR['PR_TAG'], /(\n[ ]*)(html|head|title|base|link|meta|style|script|noscript|template|body|body|section|navarticle|aside|h1|h2|h3|h4|h5|h6|header|footer|address|main|p|hr|pre|blockquote|ol|ul|li|dl|d|dd|dd|figure|figcaption|div|a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|varsamp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img|iframe|embedobject|param|object|video|audio|source|video|audio|track|video|audio|canvas|map|are|area|map|svg|table|caption|colgroup|col|tbody|thead|tfoot|tr|td|th|form|fieldset|lgend|fieldset|label|input|button|select|datalist|optgroup|option|select|datalist|tetarea|keygen|output|progress|meter|details|summary|details|menuitem|menu)/],
     
      
    ]), ['jade']);