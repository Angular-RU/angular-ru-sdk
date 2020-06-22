interface TableGlobalOptions {
    MACRO_TIME: number;
    TIME_RELOAD: number;
    COLUMN_RESIZE_MIN_WIDTH: number;
    FRAME_TIME: number;
    ROW_HEIGHT: number;
    TIME_IDLE: number;
    MIN_BUFFER: number;
    BUFFER_OFFSET: number;
}

export const TABLE_GLOBAL_OPTIONS: TableGlobalOptions = {
    MACRO_TIME: 1000,
    TIME_RELOAD: 400,
    COLUMN_RESIZE_MIN_WIDTH: 50,
    FRAME_TIME: 66,
    ROW_HEIGHT: 45,
    TIME_IDLE: 200,
    MIN_BUFFER: 10,
    BUFFER_OFFSET: 5
};
