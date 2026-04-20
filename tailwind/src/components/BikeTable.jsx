import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
// ─────────────────────────────────────────────────────────────
import bajajLogo from "../assets/bajaj-logo.png";   // ← change this path

export default function BikeTable() {
  const [bikes, setBikes]           = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bikesPerPage, setBikesPerPage] = useState(5);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/bikes", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem("token");
          alert("Session expired");
          window.location.href = "/login";
        }
        return res.json();
      })
      .then((data) => setBikes(data))
      .catch((err) => {
        console.error("Failed to fetch bikes:", err);
        alert("Unauthorized! Please login again");
      });
  }, []);

  // ─────────────────────────────────────────────────────────────
  //  HELPER: Rs. prefix for jsPDF (₹ glyph unsupported)
  // ─────────────────────────────────────────────────────────────
  const pdfPrice = (val) => {
    if (!val) return "-";
    const cleaned = String(val).replace(/[₹,\s]/g, "");
    const num = parseFloat(cleaned);
    if (isNaN(num)) return String(val).replace(/₹/g, "Rs.");
    const parts = [];
    let n = Math.floor(num);
    const last3 = n % 1000;
    n = Math.floor(n / 1000);
    parts.unshift(String(last3).padStart(n > 0 ? 3 : 1, "0"));
    while (n > 0) {
      parts.unshift(String(n % 100).padStart(n > 100 ? 2 : 1, "0"));
      n = Math.floor(n / 100);
    }
    return "Rs. " + parts.join(",");
  };

  const localImageToBase64 = (src) =>
    new Promise((resolve) => {
      fetch(src)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.blob();
        })
        .then((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result); // data:image/png;base64,...
          reader.onerror   = () => resolve(null);
          reader.readAsDataURL(blob);
        })
        .catch(() => resolve(null));
    });

  // ─────────────────────────────────────────────────────────────
  //  PDF GENERATOR
  // ─────────────────────────────────────────────────────────────
  const handleDownloadPDF = async () => {
    if (bikes.length === 0) return;
    setIsDownloading(true);

    try {
      // ── Load local logo → base64 (same-origin fetch, never fails on CORS) ──
      const logoBase64 = await localImageToBase64(bajajLogo);
      // If using public folder instead:
      // const logoBase64 = await localImageToBase64("/bajaj-logo.png");

      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const PW  = doc.internal.pageSize.getWidth();
      const PH  = doc.internal.pageSize.getHeight();

      const rowsPerPage     = bikesPerPage;
      const totalDataPages  = Math.ceil(bikes.length / rowsPerPage);
      const TOTAL_PDF_PAGES = totalDataPages + 1;

      // ── Palette ──────────────────────────────────────────────
      const C = {
  navy:    [22, 101, 52],   // 🌿 dark green (header)
  navyMid: [34, 197, 94],   // 🌿 vibrant green

  gold:    [16, 185, 129],  // 🌿 emerald accent

  white:   [255, 255, 255],

  ink:     [20, 40, 30],    // 🌿 dark text
  muted:   [100, 140, 120], // 🌿 soft green text

  rule:    [200, 230, 210], // 🌿 borders
  rowAlt:  [240, 253, 244], // 🌿 light green rows

  green:   [22, 163, 74],   // 🌿 highlight price

  blueMid: [134, 239, 172], // 🌿 light green text
  goldBg:  [220, 252, 231], // 🌿 soft background
};

      const generatedOn = new Date().toLocaleString("en-IN", {
        day: "2-digit", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit",
      });

      // ══════════════════════════════════════════════════════════
      //  COVER PAGE
      // ══════════════════════════════════════════════════════════
      const drawCoverPage = () => {
        doc.setFillColor(...C.navy);
        doc.rect(0, 0, PW, PH, "F");

        doc.setFillColor(...C.gold);
        doc.rect(0, 0, PW, 6, "F");
        doc.rect(0, PH - 6, PW, 6, "F");

        // doc.setFillColor(22, 55, 100);
        // doc.roundedRect(20, 55, PW - 40, 165, 5, 5, "F");

        doc.setFillColor(...C.gold);
        doc.rect(20, 55, PW - 40, 2.5, "F");

        // Logo centred on cover card
        if (logoBase64) {
          doc.setFillColor(255, 255, 255);
          doc.roundedRect(PW / 2 - 20, 64, 40, 32, 4, 4, "F");
          doc.addImage(logoBase64, "PNG", PW / 2 - 18, 66, 36, 28);
        } else {
          // Fallback monogram if image somehow missing
          doc.setFillColor(...C.gold);
          doc.circle(PW / 2, 82, 14, "F");
          doc.setFont("helvetica", "bold");
          doc.setFontSize(18);
          doc.setTextColor(...C.navy);
          doc.text("AM", PW / 2, 87, { align: "center" });
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(...C.white);
        doc.text("INDIAN BIKE PRICE REPORT", PW / 2, 108, { align: "center" });

        doc.setDrawColor(...C.gold);
        doc.setLineWidth(0.8);
        doc.line(PW / 2 - 45, 112, PW / 2 + 45, 112);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(...C.gold);
        doc.text("AZARDEEN MOTORS PVT LTD", PW / 2, 122, { align: "center" });

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(...C.blueMid);
        doc.text("Authorised Bike Dealer  |  Est. 2005", PW / 2, 129, { align: "center" });

        doc.setDrawColor(50, 80, 130);
        doc.setLineWidth(0.3);
        doc.line(40, 136, PW - 40, 136);

        const stats = [
          { label: "TOTAL BIKES", value: String(bikes.length) },
          { label: "DATA PAGES",  value: String(totalDataPages) },
          { label: "ROWS / PAGE", value: String(rowsPerPage) },
        ];
        const bW = 42, gap = 8;
        const totalW = stats.length * bW + (stats.length - 1) * gap;
        const bx0    = (PW - totalW) / 2;

        stats.forEach((s, i) => {
          const bx = bx0 + i * (bW + gap);
          const by = 143;
          doc.setFillColor(12, 48, 92);
          doc.roundedRect(bx, by, bW, 26, 3, 3, "F");
          doc.setDrawColor(...C.gold);
          doc.setLineWidth(0.4);
          doc.roundedRect(bx, by, bW, 26, 3, 3, "S");

          doc.setFont("helvetica", "bold");
          doc.setFontSize(18);
          doc.setTextColor(...C.gold);
          doc.text(s.value, bx + bW / 2, by + 14, { align: "center" });

          doc.setFont("helvetica", "normal");
          doc.setFontSize(6);
          doc.setTextColor(...C.blueMid);
          doc.text(s.label, bx + bW / 2, by + 22, { align: "center" });
        });

        doc.setFont("helvetica", "italic");
        doc.setFontSize(7.5);
        doc.setTextColor(110, 145, 185);
        doc.text(`Generated: ${generatedOn}`, PW / 2, 182, { align: "center" });

        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor(80, 110, 150);
        doc.text(
          "Prices are indicative. Contact your nearest dealer for exact on-road quotations.",
          PW / 2, 192, { align: "center", maxWidth: PW - 50 }
        );

        doc.setFont("helvetica", "bold");
        doc.setFontSize(7);
        doc.setTextColor(...C.blueMid);
        doc.text(
          "AZARDEEN MOTORS PVT LTD  |  Bike Dashboard System  |  Confidential",
          PW / 2, PH - 10, { align: "center" }
        );
        doc.setFont("helvetica", "normal");
        doc.setFontSize(6.5);
        doc.setTextColor(80, 110, 150);
        doc.text(`Page 1 of ${TOTAL_PDF_PAGES}`, PW / 2, PH - 5, { align: "center" });
      };

      // ══════════════════════════════════════════════════════════
      //  DATA PAGE HEADER — logo LEFT, title RIGHT
      // ══════════════════════════════════════════════════════════
      const drawPageHeader = () => {
        doc.setFillColor(...C.navy);
        doc.rect(0, 0, PW, 20, "F");

        doc.setFillColor(...C.gold);
        doc.rect(0, 0, 4, 20, "F");

        if (logoBase64) {
          // White pill so dark logo is visible on navy background
          // doc.setFillColor(255, 255, 255);
          // doc.roundedRect(7, 2.5, 22, 15, 2, 2, "F");
          doc.addImage(logoBase64, "PNG", 8, 3, 20, 14);
        }

        const txtX = logoBase64 ? 33 : 10;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(...C.white);
        doc.text("AZARDEEN MOTORS PVT LTD", txtX, 9);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor(...C.white);
        doc.text("Authorised Bike Dealer", txtX, 15);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(...C.white);
        doc.text("INDIAN BIKE PRICE REPORT", PW - 12, 9, { align: "right" });

        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor(...C.white);
        doc.text(`Generated: ${generatedOn}`, PW - 12, 15, { align: "right" });

        doc.setDrawColor(...C.gold);
        doc.setLineWidth(0.4);
        doc.line(0, 20, PW, 20);
      };

      // ══════════════════════════════════════════════════════════
      //  DATA PAGE FOOTER
      // ══════════════════════════════════════════════════════════
      const drawPageFooter = (pdfPageNum) => {
        doc.setDrawColor(...C.rule);
        doc.setLineWidth(0.3);
        doc.line(12, PH - 14, PW - 12, PH - 14);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor(...C.muted);
        doc.text("Azardeen Motors Pvt Ltd  |  Bike Dashboard System", 12, PH - 9);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.5);
        doc.setTextColor(...C.navyMid);
        doc.text(`Page ${pdfPageNum} of ${TOTAL_PDF_PAGES}`, PW - 12, PH - 9, { align: "right" });
      };

      // ══════════════════════════════════════════════════════════
      //  INFO ROW
      // ══════════════════════════════════════════════════════════
      const drawInfoRow = (start, end) => {
        const y = 28;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.setTextColor(...C.navy);
        doc.text("Indian Bike Price List", 12, y);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        doc.setTextColor(...C.muted);
        // doc.text(
        //   `Total: ${bikes.length} bikes   |   Showing: ${start + 1} - ${end}   |   ${rowsPerPage} per page`,
        //   PW - 12, y, { align: "right" }
        // );

        doc.setDrawColor(...C.rule);
        doc.setLineWidth(0.25);
        doc.line(12, y + 3, PW - 12, y + 3);
      };

      // ══════════════════════════════════════════════════════════
      //  RENDER ALL PAGES
      // ══════════════════════════════════════════════════════════
      drawCoverPage();

      for (let pageIdx = 0; pageIdx < totalDataPages; pageIdx++) {
        doc.addPage();

        const start      = pageIdx * rowsPerPage;
        const end        = Math.min(start + rowsPerPage, bikes.length);
        const pageData   = bikes.slice(start, end);
        const pdfPageNum = pageIdx + 2;

        drawPageHeader();
        drawInfoRow(start, end);
        drawPageFooter(pdfPageNum);

        autoTable(doc, {
          startY: 35,
          margin: { left: 12, right: 12, bottom: 22 },
          tableWidth: 186,

          head: [[
            { content: "#",             styles: { halign: "center" } },
            { content: "Bike Model",    styles: { halign: "left"   } },
            { content: "Ex-Showroom",   styles: { halign: "right"  } },
            { content: "Insurance",     styles: { halign: "right"  } },
            { content: "RTO / Tax",     styles: { halign: "right"  } },
            { content: "On-Road Price", styles: { halign: "right"  } },
          ]],

          body: pageData.map((bike, i) => [
            { content: String(start + i + 1), styles: { halign: "center" } },
            bike.name,
            { content: pdfPrice(bike.price),     styles: { halign: "right" } },
            { content: pdfPrice(bike.insurance), styles: { halign: "right" } },
            { content: pdfPrice(bike.tax),       styles: { halign: "right" } },
            {
              content: pdfPrice(bike.onroad),
              styles: { halign: "right", textColor: C.green, fontStyle: "bold" },
            },
          ]),

          styles: {
            fontSize: 9,
            cellPadding: { top: 5, bottom: 5, left: 5, right: 5 },
            lineColor: C.rule,
            lineWidth: 0.25,
            textColor: C.ink,
            font: "helvetica",
            overflow: "linebreak",
          },
          headStyles: {
            fillColor: C.navy,
            textColor: C.white,
            fontStyle: "bold",
            fontSize: 8.5,
            cellPadding: { top: 6, bottom: 6, left: 5, right: 5 },
            lineWidth: 0,
          },
          alternateRowStyles: { fillColor: C.rowAlt },
          columnStyles: {
            0: { halign: "center", cellWidth: 8,  textColor: C.muted },
            1: { halign: "left",   cellWidth: 54 },
            2: { halign: "right",  cellWidth: 30 },
            3: { halign: "right",  cellWidth: 28 },
            4: { halign: "right",  cellWidth: 28 },
            5: { halign: "right",  cellWidth: 38 },
          },
          didParseCell(data) {
            if (data.section === "head") {
              data.cell.styles.lineColor = C.navy;
            }
          },
          willDrawCell(data) {
            if (data.section === "head" && data.column.index === 0) {
              doc.setFillColor(...C.gold);
              doc.rect(data.cell.x, data.cell.y, 3, data.cell.height, "F");
            }
          },
        });

        const finalY = doc.lastAutoTable.finalY;

        doc.setFillColor(...C.goldBg);
        doc.setDrawColor(...C.gold);
        doc.setLineWidth(0.3);
        doc.roundedRect(12, finalY + 2, PW - 24, 9, 2, 2, "FD");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.5);
        doc.setTextColor(...C.navy);
        // doc.text(
        //   `Rows ${start + 1} to ${end} of ${bikes.length}   |   Page ${pageIdx + 1} of ${totalDataPages}`,
        //   PW / 2, finalY + 7.5, { align: "center" }
        // );
      }

      const fileName = `BikeReport_${rowsPerPage}PerPage_${new Date().toISOString().slice(0, 10)}.pdf`;
      doc.save(fileName);

    } finally {
      setIsDownloading(false);
    }
  };

  // ────────────────────────────────────────────────────────────
  //  PAGINATION
  // ────────────────────────────────────────────────────────────
  const indexOfLastBike  = currentPage * bikesPerPage;
  const indexOfFirstBike = indexOfLastBike - bikesPerPage;
  const currentBikes     = bikes.slice(indexOfFirstBike, indexOfLastBike);
  const totalPages       = Math.ceil(bikes.length / bikesPerPage);
  const totalPDFPages    = totalPages + 1;

  // ────────────────────────────────────────────────────────────
  //  UI
  // ────────────────────────────────────────────────────────────
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Indian Bike Prices</h2>
          <p className="text-sm text-slate-500">Live market rates and variations</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end text-right">
            <span className="text-xs text-slate-400">
              <span className="font-semibold text-blue-600">{bikes.length}</span> bikes
              &nbsp;·&nbsp;
              <span className="font-semibold text-blue-600">{totalPDFPages}</span> PDF pages
            </span>
            <span className="text-xs text-slate-400">
              <span className="font-semibold text-blue-600">{bikesPerPage}</span> rows/page + 1 cover
            </span>
          </div>

          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading || bikes.length === 0}
            className="flex items-center gap-2 bg-gradient-to-br from-blue-600 to-blue-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-blue-900 active:scale-95 transition-all shadow-lg shadow-blue-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {isDownloading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                </svg>
                Download PDF
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex items-start gap-2 mb-5 px-3 py-2.5 bg-blue-50 border border-blue-100 rounded-xl">
        <svg className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p className="text-xs text-blue-700 leading-relaxed">
          PDF includes a <strong>cover page</strong> +&nbsp;
          <strong>{Math.ceil(bikes.length / bikesPerPage)} data pages</strong>
          &nbsp;({bikesPerPage} rows each) with the Bajaj logo on every page header.
          Adjust "Rows per page" to change the split.
        </p>
      </div>

      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full min-w-[640px] text-left border-collapse">
          <thead>
            <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              <th className="pb-4 w-8 text-center">#</th>
              <th className="pb-4">Bike Model</th>
              <th className="pb-4 text-right whitespace-nowrap">Ex-Showroom</th>
              <th className="pb-4 text-right whitespace-nowrap">Insurance</th>
              <th className="pb-4 text-right whitespace-nowrap">RTO / Tax</th>
              <th className="pb-4 text-right whitespace-nowrap">On-Road Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {currentBikes.map((bike, i) => (
              <tr key={bike._id} className="group hover:bg-slate-50/60 transition-colors">
                <td className="py-4 text-center text-xs text-slate-300 font-medium">
                  {indexOfFirstBike + i + 1}
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={bike.image}
                      className="w-11 h-11 object-cover rounded-xl shadow-sm group-hover:scale-105 transition-transform"
                      alt={bike.name}
                    />
                    <span className="font-semibold text-slate-800 text-sm">{bike.name}</span>
                  </div>
                </td>
                <td className="py-4 text-right text-slate-600 text-sm font-medium whitespace-nowrap">{bike.price}</td>
                <td className="py-4 text-right text-slate-500 text-sm whitespace-nowrap">{bike.insurance}</td>
                <td className="py-4 text-right text-slate-500 text-sm whitespace-nowrap">{bike.tax}</td>
                <td className="py-4 text-right whitespace-nowrap">
                  <span className="font-bold text-emerald-600 text-sm">{bike.onroad}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t border-slate-50 gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">Rows per page:</span>
          <select
            value={bikesPerPage}
            onChange={(e) => { setBikesPerPage(Number(e.target.value)); setCurrentPage(1); }}
            className="border border-slate-200 px-3 py-1.5 rounded-lg text-sm text-slate-700 outline-none cursor-pointer bg-white hover:border-blue-300 transition-colors"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={12}>12</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          {[...Array(totalPages)].map((_, idx) => {
            const pg = idx + 1;
            return (
              <button
                key={pg}
                onClick={() => setCurrentPage(pg)}
                className={`w-9 h-9 rounded-lg text-sm font-medium border transition-all ${
                  currentPage === pg
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                {pg}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          <span className="text-sm text-slate-400 ml-1">
            Page <span className="font-semibold text-slate-700">{currentPage}</span> of {totalPages}
          </span>
        </div>
      </div>
    </div>
  );
}