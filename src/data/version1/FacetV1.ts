export class FacetV1 {
    public constructor(
        group: string, name: string, count: number) {
        this.group = group;
        this.name = name;
        this.count = count;
    }

    public group: string;
    public name: string;
    public count: number;
}