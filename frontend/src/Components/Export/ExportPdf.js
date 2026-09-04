import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs";

export default function ExportPDF({ data }) {

    const exportPDF = () => {

        const doc = new jsPDF("landscape");

        // ================= SUMMARY =================

        const totalAmount = data.reduce(
            (sum, item) => sum + Number(item.Total_Amount || 0),
            0
        );

        const paidAmount = data
            .filter(item => item.Pay_Status === "Paid")
            .reduce((sum, item) => sum + Number(item.Total_Amount || 0), 0);

        const toPayAmount = data
            .filter(item => item.Pay_Status === "To pay")
            .reduce((sum, item) => sum + Number(item.Total_Amount || 0), 0);

        const creditAmount = data
            .filter(item => item.Pay_Status === "Credit")
            .reduce((sum, item) => sum + Number(item.Total_Amount || 0), 0);

        const paidCount = data.filter(item => item.Pay_Status === "Paid").length;
        const toPayCount = data.filter(item => item.Pay_Status === "To pay").length;
        const creditCount = data.filter(item => item.Pay_Status === "Credit").length;

        // ================= HEADING =================

        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.text("ASHWAMEGH LOGISTICS", 148, 15, { align: "center" });

        doc.setFontSize(15);
        doc.text("Builty Report", 148, 24, { align: "center" });

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);

        doc.text(
            `Generated On : ${dayjs().format("DD-MM-YYYY HH:mm")}`,
            14,
            32
        );

        // ================= TABLE =================

        autoTable(doc, {
            startY: 38,

            head: [[
                "Sr",
                "Builty",
                "Date",
                "From",
                "To",
                "Consignor",
                "Consignee",
                "Qty",
                "Amount",
                "Status"
            ]],

            body: data.map((item, index) => ([
                index + 1,
                item.Builty_Id,
                dayjs(item.Builty_Date).format("DD-MM-YYYY"),
                item.From_Office_Name,
                item.To_Office_Name,
                item.Consignor_Name,
                item.Consignee_Name,
                item.Quantity,
                Number(item.Total_Amount).toFixed(2),
                item.Pay_Status
            ])),

            theme: "grid",

            headStyles: {
                fillColor: [13, 110, 253],
                textColor: 255,
                halign: "center",
                fontStyle: "bold"
            },

            alternateRowStyles: {
                fillColor: [245, 245, 245]
            },

            styles: {
                fontSize: 9,
                cellPadding: 3
            },

            columnStyles: {
                0: { halign: "center" },
                1: { halign: "center" },
                7: { halign: "center" },
                8: { halign: "right" },
                9: { halign: "center" }
            }
        });

        // ================= SUMMARY =================

        let y = doc.lastAutoTable.finalY + 10;

        if (y > 165) {
            doc.addPage();
            y = 20;
        }
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.text("SUMMARY", 14, y);

        y += 8;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);

        doc.text(`Total Builty : ${data.length}`, 14, y);
        y += 7;

        doc.text(`Paid Builty : ${paidCount}`, 14, y);
        y += 7;

        doc.text(`To Pay Builty : ${toPayCount}`, 14, y);
        y += 7;

        doc.text(`Credit Builty : ${creditCount}`, 14, y);
        y += 10;

        doc.setFont("helvetica", "bold");

        doc.text(`Grand Total : Rs. ${totalAmount.toFixed(2)}`, 14, y);
        y += 7;

        doc.text(`Paid Amount : Rs. ${paidAmount.toFixed(2)}`, 14, y);
        y += 7;

        doc.text(`To Pay Amount : Rs. ${toPayAmount.toFixed(2)}`, 14, y);
        y += 7;

        doc.text(`Credit Amount : Rs. ${creditAmount.toFixed(2)}`, 14, y);

        // ================= FOOTER =================

        const pageCount = doc.getNumberOfPages();

        for (let i = 1; i <= pageCount; i++) {

            doc.setPage(i);

            doc.setFontSize(9);

            doc.setFont("helvetica", "italic");

            doc.text(
                "Ashwamegh Logistics",
                14,
                200
            );

            doc.text(
                `Page ${i} of ${pageCount}`,
                282,
                200,
                { align: "right" }
            );
        }

        // ================= DOWNLOAD =================

        doc.save("Builty_Report.pdf");
    };

    return (
        <button
            className="btn btn-danger ms-2"
            onClick={exportPDF}
        >
            Export PDF
        </button>
    );
}