export interface IRead<T> {
    findById(id: number): Promise<T>;
    find(item: T): Promise<T>;
}
