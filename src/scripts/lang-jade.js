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
      
      [PR['PR_KEYWORD'], /\$[\w\d-]+/, null, '$'],

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

      [PR['PR_ATTRIB_VALUE'], /[.#][\w\d-]+/],
      
      // tag
      [PR['PR_TAG'], /(\n[ ]*)(abbr|address|area|are|aside|audio|a|base|bdi|bdo|blockquote|body|body|br|button|b|canvas|caption|cite|code|colgroup|col|datalist|datalist|data|dd|dd|del|details|details|dfn|div|dl|d|embedobject|em|fieldset|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|head|hr|html|iframe|img|input|ins|i|kbd|keygen|label|lgend|link|li|main|map|map|mark|menumenuitem|meta|meter|navarticle|noscript|object|ol|optgroup|option|output|param|pre|progress|p|q|rp|rt|ruby|script|section|select|select|small|source|span|strong|style|sub|summary|sup|svg|s|table|tbody|td|template|tetarea|tfoot|thead|th|time|title|track|tr|ul|u|varsamp|video|video|video|wbr|)/],
     
      
    ]), ['jade']);