import * as XLSX from "xlsx-js-style";
import { saveAs } from "file-saver";
import dayjs from "dayjs";

export default function ExportExcel({ data }) {

    const exportToExcel = () => {

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

        const heading = [
            ["ASHWAMEGH LOGISTICS"],
            ["Builty Report"],
            [`Generated On : ${dayjs().format("DD-MM-YYYY HH:mm")}`],
            [],
            [
                "Sr No",
                "Builty No",
                "Date",
                "From",
                "To",
                "Consignor",
                "Consignee",
                "Quantity",
                "Total Amount",
                "Payment Status"
            ]
        ];

        // ================= DATA =================

        const rows = data.map((item, index) => [
            index + 1,
            item.Builty_Id,
            dayjs(item.Builty_Date).format("DD-MM-YYYY"),
            item.From_Office_Name,
            item.To_Office_Name,
            item.Consignor_Name,
            item.Consignee_Name,
            item.Quantity,
            Number(item.Total_Amount || 0).toFixed(2),
            item.Pay_Status
        ]);

        // ================= SUMMARY TABLE =================

        const summary = [
            [],
            ["SUMMARY"],
            ["Total Builty", data.length],
            ["Paid Builty", paidCount],
            ["To Pay Builty", toPayCount],
            ["Credit Builty", creditCount],
            [],
            ["Grand Total", totalAmount.toFixed(2)],
            ["Paid Amount", paidAmount.toFixed(2)],
            ["To Pay Amount", toPayAmount.toFixed(2)],
            ["Credit Amount", creditAmount.toFixed(2)]
        ];

        const worksheet = XLSX.utils.aoa_to_sheet([
            ...heading,
            ...rows,
            ...summary
        ]);

        // Merge Heading

        worksheet["!merges"] = [
            { s: { r: 0, c: 0 }, e: { r: 0, c: 9 } },
            { s: { r: 1, c: 0 }, e: { r: 1, c: 9 } },
            { s: { r: 2, c: 0 }, e: { r: 2, c: 9 } }
        ];

        // Column Width

        worksheet["!cols"] = [
            { wch: 8 },
            { wch: 12 },
            { wch: 15 },
            { wch: 20 },
            { wch: 20 },
            { wch: 25 },
            { wch: 25 },
            { wch: 10 },
            { wch: 15 },
            { wch: 18 }
        ];

        // Auto Filter

        worksheet["!autofilter"] = {
            ref: "A5:J5"
        };

        // Freeze Header

        worksheet["!freeze"] = {
            xSplit: 0,
            ySplit: 5
        };

        // Common Style

        const range = XLSX.utils.decode_range(worksheet["!ref"]);

        for (let R = range.s.r; R <= range.e.r; R++) {

            for (let C = range.s.c; C <= range.e.c; C++) {

                const cell = XLSX.utils.encode_cell({ r: R, c: C });

                if (!worksheet[cell]) continue;

                worksheet[cell].s = {
                    font: {
                        name: "Calibri",
                        sz: 11
                    },
                    alignment: {
                        horizontal: "center",
                        vertical: "center"
                    },
                    border: {
                        top: { style: "thin", color: { rgb: "D9D9D9" } },
                        bottom: { style: "thin", color: { rgb: "D9D9D9" } },
                        left: { style: "thin", color: { rgb: "D9D9D9" } },
                        right: { style: "thin", color: { rgb: "D9D9D9" } }
                    }
                };
            }
        }

        // Company Heading

        if (worksheet["A1"]) {
            worksheet["A1"].s = {
                font: { bold: true, sz: 20, color: { rgb: "FFFFFF" } },
                fill: { fgColor: { rgb: "0D6EFD" } },
                alignment: { horizontal: "center" }
            };
        }

        if (worksheet["A2"]) {
            worksheet["A2"].s = {
                font: { bold: true, sz: 15 },
                alignment: { horizontal: "center" }
            };
        }

        if (worksheet["A3"]) {
            worksheet["A3"].s = {
                font: { italic: true, sz: 11 },
                alignment: { horizontal: "center" }
            };
        }

        // Header Style

        for (let c = 0; c <= 9; c++) {

            const cell = XLSX.utils.encode_cell({ r: 4, c });

            if (!worksheet[cell]) continue;

            worksheet[cell].s = {
                font: {
                    bold: true,
                    color: { rgb: "FFFFFF" }
                },
                fill: {
                    fgColor: { rgb: "198754" }
                },
                alignment: {
                    horizontal: "center"
                },
                border: {
                    top: { style: "thin" },
                    bottom: { style: "thin" },
                    left: { style: "thin" },
                    right: { style: "thin" }
                }
            };
        }
                // ================= ALTERNATE ROW COLOR =================

        const dataStart = 5; // Excel Row 6 (0-based index)

        for (let i = 0; i < rows.length; i++) {

            const rowIndex = dataStart + i;

            for (let c = 0; c <= 9; c++) {

                const cell = XLSX.utils.encode_cell({
                    r: rowIndex,
                    c
                });

                if (!worksheet[cell]) continue;

                worksheet[cell].s = {
                    ...worksheet[cell].s,

                    fill: {
                        fgColor: {
                            rgb: i % 2 === 0 ? "FFFFFF" : "F8F9FA"
                        }
                    }
                };
            }
        }

        // ================= SUMMARY STYLE =================

        const summaryStart = heading.length + rows.length + 1;

        const summaryColor = "FFF3CD";

        for (let i = 0; i <= 10; i++) {

            const row = summaryStart + i;

            const cellA = `A${row + 1}`;
            const cellB = `B${row + 1}`;

            if (worksheet[cellA]) {

                worksheet[cellA].s = {
                    font: {
                        bold: true
                    },
                    fill: {
                        fgColor: {
                            rgb: summaryColor
                        }
                    },
                    border: {
                        top: { style: "thin" },
                        bottom: { style: "thin" },
                        left: { style: "thin" },
                        right: { style: "thin" }
                    }
                };
            }

            if (worksheet[cellB]) {

                worksheet[cellB].s = {
                    font: {
                        bold: true
                    },
                    fill: {
                        fgColor: {
                            rgb: summaryColor
                        }
                    },
                    alignment: {
                        horizontal: "right"
                    },
                    border: {
                        top: { style: "thin" },
                        bottom: { style: "thin" },
                        left: { style: "thin" },
                        right: { style: "thin" }
                    }
                };
            }
        }

        // ================= GRAND TOTAL ROW =================

        const grandRow = summaryStart + 7;

        ["A", "B"].forEach(col => {

            const cell = `${col}${grandRow + 1}`;

            if (worksheet[cell]) {

                worksheet[cell].s = {
                    font: {
                        bold: true,
                        color: {
                            rgb: "FFFFFF"
                        }
                    },
                    fill: {
                        fgColor: {
                            rgb: "DC3545"
                        }
                    },
                    alignment: {
                        horizontal: "center"
                    },
                    border: {
                        top: { style: "thin" },
                        bottom: { style: "thin" },
                        left: { style: "thin" },
                        right: { style: "thin" }
                    }
                };
            }
        });

        // ================= WORKBOOK =================

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Builty Report"
        );

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array"
        });

        const file = new Blob(
            [excelBuffer],
            {
                type:
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            }
        );

        saveAs(file, "Builty_Report.xlsx");
    };

    return (
        <button
            className="btn btn-success"
            onClick={exportToExcel}
        >
            Export Excel
        </button>
    );
}