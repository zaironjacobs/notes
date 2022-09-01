export interface INote {
    id: string
    name: string
    content: string
    isChecked: boolean
}

export interface INoteCreate {
    name: string
    content: string
}

export interface INoteUpdate {
    id: string
    name: string
    content: string
}
