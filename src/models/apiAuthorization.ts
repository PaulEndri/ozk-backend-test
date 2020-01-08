import {
	Model,
	Column,
	Table,
	CreatedAt,
	UpdatedAt,
    DataType,
    DeletedAt,
} from 'sequelize-typescript';

@Table
export class ApiAuthorization extends Model<ApiAuthorization> {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    UserName!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    Password!: string;

    @CreatedAt
    CreatedAt!: Date;

    @UpdatedAt
    UpdatedAt!: Date;

    @DeletedAt
    DeletedAt!: Date;
}
