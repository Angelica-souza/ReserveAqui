export class TableReservesModel{
    capacity!: number
    num!: number
    description!: string
    id!: number
    reserves!: {
      date: string
      tableId: number
      userId: number
    }[]
}