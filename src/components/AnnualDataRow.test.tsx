import { render, screen, fireEvent } from "@testing-library/react";
import type { AnnualTradeData, Units } from "@/types/estat";
import AnnualDataRow from "@/components/AnnualDataRow";

const data: AnnualTradeData = {
    year: 2024,
    totalQuantity: 12345678,
    totalAmount: 98765432,
    monthlyData: [
        { month: 1, quantity: 1234567, amount: 7654321 },
        { month: 2, quantity: null, amount: null },
    ],
};

const units: Units = {
    quantity: { code: "KG", label: "KG" },
    amount: "千円",
};

function renderRow() {
    render(
        <table>
            <tbody>
                <AnnualDataRow data={data} units={units} />
            </tbody>
        </table>
    );
}

describe("AnnualDataRow", () => {
    it("displays comma separated long total numbers", () => {
        renderRow();
        
        expect(screen.getByRole("cell", { name: "12,345,678" })).toBeInTheDocument();
        expect(screen.getByRole("cell", { name: "98,765,432" })).toBeInTheDocument();
    });

    it("keeps the monthly detail closed at first", () => {
        renderRow();

        expect(screen.getByRole("button", { name: "2024年の月別詳細", expanded: false })).toBeInTheDocument();
        expect(screen.queryByRole("columnheader", { name: "月" })).not.toBeInTheDocument();
    });

    it("opens the monthly detail when the toggle is clicked, and shows it is open", () => {
        renderRow();

        const toggle = screen.getByRole("button", { name: "2024年の月別詳細" });

        fireEvent.click(toggle);

        expect(screen.getByRole("button", { name: "2024年の月別詳細", expanded: true })).toBeInTheDocument();
        expect(screen.getByRole("columnheader", { name: "月" })).toBeInTheDocument();
        expect(screen.getByRole("cell", { name: "1,234,567" })).toBeInTheDocument();
    });

    it("closes the monthly detail when the toggle is clicked again", () => {
        renderRow();

        const toggle = screen.getByRole("button", { name: "2024年の月別詳細" });

        fireEvent.click(toggle);
        fireEvent.click(toggle);

        expect(screen.getByRole("button", { name: "2024年の月別詳細", expanded: false })).toBeInTheDocument();
        expect(screen.queryByRole("columnheader", { name: "月" })).not.toBeInTheDocument();
    });

    it("shows '-' for a month that has no value", () => {
        renderRow();

        const toggle = screen.getByRole("button", { name: "2024年の月別詳細" });

        fireEvent.click(toggle);

        expect(screen.getAllByRole("cell", { name: "-" })).toHaveLength(2);
    });
})
