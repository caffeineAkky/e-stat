import removeCodePrefix from "@/lib/estat/removeCodePrefix";

describe("removeCodePrefix", () => {
    it("removes the code prefix that e-Stat puts before the name", () => {
        expect(removeCodePrefix("105_中華人民共和国")).toBe("中華人民共和国");
    });

    it("returns the name as it is when it has no code prefix", () => {
        expect(removeCodePrefix("中華人民共和国")).toBe("中華人民共和国");
    });

    // 名前の途中にある「_」は名前の一部なので残す
    it("removes only the leading code, keeping underscores inside the name", () => {
        expect(removeCodePrefix("001_生きた_動物")).toBe("生きた_動物");
    });
});
