export interface IGenericService<TRequest, TResponse>{
    create: (body: TRequest) => Promise<void>;
    //update: (body: TRequest) => Promise<void>;
    //delete: (id: number) => Promise<void>;
    getById: (id: number) => Promise<TResponse>;
    getAll: () => Promise<Array<TResponse>>;
}