import { render, screen, fireEvent } from "@testing-library/react";
import type { SelectedOption } from "@/types/search";
import ItemCombobox from "@/components/ItemCombobox";

const items: SelectedOption[] = [
    { value: "0101", label: "牛肉" },
    { value: "0102", label: "豚肉" },
    { value: "0103", label: "鶏肉" },
    { value: "0301", label: "カニ" },
    { value: "0302", label: "エビ" },
];

// フォームに入れて描画し、送信される item の値で「何が選ばれているか」を確かめる
function renderInForm(defaultValue?: string) {
    render(
        <form aria-label="検索フォーム">
            <ItemCombobox label="品目" items={items} defaultValue={defaultValue} />
        </form>
    );
    const form = screen.getByRole("form") as HTMLFormElement;
    const input = screen.getByRole("combobox", { name: "品目" });
    const submittedItem = () => new FormData(form).get("item");
    return { input, submittedItem };
}

const visibleOptionNames = (): string[] =>
    screen.queryAllByRole("option").map((option) => option.textContent ?? "");

describe("ItemCombobox", () => {
    it("shows the default item and submits its code", () => {
        const { input, submittedItem } = renderInForm("0302");

        expect(input).toHaveValue("エビ");
        expect(submittedItem()).toBe("0302");
    });

    it("falls back to the first item when no default is given, like the previous select", () => {
        const { input, submittedItem } = renderInForm();

        expect(input).toHaveValue("牛肉");
        expect(submittedItem()).toBe("0101");
    });

    it("shows only the items that contain the typed text", () => {
        const { input } = renderInForm();

        fireEvent.change(input, { target: { value: "肉" } });

        expect(visibleOptionNames()).toEqual(["牛肉", "豚肉", "鶏肉"]);
    });

    it("shows every item when the list is opened with the down key without typing", () => {
        const { input } = renderInForm("0302");

        fireEvent.keyDown(input, { key: "ArrowDown" });

        expect(visibleOptionNames()).toEqual(["牛肉", "豚肉", "鶏肉", "カニ", "エビ"]);
    });

    it("tells the user when no item matches", () => {
        const { input } = renderInForm();

        fireEvent.change(input, { target: { value: "自動車" } });

        expect(screen.queryAllByRole("option")).toHaveLength(0);
        expect(screen.getByText("該当する品目がありません")).toBeInTheDocument();
    });

    it("selects an item with the up/down keys and Enter", () => {
        const { input, submittedItem } = renderInForm();

        fireEvent.change(input, { target: { value: "肉" } });
        fireEvent.keyDown(input, { key: "ArrowDown" });
        fireEvent.keyDown(input, { key: "ArrowDown" });
        fireEvent.keyDown(input, { key: "ArrowDown" });
        fireEvent.keyDown(input, { key: "ArrowUp" });
        fireEvent.keyDown(input, { key: "Enter" });

        expect(input).toHaveValue("豚肉");
        expect(submittedItem()).toBe("0102");
        expect(screen.queryAllByRole("option")).toHaveLength(0);
    });

    it("selects an item by clicking it", () => {
        const { input, submittedItem } = renderInForm();

        fireEvent.change(input, { target: { value: "カ" } });
        fireEvent.click(screen.getByRole("option", { name: "カニ" }));

        expect(input).toHaveValue("カニ");
        expect(submittedItem()).toBe("0301");
    });

    it("closes the list with Escape and keeps the selected item", () => {
        const { input, submittedItem } = renderInForm("0103");

        fireEvent.change(input, { target: { value: "エ" } });
        fireEvent.keyDown(input, { key: "Escape" });

        expect(screen.queryAllByRole("option")).toHaveLength(0);
        expect(input).toHaveValue("鶏肉");
        expect(submittedItem()).toBe("0103");
    });

    it("restores the selected item when focus leaves without choosing", () => {
        const { input, submittedItem } = renderInForm("0103");

        fireEvent.change(input, { target: { value: "エ" } });
        fireEvent.blur(input);

        expect(input).toHaveValue("鶏肉");
        expect(submittedItem()).toBe("0103");
    });
});
