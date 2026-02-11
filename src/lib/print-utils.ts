// Print an HTML document string using a hidden iframe.
// Optionally overrides the document title during printing (useful for PDF filenames).
export function printHtmlDocument(html: string, documentTitle?: string): void {
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "none";
  iframe.style.visibility = "hidden";
  document.body.appendChild(iframe);

  const iframeDoc = iframe.contentWindow?.document;
  if (!iframeDoc || !iframe.contentWindow) {
    document.body.removeChild(iframe);
    return;
  }

  const iframeWindow = iframe.contentWindow;

  iframeDoc.open();
  iframeDoc.writeln(html);
  iframeDoc.close();

  // Wait for content to load, then print
  setTimeout(() => {
    const originalTitle = document.title;

    if (documentTitle) {
      document.title = documentTitle;
    }

    iframeWindow.focus();
    iframeWindow.print();

    // Restore original title after print dialog
    setTimeout(() => {
      document.title = originalTitle;
      document.body.removeChild(iframe);
    }, 1000);
  }, 300);
}
