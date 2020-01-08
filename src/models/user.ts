import {
	Model,
	Column,
	Table,
	CreatedAt,
	UpdatedAt,
    DataType,
    DeletedAt,
    HasMany
} from 'sequelize-typescript';
import { BankAccount } from './bankAccount';

@Table
export class User extends Model<User> {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    FirstName!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    LastName!: string;

    @Column({
        type: DataType.TEXT
    })
    Address1!: string;

    @Column({
        type: DataType.TEXT
    })
    Address2!: string;

    @Column({
        type: DataType.STRING
    })
    AddressCity!: string;

    @Column({
        type: DataType.STRING
    })
    AddressState!: string;

    @Column({
        type: DataType.STRING
    })
    AddressCountry!: string;

    @CreatedAt
    CreatedAt!: Date;

    @UpdatedAt
    UpdatedAt!: Date;

    @DeletedAt
    DeletedAt!: Date;

    @HasMany(() => BankAccount)
    BankAccounts!: BankAccount[]
}
