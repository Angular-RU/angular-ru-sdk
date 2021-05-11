import { MousePosition } from '../../interfaces/table-builder.internal';

export class FilterStateEvent {
    public key: string | null = null;
    public opened: boolean | null = null;
    public position: MousePosition = { left: null, top: null };
}
