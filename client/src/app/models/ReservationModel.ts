export class ReservationModel{
    capacity!: number
    tableId!: number;
    userId!: number;
    date!: Date; // data no formato "YYYY-MM-DD"
    time!: string; // hora no formato "HH:MM"
}