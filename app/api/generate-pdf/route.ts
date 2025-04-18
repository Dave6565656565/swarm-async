import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const article = searchParams.get("article")

  // In a real implementation, we would use a PDF generation library
  // like jsPDF, PDFKit, or a server-side solution

  // For now, we'll create a simple PDF with article content
  const pdfContent = await generateArticlePDF(article || "")

  // Return the PDF as a downloadable file
  return new NextResponse(pdfContent, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${article || "article"}.pdf"`,
    },
  })
}

async function generateArticlePDF(articleId: string): Promise<ArrayBuffer> {
  // This is a placeholder function that would normally generate a PDF
  // In a real implementation, we would fetch the article content and convert it to PDF

  // For demonstration purposes, we're returning a minimal valid PDF
  // This creates a simple PDF with text "Liquid Staking Derivatives Explained"
  const minimalPDF = `
%PDF-1.7
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources 4 0 R /MediaBox [0 0 612 792] /Contents 5 0 R >>
endobj
4 0 obj
<< /Font << /F1 6 0 R >> >>
endobj
5 0 obj
<< /Length 68 >>
stream
BT
/F1 24 Tf
100 700 Td
(Liquid Staking Derivatives Explained) Tj
ET
endstream
endobj
6 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 7
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000210 00000 n
0000000251 00000 n
0000000369 00000 n
trailer
<< /Size 7 /Root 1 0 R >>
startxref
436
%%EOF
`

  // Convert string to ArrayBuffer
  const encoder = new TextEncoder()
  return encoder.encode(minimalPDF).buffer
}
