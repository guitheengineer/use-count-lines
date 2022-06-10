import { useCallback, useEffect, useRef, useState } from 'react';

const defaultLineInfo = {
  lines: null,
  textHeight: null,
  naturalHeightWithOneLine: null,
  firstLineHeight: null,
  additionalLineHeight: null,
};

/**
 * Credits to https://github.com/tvanc
 * Gather metrics about the layout of the element's text.
 * This is a somewhat expensive operation - call with care.
 *
 * @returns {TextMetrics}
 * Layout metrics for the clamped element's text.
 */
const calculateTextMetrics = (element) => {
  if (!element) return defaultLineInfo;

  const clone = element.cloneNode(true);
  const style = clone.style;

  // Append, don't replace
  style.cssText += ';min-height:0!important;max-height:none!important';
  element.replaceWith(clone);

  const naturalHeight = clone.offsetHeight;

  // Clear to measure empty height. textContent faster than innerHTML
  clone.textContent = '';

  const naturalHeightWithoutText = clone.offsetHeight;
  const textHeight = naturalHeight - naturalHeightWithoutText;

  // Fill element with single non-breaking space to find height of one line
  clone.textContent = '\xa0';

  // Get height of element with only one line of text
  const naturalHeightWithOneLine = clone.offsetHeight;
  const firstLineHeight = naturalHeightWithOneLine - naturalHeightWithoutText;

  // Add line (<br> + nbsp). appendChild() faster than innerHTML
  clone.appendChild(document.createElement('br'));
  clone.appendChild(document.createTextNode('\xa0'));

  const additionalLineHeight = clone.offsetHeight - naturalHeightWithOneLine;
  const lines =
    1 + (naturalHeight - naturalHeightWithOneLine) / additionalLineHeight;

  // Restore original content
  clone.replaceWith(element);
  return {
    lines,
    textHeight,
    naturalHeightWithOneLine,
    firstLineHeight,
    additionalLineHeight,
  };
};

export const useCountLines = (customRef = null) => {
  const [lineInfo, setLineInfo] = useState(defaultLineInfo);

  const handleLineInfo = useCallback((node) => {
    const info = calculateTextMetrics(node);
    setLineInfo(info);
  }, []);

  const defaultRef = useRef();
  let ref;

  if (customRef) {
    ref = customRef;
  } else {
    ref = defaultRef;
  }

  useEffect(() => {
    const handleResize = () => {
      handleLineInfo(ref.current);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { ref, ...lineInfo };
};
