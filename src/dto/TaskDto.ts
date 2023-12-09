export class TaskDto {
    constructor(public id: number | null, public description: string,
                public status: boolean | null, public color:string, public email: string | null) {
    }
}