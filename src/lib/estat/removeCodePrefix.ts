// e-Stat の名前は「105_中華人民共和国」のように先頭にコードが付くので取り除く。付いていなければそのまま返す
export default function removeCodePrefix(name: string): string {
    return name.replace(/^[0-9A-Za-z]+_/, "");
}
