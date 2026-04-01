/**
 * Normalizes extracted text by:
 * - Converting to lowercase
 * - Removing repeated spaces
 * - Removing unnecessary line breaks
 * - Trimming extra whitespace
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/\r?\n|\r/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Extracts text from a PDF file.
 * Supports progress updates via the onProgress callback.
 *
 * @param file The PDF File object to parse
 * @param onProgress Optional callback for progress updates
 * @returns Cleaned, normalized text from the PDF
 */
export async function extractTextFromPDF(
  file: File,
  onProgress?: (current: number, total: number) => void
): Promise<string> {
  try {
    const pdfjsLib = await import("pdfjs-dist");

    if (typeof window !== "undefined") {
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
    }

    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });

    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;
    let fullText = "";

    for (let i = 1; i <= numPages; i++) {
      if (onProgress) {
        onProgress(i, numPages);
      }

      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map((item: any) => item.str || "")
        .join(" ");

      fullText += pageText + " ";
    }

    return normalizeText(fullText);
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw new Error("Could not read this PDF file. Please try another resume.");
  }
}