export interface IEventInterface{
    name: string,
    description: string
    entry_code?: string
}

export interface IEventCard{
    id: number
    name: string,
    description: string,
    entry_code: string,
    is_active: boolean

}