export class ReserveTableModel {
    id!: number
    date!: string
    tableId!: number
    userId!: number
    table!: {
        capacity: number
        num: number
        description: string
        id: number
    }
}