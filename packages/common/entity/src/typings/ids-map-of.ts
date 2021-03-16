export interface IdsMapOf<T extends { id: number }> {
    [id: number]: T;
}
