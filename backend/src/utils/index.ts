export const autoImplement = <T>(defaults?: Partial<T>) =>
    class {
        constructor() {
            Object.assign(this, defaults || {});
        }
    } as new () => T;

export const autoImplementWithBase = <TBase extends new (...args: any[]) => any>(base: TBase) => <T>(
    defaults?: Partial<T>
): Pick<TBase, keyof TBase> & (new (...a: TBase extends new (...o: infer A) => unknown ? A : []) => InstanceType<TBase> & T) =>
    class extends base {
        constructor(...a: any[]) {
            super(...a);
            Object.assign(this, defaults || {});
        }
    } as any;
