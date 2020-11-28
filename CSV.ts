export class CSV {
    private data: Uint8Array = new Uint8Array();
    private dataString = "";
    private dataArray: string[] = [];

    private separator = ",";

    private textDecoder: TextDecoder = new TextDecoder();

    constructor(separator: string = ",") {
        this.separator = separator;
    }

    public parse() {
        this.dataString = this.textDecoder.decode(this.data);
        this.dataArray = this.dataString.split(/\r\n|\r|\n/g);
        return this;
    }

    /**
     * un-implemented yet
     *
     */
    public write() {
        return this;
    }

    /**
     *
     * @param filePath ./example.csv
     */
    public async read(filePath: string) {
        const data = await Deno.readFile(filePath);
        this.data = data;

        return this;
    }

    /**
     * return array
     */
    // deno-lint-ignore no-explicit-any
    public toArray<T>(): { [key: string]: any }[] | T[] {
        // public toArray<T>(): T[] {
        const [header, ...body] = this.dataArray;
        const splitHeader = header.split(this.separator);
        const splitBody = body.map((b) => b.split(this.separator));

        const csvArray = [];

        for (let i = 0; i < splitBody.length; i++) {
            const item: { [key: string]: string } = {};

            for (let j = 0; j < splitBody[i].length; j++) {
                if (splitHeader[j] !== "") {
                    item[splitHeader[j]] = splitBody[i][j];
                }
            }

            csvArray.push(item);
        }

        return csvArray;
    }
}
