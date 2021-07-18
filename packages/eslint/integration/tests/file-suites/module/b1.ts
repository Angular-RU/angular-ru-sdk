export class B1 {
    public hello(a: number): number;

    /**
     * @deprecated
     */
    public hello(a: string): string;

    // eslint-disable-next-line
    public hello(a: any): any {
        return a;
    }
}
