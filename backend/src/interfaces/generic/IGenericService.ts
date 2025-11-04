export interface IGenericService<TRequest, TResponse>{
    create: (body: TRequest) => Promise<void>;
    getById: (id: number) => Promise<TResponse>;
    getAll: () => Promise<Array<TResponse>>;
}