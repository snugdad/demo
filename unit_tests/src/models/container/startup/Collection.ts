interface collection<T> {
    fetching: boolean,
    fetched: boolean,
    data: T[],
}

export default collection;