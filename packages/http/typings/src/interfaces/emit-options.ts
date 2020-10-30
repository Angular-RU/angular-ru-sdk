export interface EmitOptions {
    /**
     * @description
     * emit success event about sent request
     */
    emitSuccess: boolean;

    /**
     * @description
     * emit failure event about sent request
     */
    emitFailure: boolean;

    /**
     * override default options
     */
    override?: boolean;
}
